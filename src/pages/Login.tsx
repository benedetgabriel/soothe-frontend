import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ui';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = () => {
    localStorage.setItem('admin_token', 'mock');
    navigate('/admin');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left — editorial panel */}
      <div className="hidden md:flex flex-col justify-end p-16 bg-gradient-to-br from-primary via-primary-dim to-[#4a473f] relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(233,226,214,0.15),transparent)]" />
        <div className="relative z-10">
          <p className="text-on-primary/40 text-xs uppercase tracking-[0.2em] font-medium mb-4">
            Painel Administrativo
          </p>
          <h1 className="font-headline text-5xl text-on-primary leading-tight mb-4">
            Soothe
          </h1>
          <p className="text-on-primary/60 text-lg font-light leading-relaxed max-w-sm">
            Gerencie seu marketplace de conforto com simplicidade e elegância.
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-surface">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="md:hidden mb-10 text-center">
            <h2 className="font-headline text-3xl text-on-surface italic">Soothe</h2>
          </div>

          <div className="mb-10">
            <h3 className="font-headline text-3xl text-on-surface mb-2">Bem-vindo de volta</h3>
            <p className="text-on-surface-variant">
              Entre com suas credenciais para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Informe seu e-mail',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'E-mail inválido',
                },
              })}
            />

            <Input
              label="Senha"
              isPassword
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Informe sua senha' })}
            />

            <div className="pt-2">
              <Button type="submit" block>Entrar</Button>
            </div>
          </form>

          <div className="text-center mt-8">
            <a href="/" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
              &larr; Voltar à loja
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
