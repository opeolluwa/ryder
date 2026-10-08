<script setup lang="ts">
import Basic from "../../examples/feedback/PageHeaderBasic.vue";
</script>

# PageHeader

The desktop page title row: heading, subtitle, and an optional CTA button on
the right.

```vue
<script setup lang="ts">
import RyderPageHeader from "@opeolluwa/ryder/components/feedback/PageHeader.vue"
</script>

<template>
  <RyderPageHeader
    title="Complaints"
    subtitle="Everything your customers reported."
    cta-text="New complaint"
    @cta="openCreate"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/feedback/PageHeaderBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string` | `""` | Heading text (`<h2>`). |
| `subtitle` | `string` | `""` | Subtext under the heading. |
| `ctaText` | `string` | `""` | CTA button label; the button only renders when this is non-empty. |

## Emits

| Event | Payload | When |
| ----- | ------- | ---- |
| `cta` | — | The CTA button was tapped. |

## Slots

None.

## Notes

- The root is `hidden ... lg:flex`: the whole header is invisible below
  1024px, so mobile pages need their own heading (this component is desktop
  chrome, not a responsive heading).
- Single root, so extra classes fall through onto the wrapper.