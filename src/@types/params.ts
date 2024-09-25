export interface IParams {
  bot?: "rh" | string;
  bot_name?: string;
  from_?: number;
  to?: number;
  query?: string;
  tags_name?: string[];
  name?: string;
  prompt?: string;
  internal_id?: string;
}
