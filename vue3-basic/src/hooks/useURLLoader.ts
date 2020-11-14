import {ref} from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
    const result = ref<T | null>(null)
    const loading = ref(true)
    const loaded = ref(false)
    const err = ref(null)

    axios.get(url).then(rawData => {
        loading.value = false
        loaded.value = true
        result.value = rawData.data

    }).catch(e => {
        err.value = e
        loading.value = false
    })

    return {
        result,
        loading,
        loaded,
        err
    }
}

export default useURLLoader
