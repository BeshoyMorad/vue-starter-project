export * from './multi-step-form';

import { defineAsyncComponent } from 'vue';

// ── Primitive Form Fields (Synchronous) ─────────────────────────────────────
import InputText from './input-text/InputText.vue';
import Textarea from './textarea/Textarea.vue';
import InputNumber from './input-number/InputNumber.vue';
import InputPassword from './input-password/InputPassword.vue';
import InputOtp from './input-otp/InputOtp.vue';
import Switch from './switch/Switch.vue';
import Checkbox from './checkbox/Checkbox.vue';
import CheckboxGroup from './checkbox-group/CheckboxGroup.vue';
import Radio from './radio/Radio.vue';
import RadioGroup from './radio-group/RadioGroup.vue';
import Select from './select/Select.vue';
import DatePicker from './date-picker/DatePicker.vue';
import PhoneInput from './phone/PhoneInput.vue';
import TagsInput from './tags-input/TagsInput.vue';

// ── Loading Skeletons for Async Fields ───────────────────────────────────────
import InfiniteScrollSelectSkeleton from './infinite-scroll-select/InfiniteScrollSelectSkeleton.vue';
import ImageUploadSkeleton from './image-upload/ImageUploadSkeleton.vue';
import FileUploadSkeleton from './file-upload/FileUploadSkeleton.vue';
import EditorSkeleton from './editor/EditorSkeleton.vue';

export const Field = {
  Text: InputText,
  Textarea: Textarea,
  Number: InputNumber,
  Password: InputPassword,
  Otp: InputOtp,
  Switch: Switch,
  Checkbox: Checkbox,
  CheckboxGroup: CheckboxGroup,
  Radio: Radio,
  RadioGroup: RadioGroup,
  Select: Select,
  DatePicker: DatePicker,
  Phone: PhoneInput,
  TagsInput: TagsInput,

  // ── Heavy / Specialized Fields ─────────────
  InfiniteScrollSelect: defineAsyncComponent({
    loader: () => import('./infinite-scroll-select/InfiniteScrollSelect.vue'),
    loadingComponent: InfiniteScrollSelectSkeleton,
    delay: 0,
  }),
  ImageUpload: defineAsyncComponent({
    loader: () => import('./image-upload/ImageUpload.vue'),
    loadingComponent: ImageUploadSkeleton,
    delay: 0,
  }),
  FileUpload: defineAsyncComponent({
    loader: () => import('./file-upload/FileUpload.vue'),
    loadingComponent: FileUploadSkeleton,
    delay: 0,
  }),
  Editor: defineAsyncComponent({
    loader: () => import('./editor/Editor.vue'),
    loadingComponent: EditorSkeleton,
    delay: 0,
  }),
};
