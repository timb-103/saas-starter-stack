<template>
  <div class="max-w-3xl px-4 py-10 m-auto bg-white sm:px-8 dark:bg-gray-800">
    <main class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-medium prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
      <div class="mb-10 flex gap-2 justify-between">
        <div class="flex gap-2">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/#guide">Guide</NuxtLink>
          <NuxtLink to="/#tools">Tools</NuxtLink>
        </div>
        <div class="flex gap-2">
          <a href="https://github.com/timb-103/saas-starter-stack">GitHub</a>
          <a href="https://x.com/timb03">Twitter</a>
        </div>
      </div>
      <slot />
    </main>
  </div>
</template>

<style lang="postcss">
body {
  font-family: Inter, sans-serif;
  @apply  text-black dark:bg-gray-900 dark:text-white p-4;
}
</style>