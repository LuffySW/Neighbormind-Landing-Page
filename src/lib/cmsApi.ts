import { supabase, isSupabaseConfigured } from "./supabaseClient";
import type { Product, Scene } from "../types";

type ArticleIndexRow = {
  id: string;
  title: string;
  slug: string;
  theme: string | null;
  release_date: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  og_image_url: string | null;
  published_at: string | null;
};

type CarouselItemRow = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
};

type SceneRow = {
  id: string;
  scene_title: string | null;
  large_headline: string | null;
  supporting_narrative: string | null;
  background_image_url: string | null;
  display_order: number | null;
  carousel_items: CarouselItemRow[] | null;
};

type ArticleDetailRow = ArticleIndexRow & {
  philosophy: string | null;
  story_content: string | null;
  product_description: string | null;
  shopee_link: string | null;
  scenes: SceneRow[] | null;
};

const fallbackImage = "/img/hero/IMG_0514.webp";

const splitLines = (value: string | null | undefined) =>
  value
    ? value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

const splitParagraphs = (value: string | null | undefined) =>
  value
    ? value
        .split(/\r?\n\r?\n|\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

const mapScene = (scene: SceneRow): Scene => {
  const hasCarousel = Boolean(scene.carousel_items && scene.carousel_items.length > 0);
  const headlineLines = splitLines(scene.large_headline ?? "");

  return {
    title: scene.scene_title ?? undefined,
    subtitle: hasCarousel ? scene.large_headline ?? undefined : undefined,
    text: !hasCarousel && headlineLines.length > 0 ? headlineLines : undefined,
    details: splitParagraphs(scene.supporting_narrative),
    carousel: scene.carousel_items?.map((item) => ({
      img: item.image_url ?? fallbackImage,
      title: item.title ?? "Untitled",
      desc: item.description ?? ""
    }))
  };
};

const mapIndexRowToProduct = (row: ArticleIndexRow): Product => {
  const image = row.cover_image_url ?? row.og_image_url ?? fallbackImage;

  return {
    id: row.id,
    name: row.title,
    price: "Rp -",
    desc: row.seo_description ?? row.hero_subtitle ?? "",
    longDesc: row.hero_subtitle ?? row.seo_description ?? "",
    img: image,
    hoverImg: row.og_image_url ?? image,
    collection: row.theme ?? "Single Releases",
    scenes: []
  };
};

const mapDetailRowToProduct = (row: ArticleDetailRow): Product => {
  const image = row.cover_image_url ?? row.og_image_url ?? fallbackImage;
  const scenes = row.scenes?.map(mapScene) ?? [];
  const fallbackSceneLines = splitLines(row.story_content ?? "");

  const finalScenes = scenes.length > 0 ? scenes : fallbackSceneLines.length > 0 ? [{ text: fallbackSceneLines }] : undefined;

  // Set isFinal: true for the very last scene so the CTA section appears
  if (finalScenes && finalScenes.length > 0) {
    finalScenes[finalScenes.length - 1].isFinal = true;
  }

  return {
    id: row.id,
    name: row.title,
    price: "Rp 120.000", // Menyesuaikan default harga, karena tidak ada field harga di DB saat ini
    originalPrice: "Rp 130.000",
    desc: row.seo_description ?? row.hero_subtitle ?? "",
    longDesc: row.product_description ?? row.story_content ?? "",
    img: image,
    hoverImg: row.og_image_url ?? image,
    collection: row.theme ?? "Single Releases",
    scenes: finalScenes,
    shopeeLink: row.shopee_link ?? undefined
  };
};

export async function fetchPublishedArticles(): Promise<Product[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from("public_article_index_view")
    .select("id,title,slug,theme,release_date,hero_title,hero_subtitle,seo_title,seo_description,tags,cover_image_url,og_image_url,published_at")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error || !data) {
    console.warn("Failed to load articles.", error?.message);
    return [];
  }

  return (data as ArticleIndexRow[]).map(mapIndexRowToProduct);
}

export async function fetchArticleDetail(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("public_article_detail_view")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    console.warn("Failed to load article detail.", error?.message);
    return null;
  }

  return mapDetailRowToProduct(data as ArticleDetailRow);
}
