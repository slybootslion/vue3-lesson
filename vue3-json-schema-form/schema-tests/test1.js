const Ajv = require('ajv')
const localize = require('ajv-i18n')

const ajv = new Ajv()

const schema = {
  type: 'string',
  minLength: 10
}

const data = '1230'

const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}

