import { useState } from 'react';
import { mockCategories } from '../mocks/catalog';
import type { Category } from '../types/catalog';

function buildTree(categories: Category[]) {
  const roots = categories.filter((c) => c.parentId === null);
  const children = (parentId: number) =>
    categories.filter((c) => c.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder);
  return roots
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((root) => ({ ...root, children: children(root.id) }));
}

interface CategoryFormData {
  name: string;
  description: string;
  parentId: number | null;
  isActive: boolean;
}

const emptyForm: CategoryFormData = {
  name: '',
  description: '',
  parentId: null,
  isActive: true,
};

export default function AdminCategories() {
  const [categories] = useState<Category[]>(mockCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);

  const tree = buildTree(categories);
  const rootCategories = categories.filter((c) => c.parentId === null);

  const handleNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      parentId: cat.parentId,
      isActive: cat.isActive,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const handleSave = () => {
    // Mock — just close the form
    handleCancel();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      {/* Category tree */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-on-surface-variant">
            {categories.length} categorias
          </p>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Nova Categoria
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
          {tree.map((root) => (
            <div key={root.id}>
              {/* Root category */}
              <div
                onClick={() => handleEdit(root)}
                className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15 hover:bg-surface-container-low/50 cursor-pointer transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg text-on-surface-variant">
                    folder
                  </span>
                  <div>
                    <p className="font-medium text-on-surface">{root.name}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{root.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                      root.isActive
                        ? 'bg-primary-container/60 text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {root.isActive ? 'Ativa' : 'Inativa'}
                  </span>
                  <span className="material-symbols-outlined text-lg text-on-surface-variant">
                    chevron_right
                  </span>
                </div>
              </div>

              {/* Children */}
              {root.children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => handleEdit(child)}
                  className="flex items-center justify-between pl-14 pr-6 py-3.5 border-b border-outline-variant/10 hover:bg-surface-container-low/50 cursor-pointer transition-colors duration-150"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-outline-variant">
                      subdirectory_arrow_right
                    </span>
                    <div>
                      <p className="text-on-surface">{child.name}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{child.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                        child.isActive
                          ? 'bg-primary-container/60 text-on-primary-container'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {child.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                    <span className="material-symbols-outlined text-lg text-on-surface-variant">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Form panel */}
      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-6 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-lg text-on-surface">
              {editing ? 'Editar Categoria' : 'Nova Categoria'}
            </h3>
            <button
              onClick={handleCancel}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-none cursor-pointer text-on-surface-variant hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Nome
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Almofadas"
                className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Descrição
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                placeholder="Descrição curta da categoria"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-highest transition-colors duration-200 resize-none"
              />
            </div>

            {/* Parent */}
            <div>
              <label className="block text-xs font-medium tracking-wide text-on-surface-variant mb-1.5 uppercase">
                Categoria Pai
              </label>
              <select
                value={form.parentId ?? ''}
                onChange={(e) =>
                  setForm({ ...form, parentId: e.target.value ? Number(e.target.value) : null })
                }
                className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-sm border-none outline-none cursor-pointer"
              >
                <option value="">Nenhuma (raiz)</option>
                {rootCategories
                  .filter((c) => c.id !== editing?.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Active toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
                  form.isActive ? 'bg-primary' : 'bg-outline-variant'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    form.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
              <span className="text-sm text-on-surface">Ativa</span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim"
              >
                {editing ? 'Salvar' : 'Criar'}
              </button>
              <button
                onClick={handleCancel}
                className="h-11 px-5 rounded-xl bg-surface-container-high text-on-surface-variant text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-surface-container-highest"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state when no form */}
      {!showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center justify-center text-center h-fit">
          <span className="material-symbols-outlined mb-3 text-[32px] text-outline-variant">
            category
          </span>
          <p className="text-sm text-on-surface-variant">
            Selecione uma categoria para editar ou crie uma nova
          </p>
        </div>
      )}
    </div>
  );
}
