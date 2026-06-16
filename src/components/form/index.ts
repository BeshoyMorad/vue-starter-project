import InputText from './input-text/InputText.vue';
import Textarea from './textarea/Textarea.vue';
import InputPassword from './input-password/InputPassword.vue';
import InputNumber from './input-number/InputNumber.vue';
import Switch from './switch/Switch.vue';
import Checkbox from './checkbox/Checkbox.vue';
import CheckboxGroup from './checkbox-group/CheckboxGroup.vue';
import InputOtp from './input-otp/InputOtp.vue';
import DatePicker from './date-picker/DatePicker.vue';
import Radio from './radio/Radio.vue';
import RadioGroup from './radio-group/RadioGroup.vue';

export const Field = {
  Text: InputText,
  Textarea,
  Number: InputNumber,
  Password: InputPassword,
  Otp: InputOtp,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  // Select: Select,
  // InfiniteScrollSelect: InfiniteScrollSelect,
  DatePicker,
};

// TODO: Create variant for input styles to use it with number, textarea, etc
