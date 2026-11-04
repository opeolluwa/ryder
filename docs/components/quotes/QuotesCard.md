---
title: QuotesCard
description: Rotating engineering quotation for auth and empty surfaces.
outline: deep
---

<script setup lang="ts">
import Basic from "../../examples/quotes/QuotesCardBasic.vue";
</script>

# QuotesCard

A small rotating quotation card: picks a random quote from the bundled list on
mount and fades to another every 15 seconds. It is decorative, has no controls
and keeps no state beyond the current quote.

## Usage

```vue
<script setup lang="ts">
import RyderQuotesCard from "@opeolluwa/ryder/components/quotes/QuotesCard.vue"
</script>

<template>
  <RyderQuotesCard />
</template>
```

## Examples

### Basic

Place it on a dark auth/splash surface; the text is intentionally light.

<Demo>

<Basic />

</Demo>

<<< @/examples/quotes/QuotesCardBasic.vue

## API Reference

### Props

None.

### Emits

None.

### Slots

None.

### Expose

None.

## Theme

The card uses `Crimson Pro` for the quote and attribution and a
`quote-fade` transition (opacity + blur). Text colour is set by the parent —
the demo uses a dark panel with light text.

## Accessibility

- The quote swaps on a timer with no user control; keep it out of the primary
  reading path and avoid relying on it for information.
- Quotes are plain text in a `LeadingText`/`small` pair, not interactive.

## Notes

- The interval is **15 seconds** and is cleared on unmount.
- Random selection is `Math.floor(quotes.length * Math.random())`, with a
  fallback to the first quote (or an empty quote) for an empty list.
- The quote list lives in `src/components/quotes/data.ts`.
- There is no reduced-motion guard on the fade; if that matters to your app,
  hide the component under `prefers-reduced-motion`.
