<template>
  <!--  from dependency balm-ui's component -->
  <ui-textfield v-model="value" />
</template>

<script>
// When this component is called async,the following reference in legacy's packaging code will point to a non-existing module 'textfield'
import 'balm-ui/components/textfield/textfield.css';

export default {
  name: 'InputText',
  data() {
    return {
      value: ''
    };
  }
};
</script>
