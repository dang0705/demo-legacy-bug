<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-form-field
      :class="[subitemClass, 'multi-select-wrapper', 'merged-mdc-components']"
    >
      <template v-for="(item, index) in config.items">
        <ui-select
          class="merged"
          v-model="item.value"
          :key="item.key"
          :options="optionsListMap[config.model[index]]"
          :default-label="item.defaultLabel"
          :disabled="item.disabled || disabled || readonly"
          :fixed="config.fixed"
          @change="onChange(item, index, $event)"
        />
      </template>
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </ui-form-field>
  </ui-input-field>
</template>

<script>
import formItemMixin from 'control/mixins/form-item';

export default {
  name: 'InputMultiSelect',
  mixins: [formItemMixin],
  data() {
    return {
      modelOptionsMap: {},
      optionsListMap: {},
      firstLoad: true
    };
  },
  computed: {
    rootModelName() {
      return this.config?.model[0];
    },
    cachedRootNode() {
      return this.$store.multiSelectOptions[this.rootModelName] || [];
    },
    isCacheRoot() {
      return this.config.cacheRoot || this.isCacheAllNode;
    },
    isCacheAllNode() {
      return this.config.cacheAllNode;
    },
    modelKeys() {
      return this.config.items.map((item) => item.key);
    }
  },
  watch: {
    // 正确登录后，才渲染
    '$store.userInfo': {
      immediate: true,
      handler(val) {
        Object.keys(val).length && this.init();
      }
    },
    cachedRootNode: {
      immediate: true,
      handler(rootNode) {
        rootNode &&
          this.$nextTick(
            () =>
              rootNode.length &&
              (this.optionsListMap[this.rootModelName] = rootNode)
          );
      }
    },
    formData: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        const { items } = this.config;
        for (let index = 0, len = items.length; index < len; index++) {
          items[index].value = val[items[index].key];
          const modelName = this.config.model[index];
          const isRoot = modelName === this.rootModelName;
          if (!isRoot) {
            const parentIndex = index - 1;
            const parentId = items[parentIndex].value;
            if (parentId && oldVal && Object.keys(oldVal).length) {
              this.getNextOptions(parentIndex, parentId);
            }
          }
        }
      }
    },
    optionsListMap(val) {
      this.$store.multiSelectOptions = val;
    }
  },
  mounted() {
    if (this.config.model) {
      for (const modelName of this.config.model) {
        this.$set(this.modelOptionsMap, modelName, new Map());
        this.$set(this.optionsListMap, modelName, []);
      }
    } else {
      console.warn(`'model' config field is required`);
    }
  },

  beforeDestroy() {
    this.config.items.forEach((item) => (item.value = ''));
  },
  methods: {
    async init() {
      await this.setOptions(this.rootModelName);
      if (this.isCacheRoot && this.rootModelName === 'my-root-node') {
        this.firstLoad = false;
      }
    },
    resetOptions(modelName) {
      const modelIndex = this.config.model.findIndex(
        (item) => item === modelName
      );
      const modelNames = this.config.model.filter(
        (item, index) => index > modelIndex
      );
      modelNames.forEach((modelName) =>
        this.$set(this.optionsListMap, modelName, [])
      );
      !this.config.manualReset &&
        this.modelKeys.forEach((key, index) => {
          if (index > modelIndex) {
            this.$emit('change', key, '');
          }
        });
    },
    updateOptions(modelName, options) {
      this.$set(this.optionsListMap, modelName, options);
    },
    getOptions(modelName, id = 0) {
      const currentModelOptionsMap = this.modelOptionsMap[modelName];

      return currentModelOptionsMap && currentModelOptionsMap.has(id)
        ? currentModelOptionsMap.get(id)
        : [];
    },
    async setOptions(modelName, params = {}) {
      const isRoot = modelName === this.rootModelName;
      if (!isRoot && !Object.keys(params).length) {
        return;
      }
      let options = [];
      const currentModelOptionsMap = this.modelOptionsMap[modelName];
      const value = Object.values(params)[0];
      if (currentModelOptionsMap.has(value)) {
        options = currentModelOptionsMap.get(value);
      } else {
        options =
          !this.cachedRootNode.length || modelName !== this.rootModelName
            ? await this.$store.getOptionsModelConfig({
                model: modelName,
                params
              })
            : this.$store.multiSelectOptions[modelName];

        currentModelOptionsMap.set(value, options);
      }
      this.updateOptions(modelName, options);
    },
    async getNextOptions(index, id) {
      const modelName = this.config.model[index + 1];
      const key = this.config.modelKey[modelName];
      if (modelName) {
        await this.setOptions(modelName, key ? { [key]: id } : {});
      }
    },
    async onChange({ key }, index, event = '') {
      if (event) {
        const modelName = this.config.model[index + 1];
        if (modelName) {
          const options = this.getOptions(modelName, event);
          if (options.length) {
            this.updateOptions(modelName, options);
          } else {
            await this.getNextOptions(index, event);
          }
        }
        this.$emit('change', key, event);
      } else {
        this.$emit('change', key, event);
        this.resetOptions(this.config.model[index]);
      }
      this.onValueChange(event);
    }
  }
};
</script>
