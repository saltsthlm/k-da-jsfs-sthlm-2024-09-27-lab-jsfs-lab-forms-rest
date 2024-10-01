export interface Quote {
  text: string;
  user: {
    id: string;
    name: string;
  };
}

export enum FetchMode {
  Single,
  Multiple,
}
