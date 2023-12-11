import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routes } from './routes/routes.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageContainer from './components/PageContainer/index.jsx';
import Header from './components/Header/index.jsx';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageContainer>
      <RouterProvider router={router} />
    </PageContainer>
  </React.StrictMode>,
);
