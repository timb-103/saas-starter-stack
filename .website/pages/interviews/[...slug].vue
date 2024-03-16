<template>
    <ContentDoc />
</template>

<script setup lang="ts">
const { data } = await useAsyncData(() => queryContent(useRoute().path).findOne())
// @ts-ignore
const description = data.value?.description ?? '';
const title = data.value?.title ?? ''

defineOgImageComponent('Interview', {
  title,
  description
})

useHead({ meta: [
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
]})
</script>