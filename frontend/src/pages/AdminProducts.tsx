import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../mocks/catalog';
import type { Product } from '../types/catalog';
import AdminCategories from './AdminCategories';
import AdminTags from './AdminTags';

type Tab = 'produtos' | 'categorias' | 'tags';

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'produtos', label: 'Produtos', icon: 'inventory_2' },
  { key: 'categorias', label: 'Categorias', icon: 'category' },
  { key: 'tags', label: 'Tags', icon: 'label' },
];

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getPriceRange(product: Product) {
  const prices = product.variants.filter((v) => v.isActive).map((v) => v.price);
  if (prices.length === 0) return '—';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatCurrency(min);
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

function getTotalStock(product: Product) {
  return product.variants.reduce((sum, v) => sum + v.stockQuantity, 0);
}

export default function AdminProducts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('produtos');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && p.isActive) ||
        (statusFilter === 'inactive' && !p.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="max-w-6xl">
      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-surface-container-low rounded-xl p-1.5 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
              border-none cursor-pointer transition-all duration-200
              ${
                activeTab === tab.key
                  ? 'bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_rgba(47,52,48,0.06)]'
                  : 'bg-transparent text-on-surface-variant hover:text-on-surface'
              }
            `}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'produtos' && (
        <>
          {/* Header row */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por nome, marca ou SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-high transition-colors duration-200"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="h-11 px-4 rounded-xl bg-surface-container-low text-on-surface text-sm border-none outline-none cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%235c605c%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat"
              >
                <option value="all">Todos</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>

              {/* New product button */}
              <button
                onClick={() => navigate('/admin/produtos/novo')}
                className="flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Novo Produto
              </button>
            </div>
          </div>

          {/* Product count */}
          <p className="text-sm text-on-surface-variant mb-4">
            {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
          </p>

          {/* Product table */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-on-surface-variant">
                  <th className="font-medium px-6 py-4">Produto</th>
                  <th className="font-medium px-4 py-4">Status</th>
                  <th className="font-medium px-4 py-4">Variantes</th>
                  <th className="font-medium px-4 py-4">Preco</th>
                  <th className="font-medium px-4 py-4">Estoque</th>
                  <th className="font-medium px-4 py-4 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const cover = product.images.find((img) => img.isCover);
                  const stock = getTotalStock(product);
                  return (
                    <tr
                      key={product.id}
                      onClick={() => navigate(`/admin/produtos/${product.id}`)}
                      className="border-t border-outline-variant/15 hover:bg-surface-container-low/50 cursor-pointer transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-surface-container-high flex-shrink-0 overflow-hidden">
                            {cover ? (
                              <img
                                src={cover.url}
                                alt={cover.altText}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-outline-variant text-lg">
                                  image
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-on-surface">{product.name}</p>
                            <p className="text-xs text-on-surface-variant mt-0.5">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                            product.isActive
                              ? 'bg-primary-container/60 text-on-primary-container'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.isActive ? 'bg-primary' : 'bg-outline-variant'
                            }`}
                          />
                          {product.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-on-surface-variant">
                        {product.variants.length}
                      </td>
                      <td className="px-4 py-4 text-on-surface">
                        {getPriceRange(product)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`${
                            stock === 0
                              ? 'text-error font-medium'
                              : stock < 20
                                ? 'text-on-surface-variant'
                                : 'text-on-surface'
                          }`}
                        >
                          {stock} un.
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/produtos/${product.id}`);
                          }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <span className="material-symbols-outlined mb-3 text-[32px] text-outline-variant block">
                        search_off
                      </span>
                      <p className="text-on-surface-variant">Nenhum produto encontrado</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'categorias' && <AdminCategories />}
      {activeTab === 'tags' && <AdminTags />}
    </div>
  );
}
