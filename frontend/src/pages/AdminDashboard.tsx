const stats = [
  { label: 'Pedidos', value: '24', icon: 'shopping_bag', trend: '+12%' },
  { label: 'Receita', value: 'R$ 4.320', icon: 'payments', trend: '+8%' },
  { label: 'Produtos', value: '56', icon: 'inventory_2', trend: '+3' },
  { label: 'Clientes', value: '182', icon: 'group', trend: '+15%' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="max-w-5xl">
      {/* Greeting */}
      <div className="mb-10">
        <h2 className="font-headline text-3xl text-on-surface mb-2">
          {getGreeting()} &#x1f44b;
        </h2>
        <p className="text-on-surface-variant">
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </p>
      </div>

      {/* Stat cards — no borders, tonal bg, ambient shadow on hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(47,52,48,0.05)] hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                {stat.trend}
              </span>
            </div>
            <p className="font-headline text-2xl text-on-surface mb-1">{stat.value}</p>
            <p className="text-sm text-on-surface-variant">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Placeholder */}
      <div className="rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest min-h-[240px]">
        <span className="material-symbols-outlined mb-4 text-[40px] text-outline-variant">
          bar_chart
        </span>
        <p className="font-headline text-lg text-on-surface mb-1">Em breve</p>
        <p className="text-sm text-on-surface-variant">
          Gráficos de vendas, tabela de pedidos recentes e mais.
        </p>
      </div>
    </div>
  );
}
