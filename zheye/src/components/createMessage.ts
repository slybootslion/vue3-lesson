import Message from '@/components/Message.vue'
import { createApp } from 'vue'

export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, { message, type })
  const node = document.createElement('div')
  document.body.appendChild(node)
  messageInstance.mount(node)
  setTimeout(() => {
    messageInstance.unmount(node)
    document.body.removeChild(node)
  }, timeout)
}

export default createMessage
