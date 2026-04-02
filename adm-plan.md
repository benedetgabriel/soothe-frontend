# Plano: Login Admin + Dashboard (Frontend)

## Context

O projeto já possui um design system completo (tokens, CSS variables, Ant Design theme) e uma storefront funcional. Agora precisamos criar a área administrativa: uma tela de login (split screen) e um dashboard com sidebar, ambos só frontend por enquanto.

**Mudança de stack CSS:** a área admin será construída com Tailwind CSS (classes utilitárias inline). A storefront existente (`home.css`, `StoreLayout`) permanece inalterada — será migrada para Tailwind em momento separado.

## Arquivos a modificar/criar

| Arquivo | Ação |
|---------|------|
| `tailwind.config.ts` | **Criar** — configuração Tailwind com tokens do design system |
| `vite.config.ts` | **Editar** — adicionar plugin Tailwind se necessário |
| `frontend/src/styles/global.css` | **Editar** — adicionar diretivas Tailwind (`@tailwind base/components/utilities`) |
| `frontend/src/components/admin/ProtectedRoute.tsx` | **Criar** — guard de autenticação mock (localStorage) |
| `frontend/src/pages/Login.tsx` | **Criar** — página de login split screen |
| `frontend/src/layouts/AdminLayout.tsx` | **Criar** — layout com sidebar + header + outlet |
| `frontend/src/pages/AdminDashboard.tsx` | **Criar** — página do dashboard (placeholder) |
| `frontend/src/routes/index.tsx` | **Editar** — adicionar rotas `/admin/login` e `/admin` com ProtectedRoute |
| `frontend/src/pages/Admin.tsx` | **Remover** — substituído por AdminDashboard + AdminLayout |
| `frontend/src/styles/admin.css` | **Remover** — reescrito como Tailwind inline nos componentes |

## Etapas

### 1. Instalar e configurar Tailwind CSS

- Instalar `tailwindcss`, `@tailwindcss/vite` (ou postcss equivalente)
- Criar `tailwind.config.ts` mapeando os design tokens existentes (`tokens.ts`) para o theme do Tailwind:
  - Cores: `primary`, `secondary`, `background`, surfaces, text
  - Fontes: `heading` (Manrope), `body` (Plus Jakarta Sans)
  - Border radius: `sm`, `md`, `lg`, `xl`, `full`
  - Spacing: usar o padrão do Tailwind (já é suficiente)
- Adicionar diretivas `@tailwind` no `global.css` (sem quebrar os estilos existentes da storefront)
- Configurar `content` para apontar para `src/**/*.{ts,tsx}`

### 2. Criar `ProtectedRoute.tsx`

- Componente que verifica `localStorage.getItem('admin_token')`
- Se existe token: renderiza `<Outlet />`
- Se não existe: redireciona para `/admin/login` via `<Navigate />`
- Quando o backend de auth ficar pronto, basta trocar a verificação de localStorage por chamada real

### 3. Criar `Login.tsx`

- Layout split screen com Tailwind: `grid grid-cols-2 min-h-screen`
  - Esquerda: painel decorativo com gradiente usando cores do tema, brand name "Soothe" e tagline
  - Direita: formulário centralizado
- Form usa componentes Ant Design (`Form`, `Input`, `Button`) que já estão configurados no theme
- Campos: e-mail (com validação de formato) e senha (com `Input.Password`)
- Botão "Entrar" — salva `localStorage.setItem('admin_token', 'mock')` e faz `navigate('/admin')`
- Logo "Soothe" no topo do form
- Link "Voltar à loja" discreto
- Responsivo: em mobile (`md:grid-cols-2`, default `grid-cols-1`), painel esquerdo escondido

### 4. Criar `AdminLayout.tsx`

- Grid Tailwind: sidebar fixa 260px + área principal
- Sidebar com:
  - Logo "Soothe" + badge "Admin" no topo
  - Menu com itens: Dashboard, Produtos, Pedidos, Configurações (ícones Material Symbols)
  - Botão "Sair" no rodapé — limpa `localStorage.removeItem('admin_token')` e redireciona para `/admin/login`
  - Links usam `NavLink` do React Router para estado `active`
- Header sticky com título da página atual
- Área de conteúdo com `<Outlet />`
- Responsivo: sidebar colapsável em mobile com overlay, botão hamburger no header

### 5. Criar `AdminDashboard.tsx`

- Greeting section: "Bom dia" + subtítulo com data ou mensagem
- 4 stat cards placeholder (Pedidos, Receita, Produtos, Clientes) com valores mock
- Seção "em breve" com borda dashed indicando onde ficarão gráficos/tabelas
- Tudo com classes Tailwind, componentes Ant Design para consistência

### 6. Atualizar rotas em `routes/index.tsx`

Estrutura de rotas:
```
/admin/login    → Login.tsx (sem layout, rota pública)
/admin          → ProtectedRoute (guard)
  /admin        → AdminLayout
    /admin      → AdminDashboard (index)
```

Remover import do antigo `Admin.tsx`.

### 7. Remover arquivos obsoletos

- `pages/Admin.tsx` — substituído por AdminDashboard + AdminLayout
- `styles/admin.css` — estilos reescritos como Tailwind inline

## Verificação

1. `npm run dev` — verificar que compila sem erros
2. Navegar para `/admin` — deve redirecionar para `/admin/login` (ProtectedRoute)
3. `/admin/login` — ver tela split screen com form
4. Clicar "Entrar" — salva token mock e redireciona para `/admin`
5. `/admin` — ver layout com sidebar e dashboard placeholder
6. Clicar "Sair" na sidebar — limpa token e volta para `/admin/login`
7. Acessar `/admin` direto sem token — redireciona para login
8. Testar responsividade em viewport mobile
9. `npm run build` — verificar build sem erros de TypeScript
