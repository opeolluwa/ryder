/** One row in a search result section, already resolved to a link target. */
export interface SearchResultItem {
  title: string;
  subtitle?: string;
  badge?: string;
  /** Route the row navigates to. */
  to: string;
}

/**
 * A grouped block of matches — one domain per section.
 *
 * The app owns the data layer and builds these from its own queries; the shared
 * `Search` page only renders them. `count` is shown beside the heading and may
 * differ from `items.length` when a section is capped for display.
 */
export interface SearchSection {
  key: string;
  title: string;
  count: number;
  items: SearchResultItem[];
  /** Optional "View all" target for the section heading. */
  viewAllTo?: string;
}
