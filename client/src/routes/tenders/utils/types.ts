type TenderState = 5 | 6 | 7 | 8 | 18 | 19;

interface Filter {
  date: string;
  matchs: Match[];
}

interface Match {
  filter: string;
  keyword: string;
  on: string;
}

export interface Tender {
  id: string;
  code: string;
  type: string;
  name: string;
  stateCode: TenderState;
  endDate: Date;
  description: string;
  organism: string;
  purchasingRegion: string;
  publicationDate: Date;
  serviceDescription: string;
  onuCode: number;
  measureUnit: string;
  quantity: number;
  generic: string;
  level1: string;
  level2: string;
  level3: string;
  filter: Filter
  categories?: string[]
}
