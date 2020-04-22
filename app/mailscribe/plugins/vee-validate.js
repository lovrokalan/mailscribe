import { extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: 'Enter a valid email!'
})

extend('required', {
  ...required,
  message: 'Required!'
})

extend('min', {
  ...min,
  params: ['min'],
  message: 'At least {min} digits!'
})