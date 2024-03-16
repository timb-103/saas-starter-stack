<template>
  <div class="h-full w-full flex items-start justify-start bg-white border-b-8 border-black">
    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-center w-full h-full">
        <h1 class="text-[60px] px-20 mt-20 font-black text-left">
          {{ title }}
        </h1>
        <h2 class="text-[50px] px-20 text-gray-500 text-left font-medium">
          {{ description.length > 150 ? `${description.slice(0, 150)}...` : description }}
        </h2>
        <p class="text-3xl px-20 font-bold mb-20 mt-auto">
          saasstarterstack.com
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
