<template>
  <div class="max-w-3xl px-4 py-10 m-auto bg-white sm:px-8 dark:bg-gray-800">
    <main class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-medium prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
      <div class="mb-10 flex gap-2 justify-between flex-wrap">
        <div class="flex gap-2">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/#guide">Guide</NuxtLink>
          <NuxtLink to="/#interviews">Interviews</NuxtLink>
          <NuxtLink to="/#tools">Tools</NuxtLink>
        </div>
        <div class="flex gap-2">
          <a href="https://github.com/timb-103/saas-starter-stack">GitHub</a>
          <a href="https://x.com/timb03">Twitter</a>
        </div>
      </div>
      <slot />

      <div class="bg-gray-50 border border-gray-200 rounded-md p-4">
        <form v-if="!subscribed" @submit.prevent="submitForm" class="flex flex-col gap-2 items-start">
          <p class="my-0 font-semibold">Sign up to the SaaS Starter Stack newsletter</p>
          <p class="my-0 text-sm mb-2">Get notified when we launch new founder interviews and tools.</p>
          <input 
            required 
            type="email" 
            name="email" 
            v-model="email" 
            placeholder="Enter your email" 
            class="border border-gray-200 rounded-md px-2"
            />
          <button 
            :disabled="loading"
            type="submit" 
            class="bg-primary-400 text-white px-4 py-1 font-semibold rounded-md mt-2 hover:bg-primary-500"
            >
            <span v-if="!loading">Submit</span>
            <spav v-else>Submitting...</spav>
          </button>
        </form>
        <p v-else>Thanks for subscribing.</p>
      </div>
      
    </main>
  </div>
</template>

<script setup lang="ts">
const email = ref('');
const subscribed = ref(false);
const loading = ref(false);

async function submitForm(): Promise<void> {
  try {
    await $fetch( 'https://track.bentonow.com/forms/3442b26dc38a70ad38076a5606c6230f/$subscribe', {
      method: 'POST',
      body: {
        email: email.value
      }
    });
  
    subscribed.value = true;
  } catch(err) {
    console.log(err)
  }

  loading.value = false;
}
</script>

<style lang="postcss">
body {
  font-family: Inter, sans-serif;
  @apply  text-black dark:bg-gray-900 dark:text-white p-4;
}
</style>