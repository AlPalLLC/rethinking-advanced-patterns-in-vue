<template>
  <section>
    <h2 class="uppercase tracking-widest font-semibold text-primary-gray-400">Features</h2>
    <ul class="mt-2 list-disc pl-4">
      <li>Empty or duplicate tags are not allowed</li>
      <li>Leading and trailing whitespace is trimmed</li>
      <li><code class="text-primary-gray-200">add</code> and <code class="text-primary-gray-200">remove</code> methods are included in the API, so you can customize which keyboard events or buttons affect tags. In this demo, <code class="text-primary-gray-200">Enter</code> adds the current tag, and <code class="text-primary-gray-200">Backspace</code> removes the last tag.</li>
    </ul>
  </section>
  <div class="mt-6 flex flex-wrap gap-2">
    <transition-group
      enter-from-class="opacity-0"
      enter-active-class="transition duration-150"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-for="tag in tagsInput.tags"
        :key="tag"
        class="flex items-center gap-2 bg-primary-1000 p-1.5 rounded-sm"
      >
        <button
          type="button"
          @click="tagsInput.remove(tag)"
          class="rounded-full p-0.5 transform transition hover:bg-primary-600 hover:text-primary-100"
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
    </transition-group>
    <input
      :ref="tagsInput.element"
      placeholder="Add a tag..."
      class="bg-primary-1000 p-2 w-36 rounded-sm shadow-md placeholder-primary-600"
      @keydown.enter="tagsInput.add"
      @keydown.backspace="() => tagsInput.remove(tagsInput.tags[tagsInput.tags.length - 1])"
    />
  </div>
</template>

<script>
import { readonly } from 'vue'
import useTagsInput from './useTagsInput.js'

export default {
  setup () {
    const tagsInput = readonly(useTagsInput())

    window.tagsInput = tagsInput

    return {
      tagsInput,
    }
  }      
}
</script>
