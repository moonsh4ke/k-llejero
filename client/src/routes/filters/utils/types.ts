export interface Filter {
  id: string;
  name: string;
  description: string;
  keywords: Keyword[];
}

export interface Keyword {
  id: string;
  value: string;
}
