<template>
  <div
    id="app"
    class="min-h-screen bg-gray-light dark:bg-dark-900 transition-colors duration-200"
  >
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Armenian Constitution Test',
  meta: [
    { name: 'description', content: 'Test your knowledge of Armenian Constitution' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  htmlAttrs: {
    lang: 'hy'
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  transition: background-color 0.2s ease;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #303545;
  background-color: #f5f7fa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.dark body {
  color: #e5e7eb;
  background-color: #1a1d2e;
}
</style>
