<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <ui-textfield
        v-if="readonly"
        v-model="value"
        :placeholder="config.placeholder || ' '"
        :disabled="disabled"
        :attrs="{ readonly }"
      />
      <div v-else>
        <ui-rangepicker
          v-model="value"
          :config="pickerConfig"
          :placeholder="config.placeholder || ' '"
          :disabled="disabled"
        >
          <template #separator> 到 </template>
        </ui-rangepicker>
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
import 'balm-ui/components/picker/picker.css';
import 'balm-ui/components/datepicker/datepicker.css';
import 'balm-ui/components/rangepicker/rangepicker.css';
import lang from 'flatpickr/dist/l10n/zh';
const datePickerBase = {
  locale: lang.zh,
  dateFormat: 'Y-m-d',
  time_24hr: true
};
export default {
  name: 'InputRangepicker',
  mixins: [formItemMixin],
  data() {
    const {
      config: { dateOptions = {} }
    } = this;
    return {
      pickerConfig: {
        ...datePickerBase,
        ...dateOptions
      }
    };
  }
};
</script>
