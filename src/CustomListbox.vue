<template>
  <section class="flex flex-col gap-2">
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
