
export enum NavItem {
  OVERVIEW = 'Visão Geral',
  SCHEMA_EDITOR = 'Designer Visual',
  DATA_BROWSER = 'Dados & Seeding',
  PLAYGROUND = 'SQL & IA Lab',
  WIKI = 'Documentação IA',
  HISTORY = 'Histórico (Git)',
  BILLING = 'Custos & Tokens',
  COMPLIANCE = 'Privacidade LGPD',
  SETTINGS = 'Configurações'
}

export interface SchemaField {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  isUnique?: boolean;
  isRelation?: boolean;
  isVector?: boolean;
  dbType?: string;
  icon?: string;
  dimensions?: number;
  annotation?: string;
  pii?: boolean; // PII para Compliance LGPD
  description?: string;
}

export interface SchemaModel {
  name: string;
  type: 'Modelo' | 'PGVector' | 'View' | 'Enum';
  icon: string;
  fields: SchemaField[];
  position: { x: number; y: number }; // Para o Designer Visual
  description?: string;
}

export interface Metric {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  table: string;
  trend?: string;
  isSpecial?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface VersionEntry {
  id: string;
  author: string;
  date: string;
  changes: string;
  tag: string;
}
