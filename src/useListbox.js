import { ref, computed, watch, onMounted, nextTick } from 'vue'
import debounce from 'debounce'
import { bind, naiveOn as on, show } from '@baleada/vue-features'
import { useTarget } from './util.js'

export default function useListbox (optional = {}) {
  const { initialSelected = 0 } = optional

  // TARGET SETUP
  const button = useTarget('single'),
        list = useTarget('single'),
        options = useTarget('multiple'),
        label = useTarget('single')


  // SELECTED
  const selected = ref(initialSelected ?? 0),
        select = newSelected => (selected.value = newSelected),
        selectedUpdates = ref(0),
        forceSelectedUpdate = () => selectedUpdates.value++

  on({
    target: options.targets,
    events: {
      click: { targetClosure: ({ index }) => () => select(index) }
    }
  })

  on({
    target: list.target,
    events: {
      keydown (e) {
        switch (e.key) {
          case 'Spacebar':
          case ' ':
            e.preventDefault()
            isOpenAgent.value = 'keyboard'

            if (typeahead.value !== '') {
              break
            }

            if (active.value === selected.value) {
              forceSelectedUpdate()
              return
            }

            select(active.value)
            break
          case 'Enter':
            e.preventDefault()
            select(active.value)
            break
        }
      }
    }
  })

  bind({
    target: options.targets,
    keys: {
      ariaSelected: {
        targetClosure: ({ index }) => index === selected.value,
        watchSources: selected,
      }
    }
  })


  // OPEN/CLOSED
  const isOpen = ref(false),
        isOpenAgent = ref('mouse'),
        toggle = () => isOpen.value ? close() : open(),
        open = () => (isOpen.value = true),
        close = () => (isOpen.value = false)

  watch(
    isOpen,
    () => {
      if (isOpen.value) {
        nextTick(() => list.target.value.focus())
        return
      }
          
      nextTick(() => button.target.value.focus())
    },
  )
  
  watch([selected, selectedUpdates], close, { flush: 'post' })

  bind({
    target: button.target,
    keys: { ariaExpanded: isOpen }
  })

  on({
    target: button.target,
    events: {
      click: () => {
        // Spacebar keyup triggers click event after button is refocused
        if (isOpenAgent.value !== 'mouse') {
          isOpenAgent.value = 'mouse'
          return
        }
        
        toggle()
      }
    }
  })

  on({
    target: list.target,
    events: {
      focusout (e) {
        if (e.relatedTarget === button.target.value) {
          return
        }

        isOpenAgent.value = 'focusout'
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

  show({
    target: list.target,
    condition: isOpen,
  })


  // TYPEAHEAD
  const typeahead = ref(''),
        type = value => {
          typeahead.value = typeahead.value + value
          clearTypeahead()
        },
        clearTypeahead = debounce(() => typeahead.value = '', 500)

  on({
    target: list.target,
    events: {
      keydown: e => {
        if (!(isString(e.key) && e.key.length === 1)) {
          return
        }

        e.preventDefault()

        type(e.key)
      }
    }
  })


  // ACTIVE
  const active = ref(selected.value),
        activeChangeAgent = ref('none'),
        activate = newActive => active.value = newActive,
        ariaActivedescendant = computed(() => options.targets.value[active.value]?.id || null),
        activeUpdates = ref(0),
        forceActiveUpdate = () => activeUpdates.value++

  watch(
    [active, activeUpdates],
    () => list.target.value.children[active.value]?.scrollIntoView({ block: 'nearest' }),
    { flush: 'post' }
  )

  watch(
    () => typeahead.value,
    () => {
      if (typeahead.value === '') {
        return
      }

      const match = options.targets.value.findIndex(target =>
        target
          .innerText
          .toLowerCase()
          .startsWith(typeahead.value.toLowerCase())
      )
    
      if (match !== -1 && match !== active.value) {
        activeChangeAgent.value = 'typeahead'
        activate(match)
      }
    }
  )

  watch(
    isOpen,
    () => {
      if (isOpen.value) {
        if (active.value === selected.value) {
          forceActiveUpdate()
          return
        }
        
        active.value = selected.value
      }
    },
  )

  bind({
    target: list.target,
    keys: { ariaActivedescendant }
  })

  on({
    target: options.targets,
    events: {
      mouseenter: {
        targetClosure: ({ index }) => () => {
          if (activeChangeAgent.value !== 'mouseenter') {
            activeChangeAgent.value = 'mouseenter'
            return
          }

          if (active.value === index) {
            return
          }
          
          activate(index)
        }
      }
    }
  })
  
  on({
    target: list.target,
    events: {
      keydown: e => {
        switch (e.key) {
          case 'Up':
          case 'ArrowUp': {
            e.preventDefault()
            
            activeChangeAgent.value = 'arrow'
            activate(active.value - 1 < 0 ? options.targets.value.length - 1 : active.value - 1)

            break
          }
          case 'Down':
          case 'ArrowDown': {
            e.preventDefault()
            
            activeChangeAgent.value = 'arrow'
            activate(active.value + 1 > options.targets.value.length - 1 ? 0 : active.value + 1)

            break
          }
        }
      }
    }
  })


  // WAI ARIA BASICS
  const labelId = generateId()
  bind({ target: label.target, keys: { id: labelId } })
  bind({
    target: computed(() => [button.target.value, list.target.value]),
    keys: { ariaLabelledby: labelId }
  })

  bind({
    target: button.target,
    keys: {
      type: 'button',
      ariaHaspopup: 'listbox',
    }
  })

  bind({
    target: list.target,
    keys: { tabindex: '-1', role: 'listbox' }
  })

  on({
    target: list.target,
    events: {
      keydown: e => {
        if (e.key === 'Tab') {
          e.preventDefault()
        }
      }
    }
  })

  const ids = useIds(options.targets)
  bind({
    target: options.targets,
    keys: {
      role: 'option',
      id: ({ index }) => ids.value[index],
    }
  })


  // BUTTON FOCUS
  const buttonIsFocused = ref(false)

  on({
    target: button.target,
    events: {
      focus: () => (buttonIsFocused.value = true),
      blur: () => (buttonIsFocused.value = false),
    }
  })

  button.handle.isFocused = buttonIsFocused


  // API
  return {
    label: label.handle, 
    button: button.handle, 
    list: list.handle, 
    options: options.handle, 
    active,
    selected,
    isOpen,
    typeahead,
    buttonIsFocused
  }
}


// UTIL
function isString (value) {
  return typeof value === 'string' || value instanceof String
}

let id = 0
function generateId(idPrefix = 'tailwind-ui-listbox-id-') {
  return `${idPrefix}${++id}`
}

function useIds (targets) {
  const ids = ref(null),
        effect = () => (ids.value = targets.value.map(() => generateId()))

  onMounted(effect)

  return ids
}
