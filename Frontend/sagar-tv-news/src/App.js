import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import { AuthProvider } from './context/AuthContext';
import AdminGuard from './components/guards/AdminGuard';

// Lazy load components
const LandingPage = lazy(() => import('./components/pages/landingPage/LandingPage'));
const NewsDetail = lazy(() => import('./components/pages/newsDetail/NewsDetail'));
const CategoryNews = lazy(() => import('./components/pages/categoryNews/CategoryNews'));
const AdminLayout = lazy(() => import('./components/pages/admin/AdminLayout'));
const NewsList = lazy(() => import('./components/pages/admin/NewsList'));
const NewsForm = lazy(() => import('./components/pages/admin/NewsForm'));
const CategoryList = lazy(() => import('./components/pages/admin/CategoryList'));
const DistrictList = lazy(() => import('./components/pages/admin/DistrictList'));
const HeaderNewsDetail = lazy(() => import('./components/pages/newsDetail/HeaderNewsDetail'));
const AdminLogin = lazy(() => import('./components/pages/admin/AdminLogin'));
const AdminSignup = lazy(() => import('./components/pages/admin/AdminSignup'));

function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/:category" element={<CategoryNews />} />
            <Route path="/location/:district" element={<CategoryNews />} />
            <Route path="/header-news/:id" element={<HeaderNewsDetail />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }>
              <Route index element={<NewsList />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/create" element={<NewsForm />} />
              <Route path="news/edit/:id" element={<NewsForm />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="districts" element={<DistrictList />} />
            </Route>
          </Routes>
        </Suspense>
      </NewsProvider>
    </AuthProvider>
  );
}

export default App;
