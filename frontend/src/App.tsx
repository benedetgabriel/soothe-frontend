import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { theme } from './styles/theme';

export default function App() {
  return (
    <ConfigProvider theme={theme} locale={ptBR}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
