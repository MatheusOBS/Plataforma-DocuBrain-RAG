
import { SchemaModel, Metric, VersionEntry } from './types';

export const SCHEMA_MODELS: SchemaModel[] = [
  {
    name: 'Usuario',
    type: 'Modelo',
    description: 'Gestão central de identidades e perfis de usuários.',
    icon: 'group',
    fields: [
      { name: 'id', type: 'String', isPK: true, icon: 'vpn_key', description: 'Identificador único (UUID)' },
      { name: 'email', type: 'String', isUnique: true, icon: 'mail', pii: true, description: 'Endereço de e-mail verificado' },
      { name: 'plano', type: 'Enum(Subscription)', icon: 'payments', description: 'Nível de assinatura do usuário' },
      { name: 'criadoEm', type: 'DateTime', icon: 'history', description: 'Data de registro original' },
      { name: 'documentos', type: 'Documento[]', isRelation: true, icon: 'description' },
    ],
    position: { x: 50, y: 100 }
  },
  {
    name: 'Documento',
    type: 'Modelo',
    description: 'Repositório de conhecimento bruto processado por RAG.',
    icon: 'article',
    fields: [
      { name: 'id', type: 'String', isPK: true, icon: 'vpn_key' },
      { name: 'titulo', type: 'String', icon: 'title', description: 'Título amigável do documento' },
      { name: 'metadados', type: 'Json', icon: 'data_object', description: 'Tags, autor e fonte' },
      { name: 'conteudo', type: 'String', dbType: '@db.Text', icon: 'notes', description: 'Corpo do texto original' },
      { name: 'idUsuario', type: 'String', isFK: true, icon: 'link' },
      { name: 'usuario', type: 'Usuario', isRelation: true, icon: 'account_tree' },
      { name: 'chunks', type: 'Fragmento[]', isRelation: true, icon: 'view_list' },
    ],
    position: { x: 420, y: 220 }
  },
  {
    name: 'Fragmento',
    type: 'Modelo',
    description: 'Segmentação de documentos para otimização de contexto.',
    icon: 'segment',
    fields: [
      { name: 'id', type: 'String', isPK: true, icon: 'vpn_key' },
      { name: 'idDocumento', type: 'String', isFK: true, icon: 'link' },
      { name: 'texto', type: 'String', dbType: '@db.Text', icon: 'notes' },
      { name: 'indice', type: 'Int', icon: 'format_list_numbered' },
      { name: 'vetor', type: 'Vetor?', isRelation: true, icon: 'hub' },
    ],
    position: { x: 420, y: 550 }
  },
  {
    name: 'Vetor',
    type: 'PGVector',
    description: 'Armazenamento de embeddings de alta dimensão.',
    icon: 'psychology',
    fields: [
      { name: 'id', type: 'String', isPK: true, icon: 'vpn_key' },
      { name: 'idFragmento', type: 'String', isFK: true, icon: 'link' },
      { name: 'embedding', type: 'Unsupported("vector")', dimensions: 1536, isVector: true, icon: 'data_array', annotation: '@@index([embedding], ops: "vector_cosine_ops")' },
      { name: 'modelo', type: 'String', icon: 'model_training', description: 'text-embedding-3-small' },
    ],
    position: { x: 780, y: 150 }
  },
  {
    name: 'LogBusca',
    type: 'Modelo',
    description: 'Audit de queries e performance de recuperação.',
    icon: 'query_stats',
    fields: [
      { name: 'id', type: 'String', isPK: true, icon: 'vpn_key' },
      { name: 'query', type: 'String', icon: 'search' },
      { name: 'latencia', type: 'Float', icon: 'timer' },
      { name: 'topScore', type: 'Float', icon: 'grade' },
      { name: 'criadoEm', type: 'DateTime', icon: 'history' },
    ],
    position: { x: 800, y: 480 }
  }
];

export const METRICS: Metric[] = [
  { label: 'Usuários Ativos', value: '1.240', subtitle: 'public.Usuario', icon: 'group', table: 'public.Usuario', trend: '+12%' },
  { label: 'Fragmentos RAG', value: '185.000', subtitle: 'public.Fragmento', icon: 'segment', table: 'public.Fragmento', trend: '+8%' },
  { label: 'Média Latência', value: '42ms', subtitle: 'Busca Semântica', icon: 'bolt', table: 'public.LogBusca', trend: '-15%', isSpecial: true },
];

export const VERSIONS: VersionEntry[] = [
  { id: 'v1.2.0', author: 'Matheus Dev', date: 'Há 2 horas', changes: 'Migração para Gemini 1.5 e HNSW Index', tag: 'Produção' },
  { id: 'v1.1.9', author: 'Ana Silva', date: 'Há 1 dia', changes: 'Otimização de chunking estratégico', tag: 'Estável' },
  { id: 'v1.1.8', author: 'Bruno Costa', date: 'Há 3 dias', changes: 'Suporte a metadados dinâmicos (JSONB)', tag: 'Legado' },
];
