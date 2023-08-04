<script setup lang="ts">
const error = ref(null)
</script>

<template>
  <error-boundary>
    <div class="overflow-x-hidden">
      <NuxtPage />
    </div>
    <template #error="{ error, clearError }">
      <p>{{ error }}</p>
      <button @click="clearError">Clear</button>
    </template>
  </error-boundary>
</template>
