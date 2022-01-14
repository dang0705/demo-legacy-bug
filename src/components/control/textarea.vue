<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :subitem-class="subitemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <ui-textfield
        v-model="value"
        class="fullwidth"
        inputType="textarea"
        :placeholder="config.placeholder || ' '"
        :disabled="disabled"
        :maxlength="config.maxlength || null"
        :with-counter="!!config.maxlength"
        :attrs="{ readonly }"
        :rows="config.rows"
        :cols="config.cols"
      />
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </div>
  </ui-input-field>
</template>

<script>
import 'balm-ui/components/textfield/textfield.css';
import formItemMixin from 'controlMixins/form-item';

export default {
  name: 'InputTextarea',
  mixins: [formItemMixin]
};
</script>
