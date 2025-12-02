export type CvElement =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "subtitle"; text: string }
  | { type: "text"; text: string }
  | { type: "list"; items: string[] };

export type CvColumn = CvElement[];

export type CvDocument = {
  name: string; 
  leftColumn: CvColumn;
  rightColumn: CvColumn;
};

export type CvLayoutConfig = {
  fontFamily: string;
  baseFontSize: number;
  h1FontSize: number;
  h2FontSize: number;
  lineHeight: number;
  subtitleColor: string;
  pageMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /**
   * Relative column widths that will be converted
   * into actual widths based on page size.
   *
   * Example: [2, 1] → left column 2/3, right column 1/3.
   */
  columnWidths: number[];
  gap: number;
};