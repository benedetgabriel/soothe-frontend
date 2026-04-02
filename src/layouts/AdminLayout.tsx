import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/home', label: 'Página Inicial', icon: 'home' },
  { to: '/admin/produtos', label: 'Produtos', icon: 'inventory_2' },
  { to: '/admin/pedidos', label: 'Pedidos', icon: 'shopping_bag' },
  { to: '/admin/config', label: 'Configurações', icon: 'settings' },
];

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/home': 'Página Inicial',
  '/admin/produtos': 'Produtos',
  '/admin/produtos/novo': 'Novo Produto',
  '/admin/pedidos': 'Pedidos',
  '/admin/config': 'Configurações',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle =
    pageTitles[location.pathname] ??
    (location.pathname.startsWith('/admin/produtos/') ? 'Editar Produto' : 'Admin');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — no borders, bg shift only */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col
          bg-surface-container-low
          transition-transform duration-200 ease-in-out
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="font-headline text-xl italic text-on-surface">Soothe</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container">
            Admin
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 no-underline transition-all duration-200 text-sm ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm cursor-pointer border-none bg-transparent text-on-surface-variant hover:bg-surface-container-high transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="md:ml-[260px] min-h-screen flex flex-col">
        {/* Header — no border, just bg shift */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-8 py-5 bg-surface">
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border-none cursor-pointer bg-surface-container-high text-on-surface"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <h1 className="font-headline text-xl text-on-surface">{pageTitle}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
