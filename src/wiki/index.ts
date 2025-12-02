import { createButton } from "../ui/button";
import { downloadIcon } from "../ui/icons";
import { getWikiPdfUrl, downloadWikiPdf } from "./api";
import { formatErrorMessage } from "./utils";

export function createWikiDownloader(): {
  container: HTMLDivElement;
  toggle: () => void;
} {
  const container = document.createElement("div");
  container.className = "hidden absolute top-full mt-4 p-4 bg-white border border-neutral-200 rounded-lg shadow-sm flex flex-col gap-2 w-[90vw] sm:w-2xl left-1/2 -translate-x-1/2";

  const inputRow = document.createElement("div");
  inputRow.className = "flex flex-col sm:flex-row gap-2 w-full";

  const input = document.createElement("input");
  input.type = "text";
  input.value = "https://en.wikipedia.org/wiki/Erfurt_latrine_disaster";
  input.className = "w-full sm:flex-1 h-10 px-3 rounded-md border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900";

  const errorText = document.createElement("p");
  errorText.className = "hidden text-red-500 text-xs mt-1 ml-1";

  const btnDownload = createButton("Download PDF", {
    variant: "default",
    icon: downloadIcon,
    onClick: async () => {
      errorText.textContent = "";
      errorText.classList.add("hidden");
      
      const pdfUrl = getWikiPdfUrl(input.value);
      if (pdfUrl) {
        const originalHTML = btnDownload.innerHTML;
        btnDownload.textContent = "Downloading...";
        btnDownload.disabled = true;
        
        try {
          await downloadWikiPdf(pdfUrl);
        } catch (error: unknown) {
          console.error(error);
          errorText.textContent = formatErrorMessage(error);
          errorText.classList.remove("hidden");
        } finally {
          btnDownload.innerHTML = originalHTML;
          btnDownload.disabled = false;
        }
      } else {
        errorText.textContent = "Invalid Wikipedia URL";
        errorText.classList.remove("hidden");
      }
    },
  });

  inputRow.appendChild(input);
  inputRow.appendChild(btnDownload);
  container.appendChild(inputRow);
  container.appendChild(errorText);

  const toggle = () => {
    container.classList.toggle("hidden");
    // Clear errors when toggling
    errorText.textContent = "";
    errorText.className = "hidden text-red-500 text-xs mt-1 ml-1";
  };

  return { container, toggle };
}
