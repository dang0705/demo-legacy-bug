<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
    v-show="display"
  >
    <div :class="subitemClass">
      <ui-form-field v-if="showAllCheck">
        <ui-checkbox
          v-model="isAllChecked"
          :input-id="inputId"
          :indeterminate="isChecked && !isAllChecked"
          :disabled="disabled || readonly"
        />
        <label :for="inputId">全选</label>
      </ui-form-field>
      <ui-spinner size="medium" v-if="optionsLoading" active />
      <template v-else>
        <ui-form-field
          v-for="(option, index) in options"
          :key="`${config.key}-checkbox-${index}`"
        >
          <ui-checkbox
            v-model="value"
            :input-id="`${config.key}-${index}`"
            :name="config.key"
            :value="option.value"
            :disabled="disabled || readonly"
          />
          <label :for="`${config.key}-${index}`">{{ option.label }}</label>
        </ui-form-field>
      </template>
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </div>
  </ui-input-field>
</template>

<script>
import 'balm-ui/components/checkbox/checkbox.css';
import formItemMixin from 'controlMixins/form-item';
import optionsMixin from 'controlMixins/options';

export default {
  name: 'InputCheckbox',
  mixins: [formItemMixin, optionsMixin],
  computed: {
    inputId() {
      return createUid();
    },
    isChecked() {
      return !!this.value?.length;
    },
    isAllChecked: {
      get() {
        return this.value?.length === this.options?.length;
      },
      set(status) {
        this.value = status ? this.options.map((option) => option.value) : [];
        this.$emit('change', this.config.key, this.value);
      }
    },
    showAllCheck() {
      return this.config.hasOwnProperty('allChecked');
    }
  }
};
</script>
