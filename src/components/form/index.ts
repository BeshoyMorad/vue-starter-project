export * from './multi-step-form';

import { defineAsyncComponent } from 'vue';

export const Field = {
  Text: defineAsyncComponent(() => import('./input-text/InputText.vue')),
  Textarea: defineAsyncComponent(() => import('./textarea/Textarea.vue')),
  Number: defineAsyncComponent(() => import('./input-number/InputNumber.vue')),
  Password: defineAsyncComponent(() => import('./input-password/InputPassword.vue')),
  Otp: defineAsyncComponent(() => import('./input-otp/InputOtp.vue')),
  Switch: defineAsyncComponent(() => import('./switch/Switch.vue')),
  Checkbox: defineAsyncComponent(() => import('./checkbox/Checkbox.vue')),
  CheckboxGroup: defineAsyncComponent(() => import('./checkbox-group/CheckboxGroup.vue')),
  Radio: defineAsyncComponent(() => import('./radio/Radio.vue')),
  RadioGroup: defineAsyncComponent(() => import('./radio-group/RadioGroup.vue')),
  Select: defineAsyncComponent(() => import('./select/Select.vue')),
  InfiniteScrollSelect: defineAsyncComponent(
    () => import('./infinite-scroll-select/InfiniteScrollSelect.vue')
  ),
  DatePicker: defineAsyncComponent(() => import('./date-picker/DatePicker.vue')),
  Phone: defineAsyncComponent(() => import('./phone/PhoneInput.vue')),
  ImageUpload: defineAsyncComponent(() => import('./image-upload/ImageUpload.vue')),
  TagsInput: defineAsyncComponent(() => import('./tags-input/TagsInput.vue')),
};
