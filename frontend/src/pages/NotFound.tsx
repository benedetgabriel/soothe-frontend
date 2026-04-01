import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="font-headline text-8xl text-primary mb-6">404</h1>
        <p className="font-headline text-2xl text-on-surface mb-2">Pagina nao encontrada</p>
        <p className="text-on-surface-variant mb-10">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <Button onClick={() => navigate('/')}>Voltar ao inicio</Button>
      </div>
    </div>
  );
}
