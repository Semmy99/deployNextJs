export type WikiDataLangsResponseType = {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        langlinks: {
          lang: string;
          "*": string;
        }[];
      };
    };
  };
};

export type WikiDataType = {
  normalized: Array<Record<string, any>>;
  pageids: [string];
  pages: {
    string: {
      pageid: number;
      ns: number;
      title: string;
      extract: string;
    };
  };
};
export interface ParamsQuery {
  r1: string | null;
  r2: string | null;
}
// export interface ParamsQuery {
//   r1: string | null;
//   r2: string | null;
//   wikiData?: {
//     [InputNames.FROM]?: {
//       query: WikiDataType;
//       infoCity: string;
//     };
//     [InputNames.TO]?: {
//       query: WikiDataType;
//       infoCity: string;
//     };
//   };
// }
