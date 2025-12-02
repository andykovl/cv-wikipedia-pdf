export function getWikiPdfUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.endsWith('wikipedia.org')) {
      return null;
    }

    const pathParts = parsedUrl.pathname.split('/').filter(part => part.length > 0);
    if (pathParts.length < 2 || pathParts[0] !== 'wiki') {
      return null;
    }

    const title = decodeURIComponent(pathParts.slice(1).join('/'));
    const encodedTitle = encodeURIComponent(title);
    const lang = parsedUrl.hostname.split('.')[0];

    return `https://${lang}.wikipedia.org/api/rest_v1/page/pdf/${encodedTitle}`;
  } catch (e) {
    return null;
  }
}

export class WikiError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'WikiError';
    this.statusCode = statusCode;
  }
}

export async function downloadWikiPdf(pdfUrl: string): Promise<void> {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new WikiError(`Failed to download PDF: ${response.statusText}`, response.status);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = decodeURIComponent(pdfUrl.split('/').pop() || "article") + ".pdf";
    a.style.display = "none";
    document.body.appendChild(a);

    a.click();

    requestAnimationFrame(() => {
      URL.revokeObjectURL(url);
      a.remove();
    });
  } catch (error: any) {
    if (error instanceof WikiError) {
      throw error;
    }
    // Network errors or other fetch issues
    throw new WikiError(error.message || "Network error occurred");
  }
}

