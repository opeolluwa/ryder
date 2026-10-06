export const toNumber = (value: number | string): number =>
  typeof value === "string" ? Number(value) : value
