<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <ui-form-field>
        <ui-spinner size="medium" v-if="optionsLoading" active />
        <ui-chips
          v-else
          v-model="value"
          :options="options"
          :type="config.chipsType || 'choice'"
        />
      </ui-form-field>
      <slot :name="afterSlotName" />
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </div>
  </ui-input-field>
</template>

<script>
import 'balm-ui/components/chips/chips.css';
import formItemMixin from 'controlMixins/form-item';
import optionsMixin from 'controlMixins/options';

export default {
  name: 'InputChips',
  mixins: [formItemMixin, optionsMixin]
};
</script>
<style lang="scss">
.mdc-chip-set {
  padding: 0 4px;
  .mdc-chip {
    margin: 0 4px 4px;
  }
}
</style>
