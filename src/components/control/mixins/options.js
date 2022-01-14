export default {
  data() {
    return {
      options: this.config?.options || [],
      optionsLoading: false
    };
  },
  computed: {
    selectedValue() {
      const selected = this.options.find(
        (option) => option.value === this.value
      );
      return selected?.label;
    }
  },
  watch: {
    'config.options': {
      handler(val) {
        this.options = val;
      }
    },
    selectedValue: {
      immediate: true,
      handler(val) {
        this.$emit('get-selected-val', val);
      }
    }
  },
  async created() {
    const { model, params = {}, cache } = this.config;
    if (model) {
      this.optionsLoading = true;
      try {
        this.options = await this.$store.getOptionsModelConfig({
          model,
          params,
          cache
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.$nextTick(() => (this.optionsLoading = false));
      }
    }
  }
};
