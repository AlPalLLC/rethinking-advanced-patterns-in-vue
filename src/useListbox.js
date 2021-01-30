import { ref, computed, unref, watch, onBeforeUpdate } from 'vue'
import { useBindings, useListeners, useConditionalDisplay } from '@baleada/vue-features/affordances'

export default function useListbox ({ totalOptions, initialSelected }) {
  // OPEN/CLOSED STATE
  const isOpen = ref(false),
        button = useTarget('single'),
        list = useTarget('single'),
        toggle = () => isOpen.value ? close() : open(),
        open = () => (isOpen.value = true),
        close = () => (isOpen.value = false)

  watch(
    isOpen,
    () => {
      if (isOpen.value) {
        list.target.value.focus()
        return
      }
          
      button.target.value.focus()
    },
    { flush: 'post' }
  )

  useBindings({
    target: button.target,
    bindings: { ariaExpanded: isOpen }
  })

  useListeners({
    target: button.target,
    listeners: { click: toggle }
  })

  useListeners({
    target: list.target,
    listeners: {
      focusout (e) {
        if (e.relatedTarget === button.target.value) {
          return
        }

        close()
      },
      keydown (e) {
        switch (e.key) {
          case 'Esc':
          case 'Escape':
            e.preventDefault()
            close()
            break
        }
      }
    }
  })

  useConditionalDisplay({
    target: list.target,
    condition: isOpen,
  })





  return {
    root: root.handle, 
    label: label.handle, 
    button: button.handle, 
    list: list.handle, 
    options: options.handle, 
    active,
    selected,
    isOpen,
  }
}

function useTarget (type) {
  switch (type) {
    case 'single': {
      const target = ref(null),
            handle = () => t => (target.value = t)

      return { target, handle }
    }
    case 'multiple': {
      const targets = ref([]),
            handle = index => target => {
              if (target) targets.value[index] = target
            }

      onBeforeUpdate(() => (targets.value = []))

      return { targets, handle }
    }
  } 
}

function toEachable (total) {
  return computed(() => 
    (new Array(unref(total)))
      .fill()
      .map((_, index) => index)
  )
}
