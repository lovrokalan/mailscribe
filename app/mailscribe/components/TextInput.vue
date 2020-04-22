<template>
    <div>
      <div v-if="label" class="text-input-label">
        {{ label }}
      </div>
      <input
        class="text-input"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      >
      <div class="error-msg">{{ errorMsg }}</div>
    </div>
</template>

<script>

export default {
  props: {
    value: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String // email, password,...
    },
    placeholder: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    errorMsg: {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/global.scss";
.text-input {
  padding: 10px 16px;
  border: 1px solid $input-grey;
  border-radius: 4px;
  width: 100%;  
}

.text-input-label {
  font-size: 14px;
  margin-bottom: 4px;
  color: $input-grey;
}

.error-msg {
  min-height: 16px;
  margin-top: 4px;
  color: $error;
  font-size: 14px;
}
</style>
