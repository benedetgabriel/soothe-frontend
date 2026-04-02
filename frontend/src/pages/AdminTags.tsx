import { useState } from 'react';
import { mockTags } from '../mocks/catalog';
import type { Tag } from '../types/catalog';

export default function AdminTags() {
  const [tags] = useState<Tag[]>(mockTags);
  const [newTagName, setNewTagName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (!newTagName.trim()) return;
    // Mock — just clear the input
    setNewTagName('');
  };

  const handleStartEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setEditName(tag.name);
  };

  const handleSaveEdit = () => {
    // Mock — just close edit
    setEditingId(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="max-w-2xl">
      {/* Add new tag */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nome da nova tag..."
          className="flex-1 h-11 px-4 rounded-xl bg-surface-container-low text-on-surface text-sm border-none outline-none placeholder:text-on-surface-variant/40 focus:bg-surface-container-high transition-colors duration-200"
        />
        <button
          onClick={handleAdd}
          disabled={!newTagName.trim()}
          className="flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-on-primary text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-primary-dim disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Adicionar
        </button>
      </div>

      {/* Tag count */}
      <p className="text-sm text-on-surface-variant mb-4">{tags.length} tags</p>

      {/* Tags list */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag.id}>
            {editingId === tag.id ? (
              <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-xl px-1.5 py-1.5">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  autoFocus
                  className="h-8 px-3 rounded-lg bg-surface-container-high text-on-surface text-sm border-none outline-none w-36"
                />
                <button
                  onClick={handleSaveEdit}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-on-primary border-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent text-on-surface-variant border-none cursor-pointer hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleStartEdit(tag)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-surface-container-lowest text-on-surface text-sm border-none cursor-pointer transition-all duration-200 hover:bg-surface-container-low group"
              >
                <span className="material-symbols-outlined text-base text-outline-variant">
                  label
                </span>
                {tag.name}
                <span className="material-symbols-outlined text-base text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  edit
                </span>
              </button>
            )}
          </div>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="bg-surface-container-lowest rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined mb-3 text-[32px] text-outline-variant">
            label_off
          </span>
          <p className="text-sm text-on-surface-variant">
            Nenhuma tag criada ainda
          </p>
        </div>
      )}
    </div>
  );
}
