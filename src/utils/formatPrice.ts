import { toNumber } from "./number"

/**
 * Formats a monetary amount for display.
 *
 * `Intl.NumberFormat` throws a `RangeError` on a currency code it does not
 * recognise, which would take down whichever component happened to render the
 * figure. The backend emits an uppercase ISO 4217 code from `ProductPriceResponse`,
 * but the same field is also typed `ProductCurrency` in PascalCase elsewhere in
 * its schema, so an unexpected casing is a real possibility rather than a
 * theoretical one. An unrecognised code degrades to a plain number with the raw
 * code appended, which is wrong-looking but readable — the alternative is a blank
 * page.
 */
export function formatPrice(value: number | string, currency: string): string {
  const amount = toNumber(value)

  if (!Number.isFinite(amount)) {
    return typeof value === 'string' && value ? value : ''
  }

  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount.toLocaleString()} ${currency}`
  }
}
