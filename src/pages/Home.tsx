import { useHomeConfig } from '../hooks/useHomeConfig';
import HomeContent from '../components/store/HomeContent';

export default function Home() {
  const config = useHomeConfig();
  return <HomeContent config={config} />;
}
