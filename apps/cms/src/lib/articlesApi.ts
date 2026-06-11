import { supabase } from "./supabaseClient";

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  theme: string | null;
  release_date: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  philosophy: string | null;
  story_content: string | null;
  product_description: string | null;
  shopee_link: string | null;
  seo_title: string | null;
  seo_description: string | null;
  cover_image_id: string | null;
  og_image_id: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type FeaturedRow = {
  article_id: string;
  display_order: number;
};


export async function listArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("id,title,slug,status,release_date,tags,cover_image_id,published_at")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ArticleRow[];
}

export async function getArticle(id: string) {
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ArticleRow;
}

export async function createArticle(payload: Partial<ArticleRow>) {
  const { data, error } = await supabase.from("articles").insert(payload).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ArticleRow;
}

export async function updateArticle(id: string, payload: Partial<ArticleRow>) {
  const { data, error } = await supabase
    .from("articles")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ArticleRow;
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function isSlugUnique(slug: string, ignoreId?: string) {
  let query = supabase.from("articles").select("id").eq("slug", slug).limit(1);

  if (ignoreId) {
    query = query.neq("id", ignoreId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).length === 0;
}

export async function updateArticleStatus(id: string, status: ArticleRow["status"]) {
  const payload: Partial<ArticleRow> = {
    status,
    updated_at: new Date().toISOString(),
    published_at: status === "published" ? new Date().toISOString() : null
  };

  const { data, error } = await supabase
    .from("articles")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ArticleRow;
}

export async function getFeaturedArticle(articleId: string) {
  const { data, error } = await supabase
    .from("homepage_featured_articles")
    .select("article_id,display_order")
    .eq("article_id", articleId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as FeaturedRow | null;
}

export async function setFeaturedArticle(articleId: string, displayOrder: number) {
  const { error } = await supabase
    .from("homepage_featured_articles")
    .upsert({ article_id: articleId, display_order: displayOrder });

  if (error) {
    throw new Error(error.message);
  }
}

export async function clearFeaturedArticle(articleId: string) {
  const { error } = await supabase
    .from("homepage_featured_articles")
    .delete()
    .eq("article_id", articleId);

  if (error) {
    throw new Error(error.message);
  }
}

