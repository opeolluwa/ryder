/**
 * Text helpers for the shared search page.
 *
 * Search has no cross-entity endpoint: an app filters the rows it already has
 * and hands the grouped matches to `src/pages/Search.vue`. Both the matching
 * the app does (`normalize`) and the emphasis the page renders (`highlight`)
 * live here so they stay in step and every consumer matches the same way.
 */

/** Lower-cased, trimmed haystack text. `undefined`/`null` collapse to `""`. */
export function normalize(text: unknown): string {
  return String(text ?? "")
    .toLowerCase()
    .trim();
}

/** Escape a string for safe interpolation into `v-html`. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Clip to `max` characters, ellipsising the overrun. */
export function truncate(text: string, max = 120): string {
  if (text.length <= max) return text;

  return `${text.slice(0, max - 1)}…`;
}

/**
 * HTML for a result title with every occurrence of `query` wrapped in a
 * `<mark>`.
 *
 * Escapes first and matches on the escaped string, so user text can never
 * become markup; a bad pattern falls back to the unhighlighted text rather
 * than throwing.
 */
export function highlight(text: string, query: string): string {
  if (!query) return escapeHtml(text);

  const escaped = escapeHtml(text);
  const qEsc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    const re = new RegExp(`(${qEsc})`, "gi");

    return escaped.replace(
      re,
      "<mark class='bg-primary-100 dark:bg-primary-500/20 px-0.5 rounded'>$1</mark>",
    );
  } catch {
    return escaped;
  }
}
