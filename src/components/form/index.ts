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
import InfiniteScrollSelect from './infinite-scroll-select/InfiniteScrollSelect.vue';
import PhoneInput from './phone/PhoneInput.vue';
import ImageUpload from './image-upload/ImageUpload.vue';

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
  Select,
  InfiniteScrollSelect,
  DatePicker,
  Phone: PhoneInput,
  ImageUpload,
};
