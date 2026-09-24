import { RouterView, type RouteRecordRaw } from 'vue-router';
import { formsPaths } from './forms.paths';

export const formsRoutes = [
  {
    path: 'forms',
    name: formsPaths.root,
    component: RouterView,
    redirect: { name: formsPaths.overview },
    meta: {
      title: 'Forms',
      sidebar: true,
      icon: 'hugeicons--input-short-text',
    },
    children: [
      {
        path: '',
        name: formsPaths.overview,
        component: () => import('@/modules/doc/forms/pages/index.vue'),
      },
      {
        path: 'text-input',
        name: formsPaths.textInput,
        component: () => import('@/modules/doc/forms/text-field/pages/index.vue'),
        meta: {
          title: 'Text Input',
          sidebar: true,
        },
      },
      {
        path: 'text-area',
        name: formsPaths.textArea,
        component: () => import('@/modules/doc/forms/text-area-field/pages/index.vue'),
        meta: {
          title: 'Text Area',
          sidebar: true,
        },
      },

      {
        path: 'password-input',
        name: formsPaths.password,
        component: () => import('@/modules/doc/forms/password-field/pages/index.vue'),
        meta: {
          title: 'Password',
          sidebar: true,
        },
      },
      {
        path: 'numbers-input',
        name: formsPaths.numbers,
        component: () => import('@/modules/doc/forms/number-field/pages/index.vue'),
        meta: {
          title: 'Numbers',
          sidebar: true,
        },
      },
      {
        path: 'switch',
        name: formsPaths.switch,
        component: () => import('@/modules/doc/forms/switch-field/pages/index.vue'),
        meta: {
          title: 'Switch',
          sidebar: true,
        },
      },
      {
        path: 'checkbox',
        name: formsPaths.checkbox,
        component: () => import('@/modules/doc/forms/checkbox-field/pages/index.vue'),
        meta: {
          title: 'Checkbox',
          sidebar: true,
        },
      },
      {
        path: 'checkbox-group',
        name: formsPaths.checkboxGroup,
        component: () => import('@/modules/doc/forms/checkbox-group/pages/index.vue'),
        meta: {
          title: 'Checkbox Group',
          sidebar: true,
        },
      },
      {
        path: 'radio',
        name: formsPaths.radio,
        component: () => import('@/modules/doc/forms/radio-field/pages/index.vue'),
        meta: {
          title: 'Radio',
          sidebar: true,
        },
      },
      {
        path: 'radio-group',
        name: formsPaths.radioGroup,
        component: () => import('@/modules/doc/forms/radio-group/pages/index.vue'),
        meta: {
          title: 'Radio Group',
          sidebar: true,
        },
      },
      {
        path: 'select',
        name: formsPaths.select,
        component: () => import('@/modules/doc/forms/select-field/pages/index.vue'),
        meta: {
          title: 'Select',
          sidebar: true,
        },
      },
      {
        path: 'otp-input',
        name: formsPaths.otp,
        component: () => import('@/modules/doc/forms/otp-field/pages/index.vue'),
        meta: {
          title: 'OTP',
          sidebar: true,
        },
      },
      {
        path: 'date-picker',
        name: formsPaths.datePicker,
        component: () => import('@/modules/doc/forms/datepicker-field/pages/index.vue'),
        meta: {
          title: 'Date Picker',
          sidebar: true,
        },
      },
      {
        path: 'phone-input',
        name: formsPaths.phone,
        component: () => import('@/modules/doc/forms/phone-field/pages/index.vue'),
        meta: {
          title: 'Phone',
          sidebar: true,
        },
      },
      {
        path: 'tags-input',
        name: formsPaths.tags,
        component: () => import('@/modules/doc/forms/tags-field/pages/index.vue'),
        meta: {
          title: 'Tags',
          sidebar: true,
        },
      },
      {
        path: 'image-upload',
        name: formsPaths.ImageUpload,
        component: () => import('@/modules/doc/forms/image-upload/pages/index.vue'),
        meta: {
          title: 'Image Upload',
          sidebar: true,
        },
      },
      {
        path: 'multi-step-form',
        name: formsPaths.multiStepForm,
        component: () => import('@/modules/doc/forms/multi-step-form/pages/index.vue'),
        meta: {
          title: 'Multi-Step Form',
          sidebar: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
