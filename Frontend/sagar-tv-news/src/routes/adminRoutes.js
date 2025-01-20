import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/pages/admin/AdminLayout';
import NewsList from '../components/pages/admin/NewsList';
import NewsForm from '../components/pages/admin/NewsForm';

const adminRoutes = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="news" replace />,
    },
    {
      path: 'news',
      element: <NewsList />,
    },
    {
      path: 'news/create',
      element: <NewsForm />,
    },
    {
      path: 'news/edit/:id',
      element: <NewsForm />,
    },
  ],
};

export default adminRoutes;
