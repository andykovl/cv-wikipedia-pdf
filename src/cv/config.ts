import type { CvLayoutConfig } from "./types";

export const defaultCvConfig: CvLayoutConfig = {
  fontFamily: "helvetica",
  baseFontSize: 12,
  h1FontSize: 20,
  h2FontSize: 16,
  lineHeight: 1.5,
  subtitleColor: "#666666",
  pageMargin: {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40,
  },
  columnWidths: [180, 331],
  gap: 24,
};
