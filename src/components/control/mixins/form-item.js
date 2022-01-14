import { types } from 'balm-ui';
import UiInputField from 'controlMixins/input-field.vue';
export default {
  components: {
    UiInputField
  },
  inject: {
    formView: {
      default: null
    }
  },
  props: {
    formConfigs: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    dataSource: {
      type: Object,
      default: () => ({})
    },
    itemClass: {
      type: String,
      default: ''
    },
    subitemClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    type() {
      return this.config.type;
    },
    key() {
      return this.config.key;
    },
    defaultValue() {
      const { value } = this.config;
      return types.isFunction(value) ? value(this.formData) : value;
    },
    value: {
      get() {
        if (!Object.keys(this.formData).length) return;

        const manualValue = this.formData[this.key];
        let result = types.isFunction(manualValue)
          ? manualValue(this.formData)
          : manualValue ?? this.defaultValue;

        // fix: picker invalid date value bug
        if (this.type === 'datepicker' && isNaN(new Date(result).getTime())) {
          result = '';
        }

        return result;
      },
      set(value) {
        // ignore redundant $emit caused by autoChangeCompTypes
        this.$emit('change', this.key, value) && this.onValueChange(value);
      }
    },
    readonly() {
      return this.config.readonly;
    },
    disabled() {
      return this.config.disabled;
    },
    controller() {
      if (!this.key) return;
      return (
        this.formConfigs.find((config) => {
          const { control: { key } = {} } = config;
          return types.isArray(key) ? key.includes(this.key) : key === this.key;
        }) ||
        this.config.controlled ||
        this.config.display
      );
    },
    display() {
      if (this.config.hidden) return false;
      if (!this.controller) return true;
      let isDisplay;
      if (this.controller.control) {
        let { control: { display } = {}, key } = this.controller;
        const controlValue = this.formData[key];
        types.isArray(display) &&
          (display = display.map((item) => convertValue(item)));
        isDisplay = types.isArray(display)
          ? display.includes(convertValue(controlValue))
          : convertValue(display) === convertValue(controlValue);
      } else {
        const { display, controlled } = this.config;
        if (display) {
          isDisplay =
            display && types.isFunction(display) && display(this.formData);
        } else {
          const { display, by } = controlled;
          if (!display || !by) return true;
          let ref = this.formView.$refs[`input-${by}`];
          let vm = types.isArray(ref) ? ref[0] : ref;
          isDisplay = display(this.formData, vm);
        }
      }
      return isDisplay;
    },
    afterSlotName() {
      return `after-input-${this.type}-${this.key}`;
    }
  },
  watch: {
    display(display) {
      if (!display) {
        this.value !== this.defaultValue &&
          this.$emit('change', this.key, this.defaultValue);
      }
    },
    'config.value': {
      immediate: true,
      handler(value) {
        types.isFunction(value) &&
          Object.keys(this.formData).length &&
          (this.value = value(this.formData));
      }
    }
  },
  methods: {
    onValueChange(value) {
      const { change } = this.config;
      this.$nextTick(
        () => change && types.isFunction(change) && change(value, this.formData)
      );
    }
  },
  mounted() {
    this.$emit('rendered', 1);
  }
};
