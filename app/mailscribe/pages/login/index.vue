<template>
    <div class="h-screen flex">
      <div class="w-11/12 lg:w-1/3 m-auto">
        <ValidationObserver ref="observer" tag="form" v-slot="{ invalid }">
          <div class="mb-2">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <text-input 
                v-model="email"
                :type="'email'"
                :label="'Email'"
                :errorMsg="errors[0]"
              >
              </text-input>
            </ValidationProvider>
          </div>

          <div class="mb-12">
            <ValidationProvider rules="required|min:5" v-slot="{ errors }">
              <text-input 
                v-model="password"
                :type="'password'"
                :label="'Password'"
                :errorMsg="errors[0]"
              >
              </text-input>
            </ValidationProvider>
          </div>
          <div class="main-btn" @click="login(invalid)">Login</div>
        </ValidationObserver>
      </div>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import TextInput from '~/components/TextInput.vue'

export default {
  components: {
    TextInput,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login(formIsInvalid) {
      if (!formIsInvalid) {
        await this.$axios.$post('/login', {
          email: this.email,
          password: this.password
        });
      } else {
        await this.$refs.observer.validate();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
