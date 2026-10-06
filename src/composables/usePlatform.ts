import { computed, ref } from "vue";

export function usePlatform() {
  const platformName = ref("web");

  if (import.meta.client) {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/android/.test(userAgent)) {
      platformName.value = "android";
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      platformName.value = "ios";
    }
  }

  const isIos = computed(() => platformName.value === "ios");

  const isAndroid = computed(() => platformName.value === "android");

  const isMobile = computed(() => isIos.value || isAndroid.value);

  const isDesktop = computed(() => !isMobile.value);

  const isWeb = computed(() => platformName.value === "web");

  const framework7Theme = computed(() => (isIos.value ? "ios" : "material"));

  return {
    platformName,
    isIos,
    isAndroid,
    isMobile,
    isDesktop,
    isWeb,
    framework7Theme,
  };
}
