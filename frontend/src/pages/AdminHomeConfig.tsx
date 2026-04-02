import { useState } from 'react';
import { mockProducts } from '../mocks/catalog';
import { defaultHomeConfig, loadHomeConfig, saveHomeConfig } from '../mocks/home-config';
import { getActiveProducts, getCoverImage } from '../lib/product-helpers';
import HomeContent from '../components/store/HomeContent';
import type { HomePageConfig, GallerySlot } from '../types/home-config';

type Tab = 'galeria' | 'vitrine' | 'textos';

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'galeria', label: 'Galeria', icon: 'photo_library' },
  { key: 'vitrine', label: 'Vitrine', icon: 'storefront' },
  { key: 'textos', label: 'Textos', icon: 'text_fields' },
];

const SLOT_LABELS = [
  'Slot 1 — Hero (8 colunas)',
  'Slot 2 — Topo Direito (4 colunas)',
  'Slot 3 — Detalhe (4 colunas)',
  'Slot 4 — Esquerda (4 colunas)',
  'Slot 5 — Direita Grande (8 colunas)',
  'Slot 6 — Final (6 colunas)',
];

export default function AdminHomeConfig() {
  const [config, setConfig] = useState<HomePageConfig>(loadHomeConfig);
  const [activeTab, setActiveTab] = useState<Tab>('galeria');
  const [previewing, setPreviewing] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeProducts = getActiveProducts(mockProducts);

  // --- Helpers ---

  const updateGallerySlot = (index: number, patch: Partial<GallerySlot>) => {
    const gallery = [...config.gallery] as HomePageConfig['gallery'];
    gallery[index] = { ...gallery[index], ...patch };
    setConfig({ ...config, gallery });
  };

  const handleProductSelect = (slotIndex: number, productId: string) => {
    if (productId === '') {
      updateGallerySlot(slotIndex, { productId: null });
      return;
    }
    const product = mockProducts.find((p) => p.id === Number(productId));
    if (!product) return;
    const cover = getCoverImage(product);
    updateGallerySlot(slotIndex, {
      productId: product.id,
      imageUrl: cover?.url ?? config.gallery[slotIndex].imageUrl,
      imageAlt: cover?.altText ?? product.name,
    });
  };

  const toggleShowcaseProduct = (productId: number) => {
    const ids = config.showcaseProductIds.includes(productId)
      ? config.showcaseProductIds.filter((id) => id !== productId)
      : [...config.showcaseProductIds, productId];
    setConfig({ ...config, showcaseProductIds: ids });
  };

  const moveShowcaseProduct = (index: number, direction: -1 | 1) => {
    const ids = [...config.showcaseProductIds];
    const target = index + direction;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    setConfig({ ...config, showcaseProductIds: ids });
  };

  const removeShowcaseProduct = (productId: number) => {
    setConfig({
      ...config,
      showcaseProductIds: config.showcaseProductIds.filter((id) => id !== productId),
    });
  };

  const handleSave = () => {
    saveHomeConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setConfig({ ...defaultHomeConfig });
  };

  // --- Preview ---

  if (previewing) {
    return (
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-2xl text-on-surface">Preview da Home</h2>
          <button
            onClick={() => setPreviewing(false)}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-surface-container-low text-on-surface-variant text-sm font-medium border-none cursor-pointer hover:bg-surface-container-high transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            Voltar à Edição
          </button>
        </div>
        <div
          className="bg-background rounded-xl overflow-hidden border border-outline-variant/20"
          style={{ height: '75vh' }}
        >
          <div
            className="origin-top-left px-6 py-12"
            style={{ transform: 'scale(0.5)', width: '200%' }}
          >
            <HomeContent config={config} />
          </div>
        </div>
      </div>
    );
  }

  // --- Form ---

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-headline text-2xl text-on-surface">Página Inicial</h2>
        <button
          onClick={() => setPreviewing(true)}
          className="flex items-center gap-2 h-10 px-5 rounded-xl bg-surface-container-low text-on-surface-variant text-sm font-medium border-none cursor-pointer hover:bg-surface-container-high transition-colors duration-150"
        >
          <span className="material-symbols-outlined text-lg">visibility</span>
          Visualizar
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 mb-8 bg-surface-container-low rounded-xl p-1.5 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
              border-none cursor-pointer transition-all duration-200
              ${
                activeTab === t.key
                  ? 'bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_rgba(47,52,48,0.06)]'
                  : 'bg-transparent text-on-surface-variant hover:text-on-surface'
              }
            `}
          >
            <span className="material-symbols-outlined text-lg">{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── GALERIA ── */}
      {activeTab === 'galeria' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {config.gallery.map((slot, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl p-6">
              <div className="flex items-start gap-4 mb-5">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-high shrink-0">
                  {slot.imageUrl ? (
                    <img
                      src={slot.imageUrl}
                      alt={slot.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-outline-variant">
                        image
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface">{SLOT_LABELS[i]}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 truncate">
                    {slot.productId
                      ? mockProducts.find((p) => p.id === slot.productId)?.name ?? 'Produto'
                      : 'Imagem personalizada'}
                  </p>
                </div>
              </div>

              {/* Product select */}
              <div className="mb-4">
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Produto
                </label>
                <select
                  value={slot.productId ?? ''}
                  onChange={(e) => handleProductSelect(i, e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none cursor-pointer focus:bg-surface-container-highest transition-colors duration-200"
                >
                  <option value="">Imagem personalizada</option>
                  {activeProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom image URL — always visible so user can override */}
              <div className="mb-4">
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  value={slot.imageUrl}
                  onChange={(e) => updateGallerySlot(i, { imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>

              {/* Alt text */}
              <div className="mb-4">
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Texto Alternativo
                </label>
                <input
                  type="text"
                  value={slot.imageAlt}
                  onChange={(e) => updateGallerySlot(i, { imageAlt: e.target.value })}
                  placeholder="Descrição da imagem"
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>

              {/* Overlay text */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Label
                  </label>
                  <input
                    type="text"
                    value={slot.label}
                    onChange={(e) => updateGallerySlot(i, { label: e.target.value })}
                    placeholder="Ex: Série Principal"
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Titulo
                  </label>
                  <input
                    type="text"
                    value={slot.title}
                    onChange={(e) => updateGallerySlot(i, { title: e.target.value })}
                    placeholder="Ex: Cloud Silk"
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VITRINE ── */}
      {activeTab === 'vitrine' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Showcase texts */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Textos da Vitrine</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Titulo
                </label>
                <input
                  type="text"
                  value={config.showcaseTitle}
                  onChange={(e) => setConfig({ ...config, showcaseTitle: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Subtitulo
                </label>
                <input
                  type="text"
                  value={config.showcaseSubtitle}
                  onChange={(e) => setConfig({ ...config, showcaseSubtitle: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Selected products — ordered */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-1">Produtos Selecionados</h3>
            <p className="text-xs text-on-surface-variant mb-5">
              O primeiro da lista aparece como destaque na vitrine.
            </p>

            {config.showcaseProductIds.length === 0 && (
              <p className="text-sm text-on-surface-variant py-6 text-center">
                Nenhum produto selecionado
              </p>
            )}

            <div className="space-y-2">
              {config.showcaseProductIds.map((id, idx) => {
                const product = mockProducts.find((p) => p.id === id);
                if (!product) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container-low"
                  >
                    <span className="text-xs font-medium text-on-surface-variant w-5 text-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-on-surface flex-1 truncate">{product.name}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveShowcaseProduct(idx, -1)}
                        disabled={idx === 0}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-default transition-colors duration-150"
                      >
                        <span className="material-symbols-outlined text-base">arrow_upward</span>
                      </button>
                      <button
                        onClick={() => moveShowcaseProduct(idx, 1)}
                        disabled={idx === config.showcaseProductIds.length - 1}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-default transition-colors duration-150"
                      >
                        <span className="material-symbols-outlined text-base">arrow_downward</span>
                      </button>
                      <button
                        onClick={() => removeShowcaseProduct(id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-error hover:bg-error/10 transition-colors duration-150"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available products */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Produtos Disponíveis</h3>
            <div className="space-y-1">
              {activeProducts.map((product) => {
                const selected = config.showcaseProductIds.includes(product.id);
                return (
                  <label
                    key={product.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors duration-150"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleShowcaseProduct(product.id)}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span
                      className={`text-sm ${selected ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}
                    >
                      {product.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TEXTOS ── */}
      {activeTab === 'textos' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Cabeçalho</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Titulo
                </label>
                <input
                  type="text"
                  value={config.headerTitle}
                  onChange={(e) => setConfig({ ...config, headerTitle: e.target.value })}
                  className="w-full h-12 px-5 rounded-xl bg-surface-container-high text-on-surface border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Subtitulo
                </label>
                <textarea
                  value={config.headerSubtitle}
                  onChange={(e) => setConfig({ ...config, headerSubtitle: e.target.value })}
                  rows={3}
                  className="w-full px-5 py-3 rounded-xl bg-surface-container-high text-on-surface border-none outline-none resize-y placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Citação</h3>
            <div>
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Texto da Citação
              </label>
              <textarea
                value={config.quoteText}
                onChange={(e) => setConfig({ ...config, quoteText: e.target.value })}
                rows={3}
                className="w-full px-5 py-3 rounded-xl bg-surface-container-high text-on-surface border-none outline-none resize-y placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Chamada para Ação</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                  Titulo
                </label>
                <input
                  type="text"
                  value={config.ctaHeading}
                  onChange={(e) => setConfig({ ...config, ctaHeading: e.target.value })}
                  className="w-full h-12 px-5 rounded-xl bg-surface-container-high text-on-surface border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Botão Principal
                  </label>
                  <input
                    type="text"
                    value={config.ctaButton1Label}
                    onChange={(e) => setConfig({ ...config, ctaButton1Label: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Botão Secundário
                  </label>
                  <input
                    type="text"
                    value={config.ctaButton2Label}
                    onChange={(e) => setConfig({ ...config, ctaButton2Label: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-outline-variant/15">
        <button
          onClick={handleReset}
          className="h-11 px-6 rounded-xl bg-surface-container-high text-on-surface-variant text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-surface-container-highest"
        >
          Restaurar Padrão
        </button>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-primary font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Salvo
            </span>
          )}
          <button
            onClick={handleSave}
            className="h-11 px-8 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
