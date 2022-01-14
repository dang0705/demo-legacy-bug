import { helpers } from 'balm-ui';
const isPhone = (phone) => /^1[0-9]\d{9}$/.test(phone);

export const $validator = {
  required: {
    validate(value) {
      return !helpers.isEmpty(value);
    },
    message: '%s不能为空！'
  },
  searchRequired: {
    validate(value) {
      return !helpers.isEmpty(value);
    },
    message: '搜索条件“%s”不能为空！'
  },
  phone: {
    validate: (value) => isPhone(value),
    message: '无效的手机号！'
  }
};
export const $theme = {
  primary: '#45a1f4',
  secondary: '#45a1f4',
  'on-primary': '#ffffff'
};
