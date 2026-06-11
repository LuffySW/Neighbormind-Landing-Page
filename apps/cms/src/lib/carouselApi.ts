import { supabase } from "./supabaseClient";

type CarouselRow = {
  id: string;
  scene_id: string;
  image_id: string | null;
  title: string | null;
  description: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
};

export async function listCarouselItems(sceneId: string) {
  const { data, error } = await supabase
    .from("carousel_items")
    .select("id,scene_id,image_id,title,description,display_order,created_at,updated_at")
    .eq("scene_id", sceneId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CarouselRow[];
}

export async function createCarouselItem(sceneId: string, payload: Partial<CarouselRow>) {
  const { data, error } = await supabase
    .from("carousel_items")
    .insert({ ...payload, scene_id: sceneId })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CarouselRow;
}

export async function updateCarouselItem(id: string, payload: Partial<CarouselRow>) {
  const { data, error } = await supabase
    .from("carousel_items")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CarouselRow;
}

export async function deleteCarouselItem(id: string) {
  const { error } = await supabase.from("carousel_items").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
