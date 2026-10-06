export interface SettingsTab {
  key: string;
  label: string;
  icon: string;
  desc: string;
  to: string;
}

/**
 * The tab a settings path belongs to: an exact match first, then the longest
 * matching prefix so nested routes such as `/settings/security/verify` keep
 * their parent tab highlighted. Logic is shared; the tab lists are per app.
 */
export function settingsTabForPath(
  items: SettingsTab[],
  path: string,
): SettingsTab | undefined {
  const exact = items.find((item) => item.to === path);
  if (exact) return exact;

  return items
    .filter((item) => path.startsWith(`${item.to}/`))
    .sort((a, b) => b.to.length - a.to.length)[0];
}
