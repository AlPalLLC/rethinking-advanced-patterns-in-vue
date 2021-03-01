<template>
  <section class="flex flex-col items-center gap-16 p-8 text-primary-gray-300">
    <section class="flex flex-col gap-4 w-full max-w-lg">
      <h2 class="uppercase font-semibold tracking-widest text-sm text-primary-500">Custom Tags Input</h2>
      <section class="bg-primary-1100 shadow-lg rounded-md p-6 ">
        <CustomTagsInput />
      </section>
    </section>
    <section class="flex flex-col gap-4 w-full max-w-lg">
      <h2 class="uppercase font-semibold tracking-widest text-sm text-primary-500">Custom Listbox</h2>
      <section class="bg-primary-1100 shadow-lg rounded-md p-6 ">
        <CustomListbox />
      </section>
    </section>
  </section>
</template>

<script>
import CustomTagsInput from './CustomTagsInput.vue'
import CustomListbox from './CustomListbox.vue'

export default {
  components: {
    CustomTagsInput,
    CustomListbox,
  }
}

</script>
