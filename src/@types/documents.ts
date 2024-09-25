export interface IDocumentsResponse {
  internal_id: string;
  id: string | number;
  title: string;
  source: string;
  bot: string;
  tags: string[];
  chunk?: string;
  chunk_number?: string | number;
  enabled: boolean;
  amount?: number;
}
