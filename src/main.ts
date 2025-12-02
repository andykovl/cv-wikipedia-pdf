import "./styles/globals.css";
import { createButton } from "./ui/button";
import { createWikiDownloader } from "./wiki";
import { createCvDownloader } from "./cv";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.className = "flex items-center justify-center min-h-screen";

const container = document.createElement("div");
container.className = "relative flex flex-col items-center mb-48";

const buttonsRow = document.createElement("div");
buttonsRow.className = "flex flex-col sm:flex-row gap-4 items-start";

const cvColumn = createCvDownloader();
const wikiDownloader = createWikiDownloader();

const btnAgents = createButton("## Coding agents", {
  variant: "outline",
  onClick: wikiDownloader.toggle,
});

buttonsRow.appendChild(cvColumn);
buttonsRow.appendChild(btnAgents);

container.appendChild(buttonsRow);
container.appendChild(wikiDownloader.container);
app.appendChild(container);
