import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handle = (e: MouseEvent) => {
    const drv = elementRef.value
    if (drv) {
      if (drv.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => document.addEventListener('click', handle))
  onUnmounted(() => document.removeEventListener('click', handle))
  return isClickOutside
}

export default useClickOutside
