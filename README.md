# Fintrixy API

API RESTful para o sistema de gestão financeira pessoal Fintrixy.

## Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (Json Web Token)
- **Validation:** Zod
- **Documentation:** Swagger/OpenAPI

## Estrutura do Projeto

```
api/
├── prisma/
│   └── schema.prisma      # Schema do banco de dados
├── src/
│   ├── config/
│   │   ├── database.js    # Configuração do Prisma
│   │   ├── index.js       # Variáveis de ambiente
│   │   └── swagger.js     # Configuração do Swagger
│   ├── controllers/       # Controladores (lógica de negócio leve)
│   ├── middlewares/       # Middlewares (auth, erros)
│   ├── repositories/      # Acesso ao banco de dados
│   ├── routes/            # Definição das rotas
│   ├── services/          # Lógica de negócio
│   ├── utils/             # Helpers e utilitários
│   ├── validations/       # Schemas Zod para validação
│   └── server.js          # Entry point
├── .env                   # Variáveis de ambiente
└── package.json
```

## Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npm run prisma:generate

# Aplicar migrations ao banco
npm run prisma:push

# Iniciar em modo desenvolvimento
npm run dev

# Iniciar em produção
npm start
```

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=4000
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

## Endpoints da API

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Registrar novo usuário |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Perfil do usuário |
| PUT | `/api/auth/profile` | Atualizar perfil |
| POST | `/api/auth/change-password` | Alterar senha |

### Carteiras

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/wallets` | Listar carteiras |
| GET | `/api/wallets/stats` | Estatísticas |
| GET | `/api/wallets/:id` | Detalhes |
| POST | `/api/wallets` | Criar |
| PUT | `/api/wallets/:id` | Atualizar |
| DELETE | `/api/wallets/:id` | Deletar |

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/transactions` | Listar transações |
| GET | `/api/transactions/stats` | Estatísticas |
| GET | `/api/transactions/recent` | Recentes |
| GET | `/api/transactions/:id` | Detalhes |
| POST | `/api/transactions` | Criar |
| PUT | `/api/transactions/:id` | Atualizar |
| DELETE | `/api/transactions/:id` | Deletar |

### Metas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/goals` | Listar metas |
| GET | `/api/goals/stats` | Estatísticas |
| GET | `/api/goals/overdue` | Atrasadas |
| POST | `/api/goals` | Criar |
| PUT | `/api/goals/:id` | Atualizar |
| DELETE | `/api/goals/:id` | Deletar |
| POST | `/api/goals/:id/contribute` | Adicionar contribuição |

### Orçamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/budgets` | Listar orçamentos |
| GET | `/api/budgets/stats` | Estatísticas |
| GET | `/api/budgets/exceeded` | Ultrapassados |
| POST | `/api/budgets` | Criar |
| PUT | `/api/budgets/:id` | Atualizar |
| DELETE | `/api/budgets/:id` | Deletar |

### Parcelamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/installments` | Listar |
| GET | `/api/installments/active` | Ativos |
| GET | `/api/installments/completed` | Concluídos |
| GET | `/api/installments/upcoming` | Próximos |
| POST | `/api/installments` | Criar |
| PUT | `/api/installments/:id` | Atualizar |
| DELETE | `/api/installments/:id` | Deletar |
| POST | `/api/installments/:id/pay` | Pagar parcela |

### Recorrências

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/recurrences` | Listar |
| GET | `/api/recurrences/active` | Ativas |
| GET | `/api/recurrences/inactive` | Inativas |
| POST | `/api/recurrences` | Criar |
| PUT | `/api/recurrences/:id` | Atualizar |
| DELETE | `/api/recurrences/:id` | Deletar |
| POST | `/api/recurrences/:id/toggle` | Ativar/Desativar |
| POST | `/api/recurrences/:id/process` | Processar agora |
| POST | `/api/recurrences/:id/skip` | Pular próxima |

## Autenticação

Todas as rotas (exceto `/api/auth/register` e `/api/auth/login`) requerem autenticação via JWT.

Inclua o token no header:
```
Authorization: Bearer <seu-token-jwt>
```

## Documentação

Acesse a documentação Swagger em: `http://localhost:4000/api-docs`

## Performance

- Rate limiting: 100 requests por 15 minutos
- Helmet.js para segurança headers
- Validação com Zod
- Índices no banco de dados via Prisma
