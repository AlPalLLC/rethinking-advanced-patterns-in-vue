<template>
  <div>
    <h2>Tags:</h2>
    <pre><code>{{ tagsJson }}</code></pre>
    <h2>Tags input:</h2>
    <div v-for="tag in tagsInput.tags">
      <span>{{ tag }}</span>
      <button
        type="button"
        @click="tagsInput.remove(tag)"
      >
        ×
      </button>
    </div>
    <input
      placeholder="Add tag..."
      :ref="tagsInput.element"
    />
  </div>
  <div>
    <span :ref="listbox.label">
      Select a wrestler:
    </span>
    <button
      :ref="listbox.button"
      class="rounded p-3 border"
      :class="listbox.buttonIsFocused ? 'ring-4 ring-blue-600' : ''"
    >
      {{ options[listbox.selected] }}
    </button>
    <ul :ref="listbox.list">
      <li
        v-for="(option, index) in options"
        :key="option"
        :ref="listbox.options(index)"
      >
        <div 
          class="p-3" 
          :class="index === listbox.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'"
        >
          <span>{{ option }}</span>
          <!-- HeroiconsCheck -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            v-show="index === listbox.selected"
            style="height: 1em; width: 1em;"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, readonly } from 'vue'
import useListbox from './useListbox.js'
import useTagsInput from './useTagsInput.js'

export default {
  setup () {
    const options = [
            'The Ultimate Warrior',
            'Randy Savage',
            'Hulk Hogan',
            'Bret Hart',
            'The Undertaker',
            'Mr. Perfect',
            'Ted DiBiase',
            'Bam Bam Bigelow',
            'Yokozuna',
          ],
          listbox = readonly(useListbox()),
          tagsInput = readonly(useTagsInput()),
          tagsJson = computed(() => JSON.stringify(tagsInput.tags, null, 2))

    return {
      options,
      listbox,
      tagsInput,
      tagsJson,
    }
  }      
}
</script>
