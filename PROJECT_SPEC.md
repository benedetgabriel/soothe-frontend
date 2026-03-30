# Marketplace de Enxoval — Especificação do Projeto

> **Status:** Em definição
> **Última atualização:** 30/03/2026

---

## 1. Visão do Projeto

Marketplace focado exclusivamente em produtos de enxoval. Na primeira fase, o catálogo será limitado a **almofadas e travesseiros**.

O projeto é composto por duas visões:

- **Painel Administrativo** — manutenção completa de produtos, categorias, usuários, pedidos, cupons e configurações do site.
- **Loja (visão do cliente)** — e-commerce simples, direto e de fácil navegação. Não reinventar a roda.

> ⚠️ **PENDENTE:** Nome do marketplace ainda não definido. Definir antes de começar o frontend (afeta logo, título, SEO, domínio).

---

## 2. Stack Técnica

### Backend

| Item          | Escolha                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| Framework     | .NET 8 (C#)                                                            |
| Arquitetura   | 3 camadas — Controller → Service → Repository                          |
| Banco inicial | SQLite (pré-configurado para migração futura para PostgreSQL)           |
| Autenticação  | JWT (Bearer Token)                                                      |
| ORM           | Entity Framework Core                                                   |
| Senhas        | BCrypt (hash + salt)                                                    |
| MCP SQLite    | Configurado com acesso full (leitura e escrita) para o Claude interagir diretamente com o banco |

### MCP SQLite

O projeto deve ter o **MCP do SQLite configurado com acesso full** (leitura + escrita). Isso permite que o Claude:

- Consulte dados diretamente durante o desenvolvimento e debug
- Execute queries para validar migrations e seeds
- Inspecione o estado do banco sem precisar de ferramentas externas
- Auxilie na criação e teste de queries complexas

A configuração do MCP deve apontar para o arquivo `.db` do projeto e permitir operações de SELECT, INSERT, UPDATE e DELETE.

### Frontend

| Item         | Escolha                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| Framework    | React (Vite)                                                             |
| UI Library   | Ant Design                                                               |
| Estilo       | Design tokens centralizados (cores, fontes, espaçamentos) para fácil customização |

**Diretrizes visuais do frontend:**

- Moderno e fluido — sem layouts "quadrados" ou engessados
- Uso abundante de ícones para simbolizar ações
- Fácil de mudar cores, fontes e tema (design tokens / CSS variables)
- Nada de "AI slop" — design intencional e com personalidade

> ⚠️ **PENDENTE:** Referências visuais, paleta de cores e estilo de tipografia ainda não definidos. Será necessário antes do passo 7 (mockup da home).

---

## 3. Regras Gerais do Projeto

### Idioma

- **Toda a codebase em inglês** — variáveis, classes, tabelas, colunas, endpoints, commits.
- **Documentação técnica em inglês** (nomes de arquivos, READMEs de skills).
- **Comunicação com o usuário (UI)** — em português (pt-BR).

### Documentação obrigatória

Toda feature desenvolvida **deve ser documentada**, tanto no backend quanto no frontend. A documentação fica na pasta `/docs` do repositório, com um arquivo `.md` por feature. Cada documento deve incluir:

- O que a feature faz
- Endpoints criados (método, rota, payload, response)
- Componentes criados no frontend
- Decisões técnicas relevantes

### Padrão de API

Toda resposta da API segue um envelope padronizado:

```json
{
  "success": true,
  "data": { ... },
  "errors": []
}
```

```json
{
  "success": false,
  "data": null,
  "errors": [
    { "field": "email", "message": "Email already in use." }
  ]
}
```

### Tratamento de erros

- Middleware global de exceções (nenhum controller faz try/catch manual)
- Exceptions customizadas: `NotFoundException`, `BusinessException`, `UnauthorizedException`
- Erros de validação retornam HTTP 422, não 400

### Soft delete

Todas as entidades principais usam `deleted_at` (nullable). Registros com `deleted_at != null` são ignorados nas queries por padrão.

### Workflow de desenvolvimento

- Antes de iniciar qualquer task, usar **/brainstorming** (plugin)
- Seguir as skills criadas para manter consistência

---

## 4. Banco de Dados — Entidades

Todas as tabelas incluem colunas de auditoria: `created_at`, `updated_at`, `deleted_at`.
Todos os `id` são do tipo `int` auto-increment.

### Usuários e Acesso

**users**
`id`, `email`, `password_hash`, `role` (customer | admin), `first_name`, `last_name`, `birth_date`, `cpf` (unique), `phone`, `is_active`

**address**
`id`, `user_id` (FK), `label` ("Casa", "Trabalho"), `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `zip_code`, `country`, `is_default`

### Catálogo

**category**
`id`, `name`, `slug`, `parent_id` (FK self-reference — permite subcategorias como "Almofadas > Decorativas"), `description`, `is_active`, `sort_order`

**product**
`id`, `name`, `slug` (unique), `description`, `short_description`, `brand`, `is_active`

**product_variant** *(tabela central do catálogo — preço e estoque ficam aqui)*
`id`, `product_id` (FK), `sku` (unique), `name` ("50x50 - Branco"), `price`, `compare_at_price`, `cost_price`, `stock_quantity`, `weight`, `width`, `height`, `depth`, `is_active`

**product_image**
`id`, `product_id` (FK), `variant_id` (FK nullable), `url`, `alt_text`, `sort_order`, `is_cover`

**product_category**
`product_id` (FK), `category_id` (FK) — PK composta

**product_tag**
`product_id` (FK), `tag_id` (FK) — PK composta

**tag**
`id`, `name`, `slug`

### Carrinho

**cart**
`id`, `user_id` (FK nullable — visitante pode ter carrinho), `session_id`, `expires_at`

**cart_item**
`id`, `cart_id` (FK), `variant_id` (FK), `quantity`, `unit_price`

### Pedidos

**order**
`id`, `user_id` (FK), `order_number` (unique, ex: "PED-20260329-001"), `status` (pending | confirmed | processing | shipped | delivered | cancelled | refunded), `subtotal`, `discount_amount`, `shipping_cost`, `total`, `coupon_id` (FK nullable), `notes`

**order_item** *(snapshot do momento da compra — dados copiados do catálogo)*
`id`, `order_id` (FK), `variant_id` (FK), `product_name`, `variant_name`, `sku`, `quantity`, `unit_price`, `total_price`

**order_address** *(dados copiados — nunca FK para address do usuário)*
`id`, `order_id` (FK), `type` (billing | shipping), `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `zip_code`, `country`

### Pagamento e Envio

**payment**
`id`, `order_id` (FK), `method` (pix | credit_card | boleto), `status` (pending | approved | refused | refunded), `gateway` (mercado_pago | stripe), `gateway_transaction_id`, `amount`, `paid_at`, `refunded_at`

**shipment**
`id`, `order_id` (FK), `carrier`, `tracking_code`, `status` (preparing | shipped | in_transit | delivered), `shipped_at`, `delivered_at`

### Cupons

**coupon**
`id`, `code` (unique), `type` (percentage | fixed), `value`, `min_order_amount`, `max_uses`, `used_count`, `starts_at`, `expires_at`, `is_active`

### Avaliações

**review**
`id`, `user_id` (FK), `product_id` (FK), `rating` (1-5), `title`, `comment`, `is_approved` — constraint unique(`user_id`, `product_id`)

### Auditoria

**audit_log**
`id`, `table_name`, `record_id`, `action` (INSERT | UPDATE | DELETE), `old_values` (json), `new_values` (json), `user_id` (FK nullable), `ip_address`, `created_at`

---

## 5. Roadmap de Desenvolvimento

### Fase 0 — Fundação

| Passo | Descrição                                                                                                    | Status  |
| ----- | ------------------------------------------------------------------------------------------------------------ | ------- |
| 1     | Criar os dois projetos (backend .NET 8 + frontend React/Vite)                                                | ✅ Concluído |
| 2.1   | **Skill backend:** regras para controllers/endpoints (JWT, proteção contra ataques, usar usuário do token)     | ✅ Concluído |
| 2.2   | **Skill backend:** regras para services (sem duplicação, queries no repository, legibilidade)                  | ✅ Concluído |
| 2.3   | **Skill backend:** regras para repositories (sem N+1, queries performáticas, reutilizáveis)                    | ✅ Concluído |
| 3.1   | **Skill frontend:** regras de componentes, cores, fontes, design tokens                                       | ✅ Concluído |
| 3.2   | **Skill frontend:** outras regras necessárias (estrutura de pastas, hooks, estado, chamadas à API)             | ✅ Concluído |

As skills devem ficar **locais no projeto** (ex: pasta `/skills` ou `.claude/skills` na raiz do repositório), para que outros desenvolvedores também possam usá-las. O processo de criação segue a skill `/mnt/skills/examples/skill-creator/SKILL.md`.

### Fase 1 — Infraestrutura

| Passo | Descrição                                                    | Status  |
| ----- | ------------------------------------------------------------ | ------- |
| 4     | Instalar e configurar banco de dados (SQLite + EF Core)      | ✅ Concluído |
| 5     | Criar entidades e migrations                                 | ✅ Concluído |
| 6     | Sistema de login com JWT + criptografia de senha (BCrypt)     | ✅ Concluído |

### Fase 2 — Design e Admin

| Passo | Descrição                                                                    | Status  |
| ----- | ---------------------------------------------------------------------------- | ------- |
| 7     | **Mockup da home** — tela com possível design do site                         | ⏸️ A definir |
| 8     | Endpoints para o painel administrativo                                        | Pendente |
| 9     | Telas do painel administrativo                                                | Pendente |

> ℹ️ **Passo 7 pausado.** Paleta de cores, referências visuais, logo, tom da marca e conteúdo da home ainda não foram definidos. Este passo será retomado quando essas definições estiverem prontas.

### Fases futuras (não detalhadas ainda)

- Loja pública (catálogo, busca, filtros, PDP)
- Carrinho e checkout
- Integração com gateway de pagamento
- Integração com frete (Correios / Melhor Envio)
- Área do cliente (meus pedidos, endereços, avaliações)
- SEO, performance, analytics

---

## 6. Pendências em Aberto

| #  | Item                                                                    | Seção   |
| -- | ----------------------------------------------------------------------- | ------- |
| 1  | Nome do marketplace                                                      | 1       |
| 2  | Referências visuais, paleta de cores, tom da marca, logo                 | 2       |
| 3  | Definições para o mockup da home (passo 7)                               | 5       |
