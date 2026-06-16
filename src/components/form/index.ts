import InputText from './input-text/InputText.vue';
import Textarea from './textarea/Textarea.vue';
import InputPassword from './input-password/InputPassword.vue';
import InputNumber from './input-number/InputNumber.vue';
import Switch from './switch/Switch.vue';
import Checkbox from './checkbox/Checkbox.vue';
import CheckboxGroup from './checkbox-group/CheckboxGroup.vue';
import InputOtp from './input-otp/InputOtp.vue';

export const Field = {
  Text: InputText,
  Textarea,
  Number: InputNumber,
  Password: InputPassword,
  Otp: InputOtp,
  Switch,
  Checkbox,
  CheckboxGroup,
  // Radio: Radio,
  // RadioGroup: RadioGroup,
  // Select: Select,
  // InfiniteScrollSelect: InfiniteScrollSelect,
  // DatePicker: DatePicker,
};

// TODO: Create variant for input styles to use it with number, textarea, etc
