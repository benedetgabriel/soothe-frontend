import { Outlet, Link, useLocation } from 'react-router-dom';

export default function StoreLayout() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Loja' },
    { to: '/produtos', label: 'Produtos' },
    { to: '#', label: 'Materiais' },
    { to: '#', label: 'Nossa História' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Floating Pill Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full bg-surface/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(47,52,48,0.05)] z-50 flex justify-between items-center px-10 py-4">
        <Link to="/" className="font-headline text-2xl italic text-on-surface no-underline">Soothe</Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`font-headline transition-colors duration-300 tracking-tight text-lg no-underline ${
                location.pathname === link.to
                  ? 'text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 text-on-surface-variant">
          <button className="hover:text-on-surface transition-colors duration-200 bg-transparent border-none cursor-pointer text-inherit">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="hover:text-on-surface transition-colors duration-200 bg-transparent border-none cursor-pointer text-inherit">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="hover:text-on-surface transition-colors duration-200 bg-transparent border-none cursor-pointer text-inherit">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </nav>

      {/* Page content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto rounded-t-[48px] mt-20 bg-surface-container flex flex-col md:flex-row justify-between items-center px-12 py-16">
        <div className="mb-8 md:mb-0">
          <div className="font-headline text-xl text-on-surface mb-2">Soothe Editorial.</div>
          <p className="text-on-surface-variant text-sm tracking-wide">Conforto Restaurado.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Sustentabilidade</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Envio</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Trocas</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Privacidade</a>
        </div>
        <div className="text-on-surface-variant text-xs tracking-widest opacity-80">
          &copy; 2026 Soothe Editorial. Conforto Restaurado.
        </div>
      </footer>
    </div>
  );
}
