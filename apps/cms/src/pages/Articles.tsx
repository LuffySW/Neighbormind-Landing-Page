import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteArticle, listArticles, updateArticleStatus } from "../lib/articlesApi";

type ArticleListItem = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  release_date: string | null;
  tags: string[] | null;
};

const statusStyles: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  archived: "bg-neutral-100 text-neutral-600 border-neutral-200"
};

export function Articles() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadArticles = async () => {
      try {
        const data = await listArticles();
        if (isMounted) {
          setArticles(data as ArticleListItem[]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load articles.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((article) => {
      article.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.slug.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      const matchesTag =
        tagFilter === "all" || (article.tags ?? []).includes(tagFilter);
      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [articles, search, statusFilter, tagFilter]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this article? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete article.");
    }
  };

  const handleStatusChange = async (id: string, status: ArticleListItem["status"]) => {
    const message =
      status === "published"
        ? "Publish this article? It will appear on the public site."
        : status === "archived"
          ? "Archive this article? It will be hidden from the public site."
          : "Unpublish this article? It will move back to draft.";
    const confirmed = window.confirm(message);
    if (!confirmed) return;

    try {
      const updated = await updateArticleStatus(id, status);
      setArticles((prev) =>
        prev.map((article) => (article.id === updated.id ? { ...article, status: updated.status } : article))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Articles</h1>
          <p className="text-sm text-neutral-600">Kelola Article, tag, dan status.</p>
        </div>
        <NavLink
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
          to="/articles/new"
        >
          New Article
        </NavLink>
      </div>

      <section className="rounded-xl border border-neutral-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1.3fr_0.6fr_0.6fr_0.4fr]">
          <input
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            placeholder="Search title or slug"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            value={tagFilter}
            onChange={(event) => setTagFilter(event.target.value)}
          >
            <option value="all">Tag: All</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <button
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600"
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setTagFilter("all");
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          <span>Article</span>
          <span>Status</span>
          <span>Release</span>
          <span>Actions</span>
        </div>
        {loading ? (
          <div className="px-6 py-8 text-sm text-neutral-500">Loading articles...</div>
        ) : error ? (
          <div className="px-6 py-8 text-sm text-rose-500">{error}</div>
        ) : filteredArticles.length === 0 ? (
          <div className="px-6 py-8 text-sm text-neutral-500">No articles found.</div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-neutral-900">{article.title}</p>
                  <p className="text-xs text-neutral-500">{article.slug}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(article.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${
                      statusStyles[article.status]
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
                <div className="text-neutral-600">{article.release_date ?? "-"}</div>
                <div className="flex flex-col gap-2 text-sm">
                  <NavLink className="text-neutral-900 underline" to={`/articles/${article.id}/edit`}>
                    Edit
                  </NavLink>
                  <NavLink className="text-neutral-500 underline" to={`/articles/${article.id}/scenes`}>
                    Scenes
                  </NavLink>
                  {article.status !== "published" ? (
                    <button
                      className="text-xs text-neutral-500 underline"
                      type="button"
                      onClick={() => handleStatusChange(article.id, "published")}
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      className="text-xs text-neutral-500 underline"
                      type="button"
                      onClick={() => handleStatusChange(article.id, "draft")}
                    >
                      Unpublish
                    </button>
                  )}
                  {article.status !== "archived" ? (
                    <button
                      className="text-xs text-neutral-500 underline"
                      type="button"
                      onClick={() => handleStatusChange(article.id, "archived")}
                    >
                      Archive
                    </button>
                  ) : null}
                  <button
                    className="text-xs text-rose-500 underline"
                    type="button"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
