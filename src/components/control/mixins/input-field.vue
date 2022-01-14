<template>
  <ui-form-field
    :class="[
      itemClass,
      'yb-input-field',
      `yb-control-type__${config.type}`,
      `yb-control-field__${config.key}`,
      { required: config.required },
      { 'has-helper': config.helper }
    ]"
  >
    <label v-if="config.label">
      {{ config.label }}{{ config.label ? '：' : '' }}
    </label>

    <slot />
  </ui-form-field>
</template>

<script>
export default {
  name: 'UiInputField',
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    itemClass: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
