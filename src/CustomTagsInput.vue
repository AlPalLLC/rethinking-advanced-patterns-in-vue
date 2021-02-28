<template>
  <input
    placeholder="Add a tag..."
    :ref="tagsInput.element"
    class="bg-primary-1000 p-2 rounded-sm shadow-md placeholder-primary-600"
  />
  <div class="mt-6 flex flex-wrap gap-2">
    <div
      v-for="tag in tagsInput.tags"
      class="flex items-center gap-2 bg-primary-1000 p-1.5 rounded-sm"
    >
      <button
        type="button"
        @click="tagsInput.remove(tag)"
        class="rounded-full p-0.5 border hover:text-primary-500 hover:border-primary-500 transition"
      >
        <!-- Heroicons X -->
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-em-1 w-em-1"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <span>{{ tag }}</span>
    </div>
  </div>
</template>

<script>
import { computed, readonly } from 'vue'
import useTagsInput from './useTagsInput.js'

export default {
  setup () {
    const tagsInput = readonly(useTagsInput()),
          tagsJson = computed(() => JSON.stringify(tagsInput.tags, null, 2))

    return {
      tagsInput,
      tagsJson,
    }
  }      
}
</script>
