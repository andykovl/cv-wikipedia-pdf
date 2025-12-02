import { jsPDF } from "jspdf";
import { splitTextWithHyphenation } from "./utils";
import type { CvColumn, CvDocument, CvElement, CvLayoutConfig } from "./types";

export async function generateCvPdfBlob(
  config: CvLayoutConfig,
  cv: CvDocument,
): Promise<Blob> {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  const {
    fontFamily,
    baseFontSize,
    h1FontSize,
    h2FontSize,
    lineHeight,
    subtitleColor,
    pageMargin,
    columnWidths,
    gap,
  } = config;

  const contentWidth = pageWidth - pageMargin.left - pageMargin.right;
  const availableWidth = contentWidth - gap;
  const totalColumnUnits = columnWidths.reduce((sum, w) => sum + w, 0);

  const leftColumnWidth = (availableWidth * columnWidths[0]) / totalColumnUnits;
  const rightColumnWidth = availableWidth - leftColumnWidth;

  const leftX = pageMargin.left;
  const rightX = pageMargin.left + leftColumnWidth + gap;

  let cursorY = pageMargin.top;

  doc.setFont(fontFamily, "bold");
  doc.setFontSize(h1FontSize);
  doc.setTextColor(0, 0, 0);
  doc.text(cv.name, leftX, cursorY, { lineHeightFactor: lineHeight });
  cursorY += h1FontSize * lineHeight;

  const renderElement = (
    el: CvElement,
    x: number,
    y: number,
    columnWidth: number,
  ): number => {
    switch (el.type) {
      case "h1": {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(h1FontSize);
        doc.setTextColor(0, 0, 0);
        doc.text(el.text, x, y, { lineHeightFactor: lineHeight });
        return y + h1FontSize * lineHeight;
      }

      case "h2": {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(h2FontSize);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(el.text, columnWidth);
        doc.text(lines, x, y, { lineHeightFactor: lineHeight });
        return y + lines.length * h2FontSize * lineHeight;
      }

      case "h3": {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(el.text, columnWidth);
        doc.text(lines, x, y, { lineHeightFactor: lineHeight });
        return y + lines.length * baseFontSize * lineHeight;
      }

      case "subtitle": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(subtitleColor);
        const lines = splitTextWithHyphenation(el.text, columnWidth, doc);
        doc.text(lines, x, y, { lineHeightFactor: lineHeight });
        return y + lines.length * baseFontSize * lineHeight;
      }

      case "text": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);
        const lines = splitTextWithHyphenation(el.text, columnWidth, doc);
        doc.text(lines, x, y, { lineHeightFactor: lineHeight });
        return y + lines.length * baseFontSize * lineHeight;
      }

      case "list": {
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(baseFontSize);
        doc.setTextColor(0, 0, 0);

        const bullet = "— ";
        const bulletWidth = doc.getTextWidth(bullet);
        const textWidth = columnWidth - bulletWidth;

        let currentY = y;

        for (const item of el.items) {
          doc.text(bullet, x, currentY, { lineHeightFactor: lineHeight });

          const lines: string[] = splitTextWithHyphenation(item, textWidth, doc);

          for (const line of lines) {
            doc.text(line, x + bulletWidth, currentY, { lineHeightFactor: lineHeight });
            currentY += baseFontSize * lineHeight;
          }
        }

        return currentY;
      }
    }
  };

  const renderColumn = (
    column: CvColumn,
    x: number,
    startY: number,
    columnWidth: number,
  ): number => {
    let y = startY;

    for (let i = 0; i < column.length; i++) {
      const el = column[i];
      
      if (el.type === 'h2' && i > 0) {
        y += baseFontSize * lineHeight;
      }
      if (el.type === 'h3' && i > 0) {
        y += baseFontSize * 0.5;
      }
      
      y = renderElement(el, x, y, columnWidth);
      if (el.type === 'list' || el.type === 'text') {
        y += baseFontSize * 0.5;
      }
    }

    return y;
  };

  renderColumn(cv.leftColumn, leftX, cursorY, leftColumnWidth);
  renderColumn(cv.rightColumn, rightX, cursorY, rightColumnWidth);

  return doc.output("blob") as Blob;
}

export async function downloadCvPdf(
  config: CvLayoutConfig,
  cv: CvDocument,
): Promise<void> {
  const blob = await generateCvPdfBlob(config, cv);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "cv.pdf";
  a.style.display = "none";
  document.body.appendChild(a);

  a.click();

  requestAnimationFrame(() => {
    URL.revokeObjectURL(url);
    a.remove();
  });
}
