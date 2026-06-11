import { supabase } from "./supabaseClient";

type SceneRow = {
  id: string;
  article_id: string;
  scene_title: string | null;
  large_headline: string | null;
  supporting_narrative: string | null;
  background_image_id: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
};

export async function listScenes(articleId: string) {
  const { data, error } = await supabase
    .from("story_scenes")
    .select("id,article_id,scene_title,large_headline,supporting_narrative,background_image_id,display_order,created_at,updated_at")
    .eq("article_id", articleId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SceneRow[];
}

export async function createScene(articleId: string, payload: Partial<SceneRow>) {
  const { data, error } = await supabase
    .from("story_scenes")
    .insert({ ...payload, article_id: articleId })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as SceneRow;
}

export async function updateScene(id: string, payload: Partial<SceneRow>) {
  const { data, error } = await supabase
    .from("story_scenes")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as SceneRow;
}

export async function deleteScene(id: string) {
  const { error } = await supabase.from("story_scenes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
