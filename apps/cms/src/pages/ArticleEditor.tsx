import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  clearFeaturedArticle,
  createArticle,
  getArticle,
  getFeaturedArticle,
  isSlugUnique,
  setFeaturedArticle,
  updateArticle
} from "../lib/articlesApi";
import { listMediaAssets } from "../lib/mediaApi";

type ArticleEditorProps = {
  mode: "create" | "edit";
};

type ArticleForm = {
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  theme: string;
  release_date: string;
  hero_title: string;
  hero_subtitle: string;
  philosophy: string;
  story_content: string;
  product_description: string;
  shopee_link: string;
  seo_title: string;
  seo_description: string;
  cover_image_id: string;
  og_image_id: string;
  tags: string;
};

const emptyForm: ArticleForm = {
  title: "",
  slug: "",
  status: "draft",
  theme: "",
  release_date: "",
  hero_title: "",
  hero_subtitle: "",
  philosophy: "",
  story_content: "",
  product_description: "",
  shopee_link: "",
  seo_title: "",
  seo_description: "",
  cover_image_id: "",
  og_image_id: "",
  tags: ""
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export function ArticleEditor({ mode }: ArticleEditorProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState(1);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [mediaAssets, setMediaAssets] = useState<
    { id: string; public_url: string; folder: string | null; alt_text: string | null }[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    const loadEditorData = async () => {
      try {
        const assets = await listMediaAssets();
        if (isMounted) {
          setMediaAssets(assets);
        }

        if (mode === "edit" && id) {
          const article = await getArticle(id);
          const featuredRow = await getFeaturedArticle(id);

          if (isMounted) {
            setForm({
              title: article.title ?? "",
              slug: article.slug ?? "",
              status: article.status ?? "draft",
              theme: article.theme ?? "",
              release_date: article.release_date ?? "",
              hero_title: article.hero_title ?? "",
              hero_subtitle: article.hero_subtitle ?? "",
              philosophy: article.philosophy ?? "",
              story_content: article.story_content ?? "",
              product_description: article.product_description ?? "",
              shopee_link: article.shopee_link ?? "",
              seo_title: article.seo_title ?? "",
              seo_description: article.seo_description ?? "",
              cover_image_id: article.cover_image_id ?? "",
              og_image_id: article.og_image_id ?? "",
              tags: (article.tags ?? []).join(", ")
            });
            setUpdatedAt(article.updated_at ?? null);
            if (featuredRow) {
              setFeatured(true);
              setFeaturedOrder(featuredRow.display_order ?? 1);
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load article.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEditorData();

    return () => {
      isMounted = false;
    };
  }, [mode, id]);

  const mediaPreview = useMemo(() => {
    const asset = mediaAssets.find((item) => item.id === form.cover_image_id);
    return asset?.public_url ?? "";
  }, [mediaAssets, form.cover_image_id]);

  const handleChange = (field: keyof ArticleForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value)
    }));
  };

  const buildPayload = (statusOverride?: ArticleForm["status"]) => {
    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const status = statusOverride ?? form.status;

    return {
      title: form.title.trim(),
      slug: slugify(form.slug || form.title),
      status,
      theme: form.theme || null,
      release_date: form.release_date || null,
      hero_title: form.hero_title || null,
      hero_subtitle: form.hero_subtitle || null,
      philosophy: form.philosophy || null,
      story_content: form.story_content || null,
      product_description: form.product_description || null,
      shopee_link: form.shopee_link || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      cover_image_id: form.cover_image_id || null,
      og_image_id: form.og_image_id || null,
      tags,
      published_at: status === "published" ? new Date().toISOString() : null
    };
  };

  const saveArticle = async (statusOverride?: ArticleForm["status"]) => {
    setSaving(true);
    setError(null);

    try {
      const payload = buildPayload(statusOverride);
      if (!payload.title || !payload.slug) {
        setError("Title and slug are required.");
        return;
      }

      const unique = await isSlugUnique(payload.slug, mode === "edit" ? id : undefined);
      if (!unique) {
        setError("Slug already exists. Please use a unique slug.");
        return;
      }

      let savedId = id;
      if (mode === "create") {
        const created = await createArticle(payload);
        savedId = created.id;
        setUpdatedAt(created.updated_at ?? null);
        navigate(`/articles/${created.id}/edit`, { replace: true });
      } else if (id) {
        const updated = await updateArticle(id, payload);
        setUpdatedAt(updated.updated_at ?? null);
      }

      if (savedId) {
        if (featured) {
          await setFeaturedArticle(savedId, featuredOrder);
        } else {
          await clearFeaturedArticle(savedId);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-neutral-500">Loading article...</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            {mode === "create" ? "Create Article" : "Edit Article"}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span className={`rounded-full border px-2.5 py-1 ${form.status === "published" ? "border-emerald-200 text-emerald-700" : form.status === "archived" ? "border-neutral-200 text-neutral-600" : "border-amber-200 text-amber-700"}`}>
              {form.status}
            </span>
            {updatedAt ? <span>Last updated {new Date(updatedAt).toLocaleString()}</span> : null}
          </div>
          <p className="text-sm text-neutral-600">
            Scene-based editor. Story scenes are managed in Story Builder.
          </p>
          <NavLink className="text-xs text-neutral-500 underline" to="/articles">
            Back to Articles
          </NavLink>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm"
            type="button"
            onClick={() => {
              const confirmed = window.confirm("Save as draft? This will unpublish the article.");
              if (confirmed) {
                saveArticle("draft");
              }
            }}
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
            type="button"
            onClick={() => {
              const confirmed = window.confirm("Publish this article? It will appear on the public site.");
              if (confirmed) {
                saveArticle("published");
              }
            }}
            disabled={saving}
          >
            Publish
          </button>
          <button
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-600"
            type="button"
            onClick={() => {
              const confirmed = window.confirm("Archive this article? It will be hidden from the public site.");
              if (confirmed) {
                saveArticle("archived");
              }
            }}
            disabled={saving}
          >
            Archive
          </button>
        </div>
      </header>

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Core Article
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Title
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Slug
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    handleChange("slug", event.target.value);
                  }}
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-neutral-600">
                  Status
                  <select
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    value={form.status}
                    onChange={(event) =>
                      handleChange("status", event.target.value as ArticleForm["status"])
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
                <label className="text-sm text-neutral-600">
                  Release Date
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    type="date"
                    value={form.release_date}
                    onChange={(event) => handleChange("release_date", event.target.value)}
                  />
                </label>
              </div>
              <label className="text-sm text-neutral-600">
                Theme
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.theme}
                  onChange={(event) => handleChange("theme", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Tags (comma separated)
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.tags}
                  onChange={(event) => handleChange("tags", event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Hero + Story
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Hero Title
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.hero_title}
                  onChange={(event) => handleChange("hero_title", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Hero Subtitle
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.hero_subtitle}
                  onChange={(event) => handleChange("hero_subtitle", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Philosophy
                <textarea
                  className="mt-2 h-24 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.philosophy}
                  onChange={(event) => handleChange("philosophy", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Story Content
                <textarea
                  className="mt-2 h-28 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.story_content}
                  onChange={(event) => handleChange("story_content", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Product Description
                <textarea
                  className="mt-2 h-24 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.product_description}
                  onChange={(event) => handleChange("product_description", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                Shopee Link
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.shopee_link}
                  onChange={(event) => handleChange("shopee_link", event.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              SEO
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                SEO Title
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.seo_title}
                  onChange={(event) => handleChange("seo_title", event.target.value)}
                />
              </label>
              <label className="text-sm text-neutral-600">
                SEO Description
                <textarea
                  className="mt-2 h-20 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.seo_description}
                  onChange={(event) => handleChange("seo_description", event.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Media
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Cover Image
                <select
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.cover_image_id}
                  onChange={(event) => handleChange("cover_image_id", event.target.value)}
                >
                  <option value="">No cover image</option>
                  {mediaAssets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.folder ? `[${asset.folder}] ` : ""}
                      {asset.alt_text || asset.id}
                    </option>
                  ))}
                </select>
              </label>
              {mediaPreview ? (
                <img className="h-40 w-full rounded-lg object-cover" src={mediaPreview} alt="Cover" />
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
                  Cover image preview appears here.
                </div>
              )}
              <label className="text-sm text-neutral-600">
                Open Graph Image
                <select
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  value={form.og_image_id}
                  onChange={(event) => handleChange("og_image_id", event.target.value)}
                >
                  <option value="">No OG image</option>
                  {mediaAssets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.folder ? `[${asset.folder}] ` : ""}
                      {asset.alt_text || asset.id}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Featured Article
            </h2>
            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                />
                Feature this article on homepage
              </label>
              <label className="text-sm text-neutral-600">
                Featured Order
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                  type="number"
                  min={1}
                  value={featuredOrder}
                  onChange={(event) => setFeaturedOrder(Number(event.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Scenes
              </h2>
              {id ? (
                <NavLink className="text-sm text-neutral-900 underline" to={`/articles/${id}/scenes`}>
                  Manage Scenes
                </NavLink>
              ) : null}
            </div>
            <div className="mt-4 rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
              Save the article first to manage story scenes.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
