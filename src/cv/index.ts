import { createButton } from "../ui/button";
import { downloadIcon } from "../ui/icons";
import { defaultCvConfig } from "./config";
import { sampleCv } from "./data";
import { downloadCvPdf } from "./generate";

export function createCvDownloader(): HTMLDivElement {
  const cvColumn = document.createElement("div");
  cvColumn.className = "flex flex-col items-start";

  const btnMain = createButton("Download CV", {
    variant: "default",
    icon: downloadIcon,
    onClick: async () => {
      const originalHTML = btnMain.innerHTML;
      btnMain.textContent = "Downloading...";
      btnMain.disabled = true;

      try {
        await downloadCvPdf(defaultCvConfig, sampleCv);
      } catch (error) {
        console.error(error);
      } finally {
        btnMain.innerHTML = originalHTML;
        btnMain.disabled = false;
      }
    },
  });

  cvColumn.appendChild(btnMain);

  return cvColumn;
}

