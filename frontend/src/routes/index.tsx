import { createBrowserRouter } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout';
import Home from '../pages/Home';
import Admin from '../pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);
