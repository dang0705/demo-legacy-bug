<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <div v-if="config.showonly" class="readonly-field">
        {{ selectedValue }}
      </div>
      <div v-else @click.capture="onClick">
        <ui-select
          v-model="value"
          :options="options"
          :default-label="
            config.noDefaultLabel
              ? ''
              : config.defaultLabel || (formView.useGrid ? '全部' : '请选择')
          "
          :disabled="disabled || readonly"
        />
      </div>
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </div>
  </ui-input-field>
</template>

<script>
import formItemMixin from 'controlMixins/form-item';
import optionsMixin from 'controlMixins/options';
import fixAutoChange from 'controlMixins/fix-auto-change';
export default {
  name: 'InputSelect',
  mixins: [formItemMixin, optionsMixin, fixAutoChange]
};
</script>
