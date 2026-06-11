import { supabase } from "./supabaseClient";

const BUCKET = "neighbormind-media";

export type MediaAsset = {
  id: string;
  public_url: string;
  storage_path: string;
  folder: string | null;
  alt_text: string | null;
  bytes: number | null;
  created_at: string;
};

const sanitizeSegment = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-");

const fileBaseName = (name: string) => name.replace(/\.[^/.]+$/, "");

const createStoragePath = (file: File, folder?: string) => {
  const safeFolder = folder ? sanitizeSegment(folder) : "uploads";
  const safeName = sanitizeSegment(fileBaseName(file.name));
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  return `${safeFolder}/${timestamp}-${safeName}.${ext}`;
};

export async function listMediaAssets() {
  const { data, error } = await supabase
    .from("media_assets")
    .select("id,public_url,storage_path,folder,alt_text,bytes,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as MediaAsset[];
}

export async function uploadMediaAsset(file: File, options?: { folder?: string; altText?: string }) {
  const storagePath = createStoragePath(file, options?.folder);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  const publicUrl = publicData?.publicUrl ?? "";

  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      storage_path: storagePath,
      public_url: publicUrl,
      folder: options?.folder ? sanitizeSegment(options.folder) : "uploads",
      alt_text: options?.altText ?? fileBaseName(file.name),
      bytes: file.size
    })
    .select("id,public_url,storage_path,folder,alt_text,bytes,created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MediaAsset;
}

export async function deleteMediaAsset(asset: MediaAsset) {
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([asset.storage_path]);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { error } = await supabase.from("media_assets").delete().eq("id", asset.id);

  if (error) {
    throw new Error(error.message);
  }
}
