import { WikiError } from "./api";

export function formatErrorMessage(error: unknown): string {
  if (error instanceof WikiError) {
    if (error.statusCode === 404) {
      return "Article not found (404). Check the URL.";
    } else if (error.statusCode) {
      return `Error ${error.statusCode}: ${error.message}`;
    }
    return `Connection error: ${error.message}`;
  }
  return "An unexpected error occurred.";
}

