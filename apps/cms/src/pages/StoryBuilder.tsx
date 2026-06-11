import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { listMediaAssets } from "../lib/mediaApi";
import {
  createCarouselItem,
  deleteCarouselItem,
  listCarouselItems,
  updateCarouselItem
} from "../lib/carouselApi";
import { createScene, deleteScene, listScenes, updateScene } from "../lib/scenesApi";

type SceneForm = {
  id?: string;
  scene_title: string;
  large_headline: string;
  supporting_narrative: string;
  background_image_id: string;
  display_order: number;
};

type CarouselForm = {
  id?: string;
  title: string;
  description: string;
  image_id: string;
  display_order: number;
};

const emptyScene: SceneForm = {
  scene_title: "",
  large_headline: "",
  supporting_narrative: "",
  background_image_id: "",
  display_order: 1
};

const emptyCarouselItem: CarouselForm = {
  title: "",
  description: "",
  image_id: "",
  display_order: 1
};

export function StoryBuilder() {
  const { id: articleId } = useParams();
  const [scenes, setScenes] = useState<SceneForm[]>([]);
  const [activeScene, setActiveScene] = useState<SceneForm | null>(null);
  const [carouselItems, setCarouselItems] = useState<CarouselForm[]>([]);
  const [activeItem, setActiveItem] = useState<CarouselForm | null>(null);
  const [mediaAssets, setMediaAssets] = useState<
    { id: string; public_url: string; folder: string | null; alt_text: string | null }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScenes = async () => {
      if (!articleId) return;

      try {
        const [sceneRows, assets] = await Promise.all([listScenes(articleId), listMediaAssets()]);
        if (isMounted) {
          const mapped = sceneRows.map((scene) => ({
            id: scene.id,
            scene_title: scene.scene_title ?? "",
            large_headline: scene.large_headline ?? "",
            supporting_narrative: scene.supporting_narrative ?? "",
            background_image_id: scene.background_image_id ?? "",
            display_order: scene.display_order ?? 1
          }));
          setScenes(mapped);
          setActiveScene(mapped[0] ?? null);
          setMediaAssets(assets);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load scenes.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadScenes();

    return () => {
      isMounted = false;
    };
  }, [articleId]);

  const backgroundPreview = useMemo(() => {
    const asset = mediaAssets.find((item) => item.id === activeScene?.background_image_id);
    return asset?.public_url ?? "";
  }, [mediaAssets, activeScene]);

  const carouselPreview = useMemo(() => {
    const asset = mediaAssets.find((item) => item.id === activeItem?.image_id);
    return asset?.public_url ?? "";
  }, [mediaAssets, activeItem]);

  const handleSceneChange = (field: keyof SceneForm, value: string | number) => {
    if (!activeScene) return;
    setActiveScene({ ...activeScene, [field]: value });
  };

  const handleAddScene = () => {
    const nextOrder = scenes.length + 1;
    const nextScene = { ...emptyScene, display_order: nextOrder };
    setActiveScene(nextScene);
  };

  const handleSaveScene = async () => {
    if (!articleId || !activeScene) return;
    setSaving(true);
    setError(null);

    try {
      const payload = {
        scene_title: activeScene.scene_title || null,
        large_headline: activeScene.large_headline || null,
        supporting_narrative: activeScene.supporting_narrative || null,
        background_image_id: activeScene.background_image_id || null,
        display_order: activeScene.display_order
      };

      if (activeScene.id) {
        const updated = await updateScene(activeScene.id, payload);
        setScenes((prev) =>
          prev.map((scene) => (scene.id === updated.id ? { ...activeScene, id: updated.id } : scene))
        );
      } else {
        const created = await createScene(articleId, payload);
        const nextScene = { ...activeScene, id: created.id };
        setScenes((prev) => [...prev, nextScene]);
        setActiveScene(nextScene);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save scene.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteScene = async (sceneId?: string) => {
    if (!sceneId) return;
    const confirmed = window.confirm("Delete this scene?");
    if (!confirmed) return;

    try {
      await deleteScene(sceneId);
      setScenes((prev) => prev.filter((scene) => scene.id !== sceneId));
      if (activeScene?.id === sceneId) {
        setActiveScene(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete scene.");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCarouselItems = async () => {
      if (!activeScene?.id) {
        setCarouselItems([]);
        setActiveItem(null);
        return;
      }

      setCarouselLoading(true);
      try {
        const items = await listCarouselItems(activeScene.id);
        if (isMounted) {
          const mapped = items.map((item) => ({
            id: item.id,
            title: item.title ?? "",
            description: item.description ?? "",
            image_id: item.image_id ?? "",
            display_order: item.display_order ?? 1
          }));
          setCarouselItems(mapped);
          setActiveItem(mapped[0] ?? null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load carousel items.");
        }
      } finally {
        if (isMounted) {
          setCarouselLoading(false);
        }
      }
    };

    loadCarouselItems();

    return () => {
      isMounted = false;
    };
  }, [activeScene?.id]);

  const handleItemChange = (field: keyof CarouselForm, value: string | number) => {
    if (!activeItem) return;
    setActiveItem({ ...activeItem, [field]: value });
  };

  const handleAddItem = () => {
    const nextOrder = carouselItems.length + 1;
    setActiveItem({ ...emptyCarouselItem, display_order: nextOrder });
  };

  const handleSaveItem = async () => {
    if (!activeScene?.id || !activeItem) return;
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title: activeItem.title || null,
        description: activeItem.description || null,
        image_id: activeItem.image_id || null,
        display_order: activeItem.display_order
      };

      if (activeItem.id) {
        const updated = await updateCarouselItem(activeItem.id, payload);
        setCarouselItems((prev) =>
          prev.map((item) => (item.id === updated.id ? { ...activeItem, id: updated.id } : item))
        );
      } else {
        const created = await createCarouselItem(activeScene.id, payload);
        const nextItem = { ...activeItem, id: created.id };
        setCarouselItems((prev) => [...prev, nextItem]);
        setActiveItem(nextItem);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save carousel item.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (itemId?: string) => {
    if (!itemId) return;
    const confirmed = window.confirm("Delete this carousel item?");
    if (!confirmed) return;

    try {
      await deleteCarouselItem(itemId);
      setCarouselItems((prev) => prev.filter((item) => item.id !== itemId));
      if (activeItem?.id === itemId) {
        setActiveItem(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete carousel item.");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Story Builder</h1>
          <p className="text-sm text-neutral-600">
            Build scenes for the article story flow.
          </p>
          <NavLink className="text-xs text-neutral-500 underline" to="/articles">
            Back to Articles
          </NavLink>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-neutral-200 px-4 py-2 text-sm" type="button">
            Preview
          </button>
          <button
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
            type="button"
            onClick={handleSaveScene}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Scene"}
          </button>
        </div>
      </header>

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Scene List
              </h2>
              <button className="text-sm text-neutral-900 underline" type="button" onClick={handleAddScene}>
                Add Scene
              </button>
            </div>
            {loading ? (
              <p className="mt-4 text-sm text-neutral-500">Loading scenes...</p>
            ) : scenes.length === 0 ? (
              <p className="mt-4 text-sm text-neutral-500">No scenes yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    className={`w-full rounded-lg border p-3 text-left text-sm hover:border-neutral-400 ${
                      activeScene?.id === scene.id ? "border-neutral-500" : "border-neutral-200"
                    }`}
                    type="button"
                    onClick={() => setActiveScene(scene)}
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>Order {scene.display_order}</span>
                      <span>{scene.id ? "Saved" : "Draft"}</span>
                    </div>
                    <p className="mt-2 font-semibold text-neutral-900">
                      {scene.scene_title || "Untitled Scene"}
                    </p>
                    <p className="text-xs text-neutral-500">{scene.large_headline}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Scene Settings
            </h2>
            {activeScene ? (
              <div className="mt-4 grid gap-4">
                <label className="text-sm text-neutral-600">
                  Scene Title
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeScene.scene_title}
                    onChange={(event) => handleSceneChange("scene_title", event.target.value)}
                  />
                </label>
                <label className="text-sm text-neutral-600">
                  Large Headline
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeScene.large_headline}
                    onChange={(event) => handleSceneChange("large_headline", event.target.value)}
                  />
                </label>
                <label className="text-sm text-neutral-600">
                  Supporting Narrative
                  <textarea
                    className="mt-2 h-24 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeScene.supporting_narrative}
                    onChange={(event) => handleSceneChange("supporting_narrative", event.target.value)}
                  />
                </label>
                <label className="text-sm text-neutral-600">
                  Background Image
                  <select
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeScene.background_image_id}
                    onChange={(event) => handleSceneChange("background_image_id", event.target.value)}
                  >
                    <option value="">No background image</option>
                    {mediaAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.folder ? `[${asset.folder}] ` : ""}
                        {asset.alt_text || asset.id}
                      </option>
                    ))}
                  </select>
                </label>
                {backgroundPreview ? (
                  <img className="h-40 w-full rounded-lg object-cover" src={backgroundPreview} alt="Background" />
                ) : (
                  <div className="rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
                    Background preview appears here.
                  </div>
                )}
                <label className="text-sm text-neutral-600">
                  Display Order
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    type="number"
                    min={1}
                    value={activeScene.display_order}
                    onChange={(event) => handleSceneChange("display_order", Number(event.target.value))}
                  />
                </label>
                {activeScene.id ? (
                  <button
                    className="text-xs text-rose-500 underline"
                    type="button"
                    onClick={() => handleDeleteScene(activeScene.id)}
                  >
                    Delete Scene
                  </button>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">Select or add a scene to edit.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Carousel Items
            </h2>
            {!activeScene?.id ? (
              <p className="mt-4 text-sm text-neutral-500">
                Save a scene first to manage carousel items.
              </p>
            ) : carouselLoading ? (
              <p className="mt-4 text-sm text-neutral-500">Loading carousel items...</p>
            ) : carouselItems.length === 0 ? (
              <div className="mt-4">
                <p className="text-sm text-neutral-500">No carousel items yet.</p>
                <button className="mt-3 text-sm text-neutral-900 underline" type="button" onClick={handleAddItem}>
                  Add Item
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {carouselItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full rounded-lg border p-3 text-left text-sm hover:border-neutral-400 ${
                      activeItem?.id === item.id ? "border-neutral-500" : "border-neutral-200"
                    }`}
                    type="button"
                    onClick={() => setActiveItem(item)}
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>Order {item.display_order}</span>
                      <span>{item.id ? "Saved" : "Draft"}</span>
                    </div>
                    <p className="mt-2 font-semibold text-neutral-900">{item.title || "Untitled"}</p>
                    <p className="text-xs text-neutral-500">{item.description}</p>
                  </button>
                ))}
                <button className="text-sm text-neutral-900 underline" type="button" onClick={handleAddItem}>
                  Add Item
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Carousel Editor
            </h2>
            {!activeScene?.id ? (
              <p className="mt-4 text-sm text-neutral-500">
                Save a scene to add carousel items.
              </p>
            ) : activeItem ? (
              <div className="mt-4 grid gap-4">
                <label className="text-sm text-neutral-600">
                  Title
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeItem.title}
                    onChange={(event) => handleItemChange("title", event.target.value)}
                  />
                </label>
                <label className="text-sm text-neutral-600">
                  Description
                  <textarea
                    className="mt-2 h-20 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeItem.description}
                    onChange={(event) => handleItemChange("description", event.target.value)}
                  />
                </label>
                <label className="text-sm text-neutral-600">
                  Image
                  <select
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={activeItem.image_id}
                    onChange={(event) => handleItemChange("image_id", event.target.value)}
                  >
                    <option value="">No image</option>
                    {mediaAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.folder ? `[${asset.folder}] ` : ""}
                        {asset.alt_text || asset.id}
                      </option>
                    ))}
                  </select>
                </label>
                {carouselPreview ? (
                  <img className="h-40 w-full rounded-lg object-cover" src={carouselPreview} alt="Carousel" />
                ) : (
                  <div className="rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
                    Carousel image preview appears here.
                  </div>
                )}
                <label className="text-sm text-neutral-600">
                  Display Order
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    type="number"
                    min={1}
                    value={activeItem.display_order}
                    onChange={(event) => handleItemChange("display_order", Number(event.target.value))}
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-lg border border-neutral-200 px-4 py-2 text-sm"
                    type="button"
                    onClick={handleSaveItem}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Item"}
                  </button>
                  {activeItem.id ? (
                    <button
                      className="text-xs text-rose-500 underline"
                      type="button"
                      onClick={() => handleDeleteItem(activeItem.id)}
                    >
                      Delete Item
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">Select or add a carousel item.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
