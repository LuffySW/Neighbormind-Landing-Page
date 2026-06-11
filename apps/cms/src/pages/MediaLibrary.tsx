import { useEffect, useMemo, useRef, useState } from "react";
import { deleteMediaAsset, listMediaAssets, uploadMediaAsset } from "../lib/mediaApi";

const formatBytes = (value?: number | null) => {
  if (!value) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size.toFixed(1)} ${units[unit]}`;
};

export function MediaLibrary() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<
    {
      id: string;
      public_url: string;
      storage_path: string;
      folder: string | null;
      alt_text: string | null;
      bytes: number | null;
      created_at: string;
    }[]
  >([]);
  const [search, setSearch] = useState("");
  const [folderFilter, setFolderFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [folderInput, setFolderInput] = useState("");
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<typeof items[number] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMedia = async () => {
      try {
        const data = await listMediaAssets();
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load media.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  const folders = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.folder) set.add(item.folder);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const filteredItems = items.filter((item) => {
      const matchesSearch =
        item.storage_path.toLowerCase().includes(normalizedSearch) ||
        (item.alt_text ?? "").toLowerCase().includes(normalizedSearch);
      const matchesFolder = folderFilter === "all" || item.folder === folderFilter;
      return matchesSearch && matchesFolder;
    });

    return filteredItems.sort((a, b) => {
      if (sort === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sort === "az") {
        return (a.alt_text ?? a.storage_path).localeCompare(b.alt_text ?? b.storage_path);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [items, search, folderFilter, sort]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    try {
      const uploads = Array.from(files).map((file) =>
        uploadMediaAsset(file, {
          folder: folderInput || undefined,
          altText: altText || undefined
        })
      );
      const results = await Promise.all(uploads);
      setItems((prev) => [...results, ...prev]);
      setAltText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: typeof items[number]) => {
    const confirmed = window.confirm("Delete this media asset?");
    if (!confirmed) return;

    try {
      await deleteMediaAsset(item);
      setItems((prev) => prev.filter((media) => media.id !== item.id));
      if (previewItem?.id === item.id) {
        setPreviewItem(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      setError("Failed to copy URL.");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Media Library</h1>
          <p className="text-sm text-neutral-600">Upload, organize, and copy image URLs.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm"
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            Upload Images
          </button>
        </div>
      </header>

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <section className="rounded-xl border border-neutral-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.6fr_0.6fr_0.4fr]">
          <input
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            placeholder="Search file name"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            value={folderFilter}
            onChange={(event) => setFolderFilter(event.target.value)}
          >
            <option value="all">Folder: All</option>
            {folders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
          <select
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
          </select>
          <button
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600"
            type="button"
            onClick={() => {
              setSearch("");
              setFolderFilter("all");
              setSort("newest");
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.6fr]">
          <input
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            placeholder="Folder (optional, e.g. hero)"
            value={folderInput}
            onChange={(event) => setFolderInput(event.target.value)}
          />
          <input
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            placeholder="Alt text (optional)"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
          />
          <button
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Select Files"}
          </button>
        </div>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => handleUpload(event.target.files)}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="text-sm text-neutral-500">Loading media...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-neutral-500">No media assets found.</p>
        ) : (
          filtered.map((item) => (
            <article key={item.id} className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                  {item.folder ?? "uploads"}
                </span>
                <button
                  className="text-xs text-neutral-500 underline"
                  type="button"
                  onClick={() => copyUrl(item.public_url)}
                >
                  Copy URL
                </button>
              </div>
              <button className="mt-4 w-full" type="button" onClick={() => setPreviewItem(item)}>
                <img
                  src={item.public_url}
                  alt={item.alt_text ?? "Media"}
                  className="h-40 w-full rounded-lg object-cover"
                />
              </button>
              <div className="mt-4 space-y-1">
                <p className="font-semibold text-neutral-900">{item.alt_text ?? "Untitled"}</p>
                <p className="text-xs text-neutral-500">{formatBytes(item.bytes)}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <button className="underline" type="button" onClick={() => setPreviewItem(item)}>
                  Preview
                </button>
                <button className="text-rose-500 underline" type="button" onClick={() => handleDelete(item)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {previewItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {previewItem.alt_text ?? "Preview"}
                </p>
                <p className="text-xs text-neutral-500">{previewItem.storage_path}</p>
              </div>
              <button
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                type="button"
                onClick={() => setPreviewItem(null)}
              >
                Close
              </button>
            </div>
            <img
              src={previewItem.public_url}
              alt={previewItem.alt_text ?? "Preview"}
              className="mt-4 max-h-[70vh] w-full rounded-xl object-contain"
            />
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
              <span>{formatBytes(previewItem.bytes)}</span>
              <button
                className="text-xs text-neutral-500 underline"
                type="button"
                onClick={() => copyUrl(previewItem.public_url)}
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
