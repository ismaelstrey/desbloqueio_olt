# API de Desbloqueio OLT

https://www.atualizarhuawei.com.br/api/auth/callback/google

## ENV

GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
NEXTAUTH_URL=https://www.atualizarhuawei.com.br
NEXTAUTH_SECRET=sua_chave_secreta

## Visão Geral

API RESTful para gerenciamento de desbloqueios de OLTs, desenvolvida com Next.js e TypeScript.

## Autenticação

A API utiliza autenticação via NextAuth com Google OAuth2. Todas as rotas da API requerem autenticação.

### Fluxo de Autenticação

- Login via Google: `/api/auth/signin`
- Logout: `/api/auth/signout`
- Callback: `/api/auth/callback/google`

Todas as requisições autenticadas devem incluir o token JWT nas headers.

## Endpoints

### Empresas

#### GET /api/empresas

Retorna a lista de todas as empresas cadastradas.

**Resposta (200)**

```json
[
  {
    "id": 1,
    "nome": "Empresa Exemplo",
    "cnpj": "12345678901234",
    "email": "contato@empresa.com",
    "telefone": "1234567890",
    "endereco": "Endereço exemplo",
    "olts": [...],
    "tickets": [...]
  }
]
```

#### POST /api/empresas

Cria uma nova empresa.

**Corpo da Requisição**

```json
{
  "nome": "string",
  "cnpj": "string (14 dígitos)",
  "email": "string",
  "telefone": "string (min 10 dígitos)",
  "endereco": "string (opcional)"
}
```

**Resposta (201)**

```json
{
  "id": 1,
  "nome": "Empresa Exemplo",
  "cnpj": "12345678901234",
  "email": "contato@empresa.com",
  "telefone": "1234567890",
  "endereco": "Endereço exemplo"
}
```

### OLTs

#### GET /api/olts

Retorna a lista de OLTs. Aceita filtro por empresaId como query parameter.

**Parâmetros de Query**

- `empresaId`: (opcional) Filtra OLTs por empresa

**Resposta (200)**

```json
[
  {
    "id": 1,
    "empresaId": 1,
    "nome": "OLT Exemplo",
    "marca": "string",
    "modelo": "string",
    "tipo": "TIPO_OLT",
    "firmware": "string",
    "firmwareTipo": "string",
    "ipAcesso": "string",
    "empresa": {...},
    "tickets": [...]
  }
]
```

#### POST /api/olts

Cria uma nova OLT.

**Corpo da Requisição**

```json
{
  "empresaId": "number",
  "nome": "string",
  "marca": "string",
  "modelo": "string",
  "tipo": "TIPO_OLT",
  "firmware": "string",
  "firmwareTipo": "string",
  "ipAcesso": "string (opcional)",
  "usuario": "string (opcional)",
  "senha": "string (opcional)",
  "localizacao": "string (opcional)",
  "observacoes": "string (opcional)"
}
```

### Tickets

#### GET /api/tickets

Retorna a lista de tickets. Aceita múltiplos filtros como query parameters.

**Parâmetros de Query**

- `empresaId`: (opcional) Filtra tickets por empresa
- `oltId`: (opcional) Filtra tickets por OLT
- `status`: (opcional) Filtra tickets por status

**Resposta (200)**

```json
[
  {
    "id": 1,
    "empresaId": 1,
    "oltId": 1,
    "titulo": "string",
    "descricao": "string",
    "tipoServico": "TIPO_SERVICO",
    "status": "STATUS_TICKET",
    "valorServico": "number",
    "statusPagamento": "STATUS_PAGAMENTO",
    "tipoPagamento": "TIPO_PAGAMENTO",
    "dataSolicitacao": "date",
    "dataConclusao": "date",
    "empresa": {...},
    "olt": {...}
  }
]
```

#### POST /api/tickets

Cria um novo ticket.

**Corpo da Requisição**

```json
{
  "empresaId": "number",
  "oltId": "number",
  "titulo": "string",
  "descricao": "string",
  "tipoServico": "TIPO_SERVICO",
  "status": "STATUS_TICKET",
  "valorServico": "number",
  "statusPagamento": "STATUS_PAGAMENTO",
  "tipoPagamento": "TIPO_PAGAMENTO (opcional)",
  "dataConclusao": "date (opcional)",
  "criadoPor": "string",
  "resolvidoPor": "string (opcional)"
}
```

## Códigos de Status

- 200: Sucesso
- 201: Criado com sucesso
- 400: Erro de validação
- 401: Não autorizado
- 404: Recurso não encontrado
- 500: Erro interno do servidor

## Proteção de Rotas

A aplicação implementa dois níveis de proteção:

1. **Middleware de Autenticação**: Protege todas as rotas da API, exceto as rotas de autenticação (/api/auth/\*).
2. **Proteção de Páginas**: Redireciona usuários não autenticados para a página de login ao tentar acessar rotas protegidas (/os/\*).
