import Hypher from "hypher";
import english from "hyphenation.en-us";
import type { jsPDF } from "jspdf";

const hypher = new Hypher(english);

export function splitTextWithHyphenation(
  text: string,
  maxWidth: number,
  doc: jsPDF,
): string[] {
  const paragraphs = text.split("\n");
  const allLines: string[] = [];

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      if (paragraph === "") allLines.push(""); 
      continue;
    }

    const words = paragraph.split(/\s+/);
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = doc.getTextWidth(`${currentLine} ${word}`);

      if (width <= maxWidth) {
        currentLine += ` ${word}`;
      } else {
        if (/[.]/.test(word)) {
          allLines.push(currentLine);
          currentLine = word;
          continue;
        }
        
        const parts = hypher.hyphenate(word);
        let fits = false;
        for (let j = parts.length - 1; j >= 1; j--) {
          const firstPart = parts.slice(0, j).join("");
          const secondPart = parts.slice(j).join("");
          
          // Skip if first part is too short 
          if (firstPart.length < 3) {
            continue;
          }
          
          const candidateLine = `${currentLine} ${firstPart}-`;
          if (doc.getTextWidth(candidateLine) <= maxWidth) {
            allLines.push(candidateLine);
            currentLine = secondPart;
            fits = true;
            break;
          }
        }

        if (!fits) {
          allLines.push(currentLine);
          currentLine = word;
        }
      }
    }
    allLines.push(currentLine);
  }

  return allLines;
}

