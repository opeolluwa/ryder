<script setup lang="ts">
import Basic from "../../examples/auth/AuthHeaderBasic.vue";
</script>

# AuthHeader

The heading block at the top of the auth screens: `LeadingText` for the title
and `SubText` for the subtitle, wrapped once.

```vue
<script setup lang="ts">
import RyderAuthHeader from "@opeolluwa/ryder/components/auth/AuthHeader.vue"
</script>

<template>
  <RyderAuthHeader
    title="Welcome back"
    subtitle="Sign in to continue to your dashboard"
  />
</template>
```

## Examples

<Demo>

<Basic />

</Demo>

<<< @/examples/auth/AuthHeaderBasic.vue

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `title` | `string` | `""` | Heading, rendered through `LeadingText`. |
| `subtitle` | `string` | `""` | Supporting line, rendered through `SubText`. |

## Emits

None.

## Slots

None.

## Notes

- Wrapper is `my-5 text-left lg:text-center`: left-aligned on small screens,
  centered from 1024px up (auth forms are narrow on mobile).
- No slots — for a custom heading, compose `LeadingText` + `SubText` yourself.