export interface Filter {
  id: string;
  name: string;
  description: string;
  keywords: Keyword[];
  active: boolean;
}

export interface Keyword {
  id: string;
  value: string;
}
