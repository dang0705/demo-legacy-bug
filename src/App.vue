<template>
  <input-text />
</template>
<script>
// Static import works fine in legacy mode
// import inputText from 'control/text.vue';

export default {
  components: {
    // If an async component is used, in the production env and legacy mode, the file in node_modules imported inside the component will point to a non-existing path
    // But if only one async component is declared and used here, it seems to work fine
    InputTextarea: () => import('control/textarea.vue'),
    InputNumber: () => import('control/number.vue'),
    InputSelect: () => import('control/select.vue'),
    InputSwitch: () => import('control/switch.vue'),
    InputCheckbox: () => import('control/checkbox.vue'),
    InputRadio: () => import('control/radio.vue'),
    InputRangepicker: () => import('control/rangepicker.vue'),
    InputChips: () => import('control/chips.vue'),
    InputText: () => import('control/text.vue')
    // inputText
  }
};
</script>
