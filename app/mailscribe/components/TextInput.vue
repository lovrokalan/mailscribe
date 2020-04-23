<template>
    <div>
      <div class="text-input-label">
        <span v-if="placeholder && value">{{ placeholder }}</span>
      </div>
      <input
        class="text-input-fill"
        :class="{ 'error-border': errorMsg }"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      >
      <div class="error-msg" :class="{ 'has-error': errorMsg }">{{ errorMsg }}</div>
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
@import "~assets/css/colors.scss";
.text-input-line {
  padding: 6px 0px 10px 0px;
  border-bottom: 1px solid $input-grey;
  width: 100%;
  outline: none;
  display: inline;
  font-size: 16px;
}

.text-input-label {
  font-size: 14px;
  margin-bottom: 4px;
  padding-left: 18px;
  color: #6c6c6c;
  min-height: 16px;
}

.error-msg {
  min-height: 16px;
  margin-top: 4px;
  color: $error;
  font-size: 11px;
  padding-right: 18px;
  text-align: right;
}

// fill styles
.text-input-fill {
  padding: 20px 18px;
  border: 1px solid #d4d4d4;
  border-radius: 21px;
  width: 100%;
  font-size: 16px;
  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px $accent;
  }
}

.text-input-fill.error-border {
  border: 1px solid #FF4242;
}

.error-msg-fill {
  min-height: 30px;
  margin-top: -10px;
  padding: 14px 10px 5px 10px;
  color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 11px;
  text-align: right;
}

.error-msg-fill.has-error {
  background: #FF4242;
}
</style>
