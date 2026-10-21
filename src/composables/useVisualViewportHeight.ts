import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Tracks the visual viewport height so a `dvh`-based layout can stay above the
 * mobile virtual keyboard.
 *
 * `dvh` only accounts for dynamic browser chrome (URL bar), not the keyboard.
 * On iOS Safari the keyboard never shrinks the layout viewport, and on Android
 * that depends on `interactive-widget` support, so a pane sized with `h-dvh`
 * ends up taller than the visible area and its bottom row (a composer) is
 * hidden under the keyboard.
 *
 * `window.visualViewport` reports the actually-visible box, keyboard included.
 * This exposes it as `--app-viewport-height`, which a layout can use instead of
 * `h-dvh`. Before mount (SSR) and where the API is missing, it falls back to
 * the dynamic viewport unit so first paint is still correct.
 */
export function useVisualViewportHeight() {
  const height = ref<number | null>(null);

  function read() {
    const viewport = window.visualViewport;

    // `height` is the visual box; `offsetTop` is how far it has scrolled, which
    // on iOS is non-zero while the keyboard is up. Subtracting both keeps the
    // pane aligned with what the user can see.
    height.value = viewport
      ? Math.round(viewport.height + viewport.offsetTop)
      : window.innerHeight;
  }

  onMounted(() => {
    read();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", read);
      window.visualViewport.addEventListener("scroll", read);
    } else {
      window.addEventListener("resize", read);
    }
  });

  onBeforeUnmount(() => {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener("resize", read);
      window.visualViewport.removeEventListener("scroll", read);
    } else {
      window.removeEventListener("resize", read);
    }
  });

  /**
   * Inline style binding for a layout root. `null` (SSR, first paint) leaves the
   * caller's `dvh` fallback class in charge; afterwards it overrides the height
   * so the box tracks the visible area (keyboard included).
   */
  const style = computed(() =>
    height.value === null
      ? undefined
      : {
          height: `${height.value}px`,
          "--app-viewport-height": `${height.value}px`,
        },
  );

  return { height, style };
}
