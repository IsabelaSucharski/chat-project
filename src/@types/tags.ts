interface ITagReturn {
  data: ITagsResponse;
  message: string;
}

export interface ITagsResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any;
  internal_id: string;
  name: string;
  bot: string;
  data?: ITagReturn;
  amount?: number;
}
