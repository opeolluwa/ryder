import { useMediaQuery } from "@vueuse/core";

// Below Tailwind's `lg` breakpoint — the same boundary the app shell uses to
// swap its desktop sidebar for the mobile bottom nav. Matching it exactly is
// what keeps a surface in sync with the chrome around it: the page header, the
// floating action button and the back chevron all switch at `lg`, so anything
// that branches on "mobile" has to branch on the same line.
//
// Deliberately not `@nuxtjs/device`. That module resolves user-agent flags once
// at init with no resize listener and no notion of width, so a desktop window
// narrowed below 1024px would keep getting desktop surfaces while the shell
// around it had already switched to mobile chrome.
export function useIsMobile() {
  return useMediaQuery("(max-width: 1023px)");
}
