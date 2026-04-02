import { createBrowserRouter } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout';
import Home from '../pages/Home';
import Produtos from '../pages/Produtos';
import Login from '../pages/Login';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminProductForm from '../pages/AdminProductForm';
import AdminOrders from '../pages/AdminOrders';
import AdminSettings from '../pages/AdminSettings';
import AdminHomeConfig from '../pages/AdminHomeConfig';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'produtos', element: <Produtos /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'produtos', element: <AdminProducts /> },
          { path: 'produtos/novo', element: <AdminProductForm /> },
          { path: 'produtos/:id', element: <AdminProductForm /> },
          { path: 'home', element: <AdminHomeConfig /> },
          { path: 'pedidos', element: <AdminOrders /> },
          { path: 'config', element: <AdminSettings /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
