<template>
    <div class="container mx-auto">
      <ValidationProvider rules="required|email" v-slot="{ errors }">
        <text-input 
          v-model="email"
          :type="'email'"
          :label="'Email'"
          :errorMsg="errors[0]"
        >
        </text-input>
      </ValidationProvider>

      <text-input 
        v-model="password"
        :type="'password'"
        :label="'Password'"
      >
      </text-input>
      <!-- <div @click="login">Login</div> -->
    </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import TextInput from '~/components/TextInput.vue'

export default {
  components: {
    TextInput,
    ValidationProvider
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      await this.$axios.$post('/login', {
        email: this.email,
        password: this.password
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
