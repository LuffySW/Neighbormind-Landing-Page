import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { RouteGuard } from "../components/RouteGuard";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Articles } from "../pages/Articles";
import { ArticleEditor } from "../pages/ArticleEditor";
import { StoryBuilder } from "../pages/StoryBuilder";
import { MediaLibrary } from "../pages/MediaLibrary";
import { BrandSettings } from "../pages/BrandSettings";
import { HomepageSettings } from "../pages/HomepageSettings";
import { NotFound } from "../pages/NotFound";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          element={
            <RouteGuard>
              <AdminLayout />
            </RouteGuard>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/new" element={<ArticleEditor mode="create" />} />
          <Route path="/articles/:id/edit" element={<ArticleEditor mode="edit" />} />
          <Route path="/articles/:id/scenes" element={<StoryBuilder />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/settings/brand" element={<BrandSettings />} />
          <Route path="/settings/homepage" element={<HomepageSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
