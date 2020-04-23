import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: 'Enter a valid email!'
})

extend('required', {
  ...required,
  message: 'Required!'
})

extend('min', {
  validate(value, { length }) {
    return value.length >= length
  },
  params: ['length'],
  message: 'At least {length} characters!'
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match!'
})
