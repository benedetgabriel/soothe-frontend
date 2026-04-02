import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, mockCategories, mockTags } from '../mocks/catalog';
import { formatCurrency } from '../lib/product-helpers';
import type { ProductVariant, ProductImage } from '../types/catalog';

type Section = 'info' | 'variantes' | 'imagens' | 'categorias';

const sections: { key: Section; label: string; icon: string }[] = [
  { key: 'info', label: 'Informações', icon: 'info' },
  { key: 'variantes', label: 'Variantes', icon: 'view_list' },
  { key: 'imagens', label: 'Imagens', icon: 'image' },
  { key: 'categorias', label: 'Categorias & Tags', icon: 'category' },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const emptyVariant: Omit<ProductVariant, 'id' | 'productId'> = {
  sku: '',
  name: '',
  price: 0,
  compareAtPrice: null,
  costPrice: 0,
  stockQuantity: 0,
  weight: 0,
  width: 0,
  height: 0,
  depth: 0,
  isActive: true,
};

export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'novo';

  const existing = useMemo(
    () => (isNew ? null : mockProducts.find((p) => p.id === Number(id)) ?? null),
    [id, isNew],
  );

  const [activeSection, setActiveSection] = useState<Section>('info');

  // Form state
  const [name, setName] = useState(existing?.name ?? '');
  const [slug, setSlug] = useState(existing?.slug ?? '');
  const [shortDescription, setShortDescription] = useState(existing?.shortDescription ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [brand, setBrand] = useState(existing?.brand ?? '');
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);

  // Variants
  const [variants, setVariants] = useState<ProductVariant[]>(existing?.variants ?? []);
  const [editingVariant, setEditingVariant] = useState<Partial<ProductVariant> | null>(null);
  const [editingVariantIdx, setEditingVariantIdx] = useState<number | null>(null);

  // Images
  const [images] = useState<ProductImage[]>(existing?.images ?? []);

  // Categories & Tags
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    existing?.categories.map((c) => c.id) ?? [],
  );
  const [selectedTags, setSelectedTags] = useState<number[]>(
    existing?.tags.map((t) => t.id) ?? [],
  );

  const handleNameChange = (value: string) => {
    setName(value);
    if (isNew || slug === slugify(name)) {
      setSlug(slugify(value));
    }
  };

  const handleSave = () => {
    // Mock — navigate back
    navigate('/admin/produtos');
  };

  // Variant editing
  const handleNewVariant = () => {
    setEditingVariant({ ...emptyVariant });
    setEditingVariantIdx(null);
  };

  const handleEditVariant = (idx: number) => {
    setEditingVariant({ ...variants[idx] });
    setEditingVariantIdx(idx);
  };

  const handleSaveVariant = () => {
    if (!editingVariant) return;
    if (editingVariantIdx !== null) {
      const updated = [...variants];
      updated[editingVariantIdx] = { ...variants[editingVariantIdx], ...editingVariant };
      setVariants(updated);
    } else {
      setVariants([
        ...variants,
        {
          ...emptyVariant,
          ...editingVariant,
          id: Date.now(),
          productId: existing?.id ?? 0,
        } as ProductVariant,
      ]);
    }
    setEditingVariant(null);
    setEditingVariantIdx(null);
  };

  const handleRemoveVariant = (idx: number) => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const toggleCategory = (catId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId],
    );
  };

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    );
  };

  const rootCategories = mockCategories.filter((c) => c.parentId === null);
  const getChildren = (parentId: number) =>
    mockCategories.filter((c) => c.parentId === parentId);

  return (
    <div className="max-w-5xl">
      {/* Back + title */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/produtos')}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container-low border-none cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div>
          <h2 className="font-headline text-2xl text-on-surface">
            {isNew ? 'Novo Produto' : name || 'Editar Produto'}
          </h2>
          {!isNew && existing && (
            <p className="text-sm text-on-surface-variant mt-0.5">
              Criado em {new Date(existing.createdAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>

      {/* Section nav */}
      <div className="flex gap-1 mb-8 bg-surface-container-low rounded-xl p-1.5 w-fit">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
              border-none cursor-pointer transition-all duration-200
              ${
                activeSection === s.key
                  ? 'bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_rgba(47,52,48,0.06)]'
                  : 'bg-transparent text-on-surface-variant hover:text-on-surface'
              }
            `}
          >
            <span className="material-symbols-outlined text-lg">{s.icon}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ── INFO ── */}
      {activeSection === 'info' && (
        <div className="bg-surface-container-lowest rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Nome do Produto
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Jogo de Lençol Percal 400 Fios"
                className="w-full h-12 px-5 rounded-xl bg-surface-container-high text-on-surface border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="jogo-lencol-percal-400-fios"
                className="w-full h-12 px-5 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200 font-mono"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Marca
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ex: Soothe Home"
                className="w-full h-12 px-5 rounded-xl bg-surface-container-high text-on-surface border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
              />
            </div>

            {/* Short description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Descrição Curta
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Resumo que aparece em listagens"
                className="w-full h-12 px-5 rounded-xl bg-surface-container-high text-on-surface border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Descrição Completa
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Descrição detalhada do produto..."
                className="w-full px-5 py-4 rounded-xl bg-surface-container-high text-on-surface border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200 resize-none"
              />
            </div>
          </div>

          {/* Active toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setIsActive(!isActive)}
              className={`w-11 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
                isActive ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="text-sm text-on-surface">Produto ativo</span>
          </label>
        </div>
      )}

      {/* ── VARIANTES ── */}
      {activeSection === 'variantes' && (
        <div>
          {/* Variant list */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-on-surface-variant">
              {variants.length} {variants.length === 1 ? 'variante' : 'variantes'}
            </p>
            <button
              onClick={handleNewVariant}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Nova Variante
            </button>
          </div>

          {variants.length > 0 && (
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-on-surface-variant">
                    <th className="font-medium px-6 py-3.5">Variante</th>
                    <th className="font-medium px-4 py-3.5">SKU</th>
                    <th className="font-medium px-4 py-3.5">Preço</th>
                    <th className="font-medium px-4 py-3.5">Estoque</th>
                    <th className="font-medium px-4 py-3.5">Status</th>
                    <th className="font-medium px-4 py-3.5 w-24"></th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v, idx) => (
                    <tr
                      key={v.id}
                      className="border-t border-outline-variant/15"
                    >
                      <td className="px-6 py-3.5 font-medium text-on-surface">{v.name}</td>
                      <td className="px-4 py-3.5 text-on-surface-variant font-mono text-xs">
                        {v.sku}
                      </td>
                      <td className="px-4 py-3.5 text-on-surface">
                        {formatCurrency(v.price)}
                        {v.compareAtPrice && (
                          <span className="ml-2 text-xs text-on-surface-variant line-through">
                            {formatCurrency(v.compareAtPrice)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={
                            v.stockQuantity === 0
                              ? 'text-error font-medium'
                              : 'text-on-surface'
                          }
                        >
                          {v.stockQuantity}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                            v.isActive
                              ? 'bg-primary-container/60 text-on-primary-container'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {v.isActive ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditVariant(idx)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-colors duration-150"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button
                            onClick={() => handleRemoveVariant(idx)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-on-surface-variant hover:bg-error-container/30 hover:text-error transition-colors duration-150"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {variants.length === 0 && !editingVariant && (
            <div className="bg-surface-container-lowest rounded-xl p-12 flex flex-col items-center justify-center text-center mb-6">
              <span className="material-symbols-outlined mb-3 text-[32px] text-outline-variant">
                view_list
              </span>
              <p className="text-on-surface-variant text-sm">
                Nenhuma variante adicionada
              </p>
              <p className="text-on-surface-variant/60 text-xs mt-1">
                Variantes definem preço, estoque e opções do produto (ex: tamanho, cor)
              </p>
            </div>
          )}

          {/* Variant form */}
          {editingVariant && (
            <div className="bg-surface-container-lowest rounded-xl p-6">
              <h3 className="font-headline text-lg text-on-surface mb-5">
                {editingVariantIdx !== null ? 'Editar Variante' : 'Nova Variante'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={editingVariant.name ?? ''}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, name: e.target.value })
                    }
                    placeholder="Ex: Queen - Branco"
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={editingVariant.sku ?? ''}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, sku: e.target.value })
                    }
                    placeholder="Ex: LEN-P400-BRANCO-QUEEN"
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200 font-mono"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Preço
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingVariant.price ?? 0}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, price: Number(e.target.value) })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                {/* Compare at price */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Preço Comparativo
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingVariant.compareAtPrice ?? ''}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        compareAtPrice: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="Opcional"
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                {/* Cost price */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Custo
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingVariant.costPrice ?? 0}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, costPrice: Number(e.target.value) })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Estoque
                  </label>
                  <input
                    type="number"
                    value={editingVariant.stockQuantity ?? 0}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        stockQuantity: Number(e.target.value),
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingVariant.weight ?? 0}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, weight: Number(e.target.value) })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Largura (cm)
                  </label>
                  <input
                    type="number"
                    value={editingVariant.width ?? 0}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, width: Number(e.target.value) })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={editingVariant.height ?? 0}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, height: Number(e.target.value) })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                    Profundidade (cm)
                  </label>
                  <input
                    type="number"
                    value={editingVariant.depth ?? 0}
                    onChange={(e) =>
                      setEditingVariant({ ...editingVariant, depth: Number(e.target.value) })
                    }
                    className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none focus:bg-surface-container-highest transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Active + actions */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-outline-variant/15">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() =>
                      setEditingVariant({
                        ...editingVariant,
                        isActive: !editingVariant.isActive,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
                      editingVariant.isActive ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        editingVariant.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                  <span className="text-sm text-on-surface">Variante ativa</span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingVariant(null);
                      setEditingVariantIdx(null);
                    }}
                    className="h-10 px-5 rounded-xl bg-surface-container-high text-on-surface-variant text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-surface-container-highest"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveVariant}
                    className="h-10 px-5 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
                  >
                    {editingVariantIdx !== null ? 'Salvar' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── IMAGENS ── */}
      {activeSection === 'imagens' && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group bg-surface-container-lowest rounded-xl overflow-hidden aspect-square"
              >
                <img
                  src={img.url}
                  alt={img.altText}
                  className="w-full h-full object-cover"
                />
                {img.isCover && (
                  <span className="absolute top-2 left-2 text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-on-primary">
                    Capa
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/90 text-on-surface border-none cursor-pointer hover:bg-white">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/90 text-error border-none cursor-pointer hover:bg-white">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Upload placeholder */}
            <button className="bg-surface-container-lowest rounded-xl aspect-square border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-outline-variant/50 hover:bg-surface-container-low transition-all duration-200">
              <span className="material-symbols-outlined text-2xl text-outline-variant">
                add_photo_alternate
              </span>
              <span className="text-xs text-on-surface-variant">Adicionar</span>
            </button>
          </div>

          {images.length === 0 && (
            <div className="bg-surface-container-lowest rounded-xl p-12 flex flex-col items-center justify-center text-center mt-4">
              <span className="material-symbols-outlined mb-3 text-[32px] text-outline-variant">
                image
              </span>
              <p className="text-sm text-on-surface-variant">
                Nenhuma imagem adicionada
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── CATEGORIAS & TAGS ── */}
      {activeSection === 'categorias' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Categories */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Categorias</h3>
            <div className="space-y-1">
              {rootCategories.map((root) => (
                <div key={root.id}>
                  <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors duration-150">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(root.id)}
                      onChange={() => toggleCategory(root.id)}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span className="text-sm text-on-surface font-medium">{root.name}</span>
                  </label>
                  {getChildren(root.id).map((child) => (
                    <label
                      key={child.id}
                      className="flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors duration-150"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(child.id)}
                        onChange={() => toggleCategory(child.id)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-on-surface-variant">{child.name}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-surface-container-lowest rounded-xl p-6">
            <h3 className="font-headline text-lg text-on-surface mb-5">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`
                    flex items-center gap-1.5 h-9 px-4 rounded-full text-sm border-none cursor-pointer transition-all duration-200
                    ${
                      selectedTags.includes(tag.id)
                        ? 'bg-primary-container text-on-primary-container font-medium'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }
                  `}
                >
                  {selectedTags.includes(tag.id) && (
                    <span className="material-symbols-outlined text-base">check</span>
                  )}
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-outline-variant/15">
        <button
          onClick={() => navigate('/admin/produtos')}
          className="h-11 px-6 rounded-xl bg-surface-container-high text-on-surface-variant text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-surface-container-highest"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="h-11 px-8 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
        >
          {isNew ? 'Criar Produto' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  );
}
