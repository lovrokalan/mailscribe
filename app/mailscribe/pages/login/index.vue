<template>
  <div class="h-screen flex">

    <div class="h-screen w-full md:w-1/2 flex">

      <div class="m-auto w-full px-12 md:px-12 lg:px-24 xl:px-32">
        <h3 class="app-sub-title">Welcome to</h3>
        <h1 class="mb-4 app-title">Venumdo</h1>
        <ValidationObserver ref="observer" tag="form" v-slot="{ invalid }">
          <form @submit.prevent="login">
            <div class="mb-1">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <text-input 
                  v-model="email"
                  :type="'email'"
                  :placeholder="'Email'"
                  :errorMsg="errors[0]"
                >
                </text-input>
              </ValidationProvider>
            </div>

            <div class="mb-6">
              <ValidationProvider rules="min:5|required" v-slot="{ errors }">
                <text-input 
                  v-model="password"
                  :type="'password'"
                  :placeholder="'Password'"
                  :errorMsg="errors[0]"
                >
                </text-input>
              </ValidationProvider>
            </div>
            <button class="main-btn float-right" @click="login(invalid)">Sign In</button>
          </form>
        </ValidationObserver>

        <div class="error-msg">{{ loginError }}</div>

        <div class="sign-up-link-container text-base xl:text-lg serif-font">Don't have an account yet? <nuxt-link to="/signup" class="sign-up-link">Sign Up</nuxt-link></div>
      </div>

    </div>

    <div class="w-0 h-screen md:w-1/2 bg-login">
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
      password: '',
      loginError: ''
    }
  },
  methods: {
    async login(formIsInvalid) {
      if (!formIsInvalid) {
        try {
          const loginResponse = await this.$axios.$post('/login', {
            email: this.email,
            password: this.password
          });
          console.log(loginResponse);
          this.$router.push({ path: '/home' });
        } catch (err) {
          this.loginError = 'Wrong Email or password!';
        }
      } else {
        await this.$refs.observer.validate();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/colors.scss";
.app-sub-title {
  color: #6c6c6c;
}

.app-title {
  margin-top: -2px;
}

.sign-up-link-container {
  margin-top: 50px;
  text-align: right;
  font-weight: 700;
  color: #6c6c6c;
}

.sign-up-link {
  color: $accent;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.bg-login {
  // background-color: $accent;
  background-color: $accent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%236b57ef'/%3E%3Cstop offset='1' stop-color='%23332a73'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%234c3eab' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%234c3eab' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.error-msg {
  min-height: 60px;
  line-height: 60px;
  color: $error;
  font-size: 14px;
  text-align: left;
}
</style>
