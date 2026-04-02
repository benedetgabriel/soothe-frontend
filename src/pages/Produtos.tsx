import { useState, useMemo } from 'react';
import { mockProducts, mockCategories } from '../mocks/catalog';
import { getActiveProducts } from '../lib/product-helpers';
import ProductCard from '../components/store/ProductCard';
import type { Category } from '../types/catalog';

export default function Produtos() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const rootCategories = mockCategories.filter(
    (c) => c.parentId === null && c.isActive,
  );

  const getChildren = (parentId: number): Category[] =>
    mockCategories.filter((c) => c.parentId === parentId && c.isActive);

  const activeProducts = getActiveProducts(mockProducts);

  const filtered = useMemo(() => {
    if (selectedCategory === null) return activeProducts;

    // Include the selected category and its children
    const children = getChildren(selectedCategory);
    const ids = [selectedCategory, ...children.map((c) => c.id)];

    // Also check if selected is a child — include parent match
    const parent = mockCategories.find((c) => c.id === selectedCategory);
    if (parent?.parentId !== null) {
      // It's a subcategory, match only this exact one
      return activeProducts.filter((p) =>
        p.categories.some((c) => c.id === selectedCategory),
      );
    }

    return activeProducts.filter((p) =>
      p.categories.some((c) => ids.includes(c.id)),
    );
  }, [selectedCategory, activeProducts]);

  return (
    <>
      {/* Header */}
      <header className="mb-12 md:mb-16">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-on-background leading-tight mb-4">
          Explorar Produtos
        </h1>
        <p className="max-w-xl text-on-surface-variant text-lg font-light tracking-wide leading-relaxed">
          Navegue pela nossa curadoria de peças em texturas naturais e acabamentos artesanais.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        {/* Sidebar — Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-headline text-lg text-on-surface mb-5">Categorias</h2>

            {/* All button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`
                w-full text-left px-4 py-3 rounded-xl text-sm font-medium border-none cursor-pointer
                transition-all duration-200 mb-1
                ${
                  selectedCategory === null
                    ? 'bg-primary-container/60 text-on-primary-container'
                    : 'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }
              `}
            >
              Todos os Produtos
            </button>

            {/* Category tree */}
            <div className="space-y-0.5">
              {rootCategories.map((root) => {
                const children = getChildren(root.id);
                const isRootSelected = selectedCategory === root.id;
                const isChildSelected = children.some(
                  (c) => c.id === selectedCategory,
                );
                const isExpanded = isRootSelected || isChildSelected;

                return (
                  <div key={root.id}>
                    <button
                      onClick={() =>
                        setSelectedCategory(
                          isRootSelected ? null : root.id,
                        )
                      }
                      className={`
                        w-full text-left flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                        border-none cursor-pointer transition-all duration-200
                        ${
                          isRootSelected
                            ? 'bg-primary-container/60 text-on-primary-container'
                            : 'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }
                      `}
                    >
                      {root.name}
                      {children.length > 0 && (
                        <span
                          className={`material-symbols-outlined text-base transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        >
                          expand_more
                        </span>
                      )}
                    </button>

                    {/* Subcategories */}
                    {isExpanded && children.length > 0 && (
                      <div className="ml-3 mt-0.5 space-y-0.5">
                        {children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === child.id
                                  ? root.id
                                  : child.id,
                              )
                            }
                            className={`
                              w-full text-left px-4 py-2.5 rounded-lg text-sm border-none cursor-pointer
                              transition-all duration-200
                              ${
                                selectedCategory === child.id
                                  ? 'bg-primary-container/40 text-on-primary-container font-medium'
                                  : 'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                              }
                            `}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Count */}
            <div className="mt-6 pt-5 border-t border-outline-variant/15">
              <p className="text-xs text-on-surface-variant tracking-wide">
                {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
              </p>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1 min-w-0">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="material-symbols-outlined mb-4 text-[48px] text-outline-variant">
                search_off
              </span>
              <p className="font-headline text-xl text-on-surface mb-2">
                Nenhum produto encontrado
              </p>
              <p className="text-on-surface-variant text-sm max-w-sm">
                Tente selecionar outra categoria para explorar nossa coleção.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
