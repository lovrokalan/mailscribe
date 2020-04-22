import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: 'Enter a valid email!'
})

extend('required', {
  ...required,
  message: 'This field is required!'
})
