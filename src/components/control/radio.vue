<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div v-if="config.showonly" class="readonly-field">{{ selectedValue }}</div>
    <div v-else :class="subitemClass">
      <ui-spinner size="medium" v-if="optionsLoading" active />
      <ui-form-field
        v-for="(option, index) in options"
        :key="`${config.key}-radiobox-${index}`"
      >
        <ui-radio
          v-model="value"
          :input-id="`${config.key}-${index}`"
          :name="config.key"
          :value="option.value"
          :disabled="disabled || readonly"
        />
        <label :for="`${config.key}-${index}`">{{ option.label }}</label>
      </ui-form-field>
    </div>
    <slot v-if="config.helper" name="helper">
      <ui-textfield-helper visible>
        {{ config.helper }}
      </ui-textfield-helper>
    </slot>
    <slot :name="afterSlotName" v-bind="{ options }" />
  </ui-input-field>
</template>

<script>
import 'balm-ui/components/radio/radio.css';
import formItemMixin from 'controlMixins/form-item';
import optionsMixin from 'controlMixins/options';

export default {
  name: 'InputRadio',
  mixins: [formItemMixin, optionsMixin]
};
</script>
