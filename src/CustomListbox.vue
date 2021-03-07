<template>
  <section>
    <h2 class="uppercase tracking-widest font-semibold text-primary-gray-400">Features</h2>
    <ul class="mt-2 list-disc pl-4">
      <li>Click the button to open the list, and transfer focus to the list.</li>
      <li>Press <code class="text-primary-gray-200">Escape</code> to close the list and transer focus back to the button.</li>
      <li>Click any list option to close the list and update the selected value. Or, use the up and down arrow keys to select an option, then hit <code class="text-primary-gray-200">Enter</code> or <code class="text-primary-gray-200">Spacebar</code> to select.</li>
      <li>The active list option will be highlighted in blue, while the selected option will have a checkmark.</li>
      <li>Entering your cursor into a new option will set that option as active.</li>
      <li>When the list opens, the selected option is active and highlighted.</li>
      <li>When the list is open, you can start typing, and the first matching option will be active. Typeahead is cleared every 500ms.</li>
      <li>If the active option is not visible, it will be scrolled into view.</li>
      <li>Lots of WAI-ARIA attributes are assigned automatically. Open devtools to explore!</li>
    </ul>
  </section>
  <section class="mt-6 flex flex-col gap-2">
    <span :ref="listbox.label">
      Select a wrestler:
    </span>
    <section class="flex items-center gap-4">
      <button
        :ref="listbox.button"
        class="w-auto flex-shrink-0 border-2 border-primary-600 px-2 py-1 rounded-sm shadow-md flex items-center gap-2"
        :class="listbox.buttonIsFocused ? 'ring-4 ring-blue-600' : ''"
      >
        <!-- Heroicons chevron right -->
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-em-1 w-em-1 transform transition"
          :class="listbox.isOpen ? 'rotate-90' : ''"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span>{{ options[listbox.selected] }}</span>
      </button>
      <section class="flex items-center gap-2 flex-no-wrap overflow-x-scroll">
        <transition-group
          leave-from-class="opacity-100"
          leave-active-class="transition duration-150"
          leave-to-class="opacity-0"
        >
          <span
            v-for="(letter, index) in listbox.typeahead.split('')"
            :key="index"
            class="bg-primary-1200 py-px px-2 flex items-center leading-0 rounded"
          >
            {{ letter }}
          </span>
        </transition-group>
      </section>
    </section>
    <ul
      :ref="listbox.list"
      class="rounded-sm shadow-md divide-y divide-primary-900"
    >
      <li
        v-for="(option, index) in options"
        :key="option"
        :ref="listbox.options(index)"
      >
        <div
          class="p-3 flex items-center"
          :class="index === listbox.active ? 'bg-primary-600 text-primary-100' : 'bg-primary-1000'"
        >
          <span>{{ option }}</span>
          <!-- HeroiconsCheck -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            v-show="index === listbox.selected"
            class="h-em-1 w-em-1 ml-auto"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </li>
    </ul>
  </section>
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
