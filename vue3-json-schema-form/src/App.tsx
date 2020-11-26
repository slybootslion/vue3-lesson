import { defineComponent, ref, Ref } from 'vue'
import MonacoEditor from '@/components/MonacoEditor'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  editor: {
    height: 400,
  },
})

function toJson(data: unknown) {
  return JSON.stringify(data, null, 2)
}

const schema = {
  name: 'schema name',
  age: 1,
}

const schemaRef: Ref<unknown> = ref(schema)

const handleCodeChange = (code: string) => {
  let schema: unknown
  try {
    schema = JSON.parse(code)
  } catch (err) {
    console.log(err)
  }
  schemaRef.value = schema
}

export default defineComponent({
  setup() {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      return (
        <div>
          <MonacoEditor
            class={classes.editor}
            code={toJson(schemaRef.value)}
            onChange={handleCodeChange}
            title="schema title"
          />
        </div>
      )
    }
  },
})
