<template>
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
</template>

<script>
import { readonly } from 'vue'
import useListbox from './useListbox.js'

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
          listbox = readonly(useListbox())

    return { options, listbox }
  }
}
</script>
