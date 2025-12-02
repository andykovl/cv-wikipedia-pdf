import type { CvElement } from "./types";

export const h2 = (text: string): CvElement => ({ type: "h2", text });
export const h3 = (text: string): CvElement => ({ type: "h3", text });
export const subtitle = (text: string): CvElement => ({ type: "subtitle", text });
export const text = (text: string): CvElement => ({ type: "text", text });
export const list = (items: string[]): CvElement => ({ type: "list", items });