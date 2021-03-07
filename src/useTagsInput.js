import { ref, computed, nextTick } from 'vue'
import { useTarget } from './util.js'
import { naiveModel as model, naiveOn as on } from '@baleada/vue-features'

export default function useTagsInput () {
  // TARGET SETUP
  const element = useTarget('single')


  // TAGS
  const tags = ref([]),
        remove = tag => (tags.value = tags.value.filter(t => t !== tag))


  // NEW TAG
  const tag = ref(''),
        isEmpty = computed(() => tag.value.trim().length === 0),
        isDuplicate = computed(() => tags.value.includes(tag.value.trim()))

  model({ target: element.target, value: tag })


  // MULTIPLE CONCERNS
  const add = () => {
    console.log('here')
    if (isEmpty.value || isDuplicate.value) {
      return
    }
    
    tags.value = [...tags.value, tag.value.trim()]
    nextTick(() => tag.value = '')
  }
  

  // API
  return {
    element: element.handle,
    tags,
    tag,
    add,
    remove,
  }
}

