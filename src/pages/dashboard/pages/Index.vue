<script setup lang="ts">
  /* eslint-disable max-lines */
  import {
    Button,
    ConfirmDialog,
    Dialog,
    Field,
    FormDialog,
    InfiniteScrollTable,
    Table,
  } from '@/components';
  import { formatDate } from '@/utils/formatter';
  import type { ColumnDef } from '@tanstack/vue-table';
  import { h } from 'vue';
  import { Form } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';
  import { phoneSchema } from '@/utils/yup-phone';
  import { useDarkTheme, useFormMedia, extractMediaPayload, type MediaValue } from '@/composables';
  import { info, success } from '@/utils/toast';
  import { ref } from 'vue';

  /* prettier-ignore */
  const columns: ColumnDef<{ id: number; name: string; createdAt: Date }, unknown>[] = [
    { accessorKey: 'id', header: 'Id', enableSorting: false, cell: ({ row }) => h('p', {}, row.original.id) },
    { accessorKey: 'name', header: 'Name', enableSorting: false, cell: ({ row }) => h('p', {}, row.original.name) },
    { accessorKey: 'createdAt', header: 'Created At', enableSorting: true, cell: ({ row }) => h('p', {}, formatDate(row.original.createdAt)) },
  ];

  /* prettier-ignore */
  const data = [
    { id: 1, name: 'name 1', createdAt: new Date() },
    { id: 2, name: 'name 2', createdAt: new Date() },
    { id: 3, name: 'name 3', createdAt: new Date() },
  ];
  /* prettier-ignore */
  const meta: Meta = { currentPage: 1, totalItems: 50, totalPages: 5, itemsPerPage: 10, hasNextPage: true, hasPreviousPage: false };
  /* prettier-ignore */
  const cursorMeta: CursorMeta = { hasNextPage: true, hasPreviousPage: false, limit: 10, nextCursor: 'sdffdsdfs', previousCursor: null };

  /* prettier-ignore */
  const roles = [{ value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Viewer', disabled: true }];
  /* prettier-ignore */
  const genders = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other', disabled: true }];
  /* prettier-ignore */
  const countries = [{ value: 'eg', label: 'Egypt' }, { value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }, { value: 'ca', label: 'Canada', disabled: true }];

  const validationSchema = toTypedSchema(
    yup.object({
      username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      age: yup
        .number()
        .typeError('Age must be a number')
        .required('Age is required')
        .min(18, 'Must be at least 18'),
      notifications: yup.boolean().optional(),
      terms: yup.boolean().oneOf([true], 'You must accept the terms & conditions'),
      roles: yup.array().of(yup.string()).min(1, 'Select at least one role'),
      otp_code: yup
        .string()
        .required('OTP is required')
        .length(6, 'OTP must be exactly 6 digits')
        .matches(/^\d+$/, 'OTP must contain digits only'),
      birthDate: yup
        .date()
        .typeError('Birth date must be a valid date')
        .required('Birth date is required')
        .max(new Date(), 'Birth date cannot be in the future'),
      gender: yup.string().required('Gender is required'),
      country: yup.string().required('Country is required'),
      userId: yup.number().required('User is required'),
      phone: phoneSchema().required('Phone number is required'),
      logo: yup
        .mixed<MediaValue>()
        .required('Logo is required')
        .test('required', 'Logo is required', (val) => {
          return Boolean(val && (val.file || val.initialUrl));
        }),
      description: yup
        .string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
    })
  );

  const { uploadFormMedia } = useFormMedia();
  const directMedia = ref<MediaValue | null>(null);

  const onFormSubmit = async (values: Record<string, unknown>) => {
    // 1. Upload any new/changed files in parallel
    await uploadFormMedia(values, 'PHOTO');

    // 2. Extract media payloads
    const payload = extractMediaPayload(values);

    success('Form submitted successfully!');
    info(`Form values: ${JSON.stringify(values)}`);
    info(`Media payload: ${JSON.stringify(payload)}`);
  };

  const { toggleDark } = useDarkTheme();
</script>

<template>
  <div class="space-y-4">
    <Button test-id="" variant="outline" @click="toggleDark()">Toggle Dark Mode</Button>
    <div>
      <h1 class="mb-2 text-3xl font-bold">Buttons</h1>

      <Button test-id="" variant="default">default</Button>
      <Button test-id="" variant="danger">danger</Button>
      <Button test-id="" variant="success">success</Button>
      <Button test-id="" variant="warning">warning</Button>
      <Button test-id="" variant="ghost">ghost</Button>
      <Button test-id="" variant="link">link</Button>
      <Button test-id="" variant="outline">outline</Button>
    </div>

    <div>
      <h1 class="mb-2 text-3xl font-bold">Dialogs</h1>

      <div class="flex items-center gap-2">
        <Dialog title="Dialog" description="Description">
          <template #trigger><Button test-id="">Open</Button></template>

          <div>dialog content goes here</div>

          <template #footer>
            <div>footer</div>
          </template>
        </Dialog>

        <ConfirmDialog test-id="" title="title" description="des" icon="hugeicons--circle">
          <template #trigger><Button test-id="">Open Confirm</Button></template>
        </ConfirmDialog>

        <FormDialog test-id="" title="title" description="des">
          <template #trigger><Button test-id="">Open Form</Button></template>

          <div>form goes here</div>
        </FormDialog>
      </div>
    </div>

    <div>
      <h1 class="mb-2 text-3xl font-bold">Tables</h1>

      <div class="space-y-5">
        <Table :columns="columns" :value="data" :loading="false" :meta="meta" />
        <Table :columns="columns" :value="data" :loading="false" :meta="cursorMeta" />
        <InfiniteScrollTable :columns="columns" :value="data" :loading="true" :skeleton-rows="3" />
      </div>
    </div>

    <div>
      <h1 class="mb-2 text-3xl font-bold">Forms</h1>

      <div class="max-w-md space-y-6">
        <div>
          <h2 class="mb-2 text-lg font-semibold">Direct v-model</h2>
          <div class="space-y-4">
            <Field.Text
              placeholder="Search..."
              icon="hugeicons--search-01"
              icon-position="left"
              test-id="direct-search-input"
            />
            <Field.Text
              placeholder="Loading data..."
              loading
              icon-position="right"
              test-id="direct-loading-input"
            />
            <Field.Password placeholder="Enter password..." test-id="direct-password-input" />
            <Field.Number
              placeholder="Enter age..."
              icon="hugeicons--user"
              icon-position="left"
              test-id="direct-number-input"
            />
            <Field.Number
              placeholder="Steppers hidden..."
              hide-steppers
              :step="0.001"
              test-id="direct-number-no-steppers"
            />
            <Field.Switch label="Default Toggle Switch" test-id="direct-switch-default" />
            <Field.Switch size="large" label="Large Toggle Switch" test-id="direct-switch-large" />
            <Field.Checkbox label="Default Checkbox" test-id="direct-checkbox-default" />
            <Field.Checkbox
              size="small"
              shape="circle"
              label="Small Circle Checkbox"
              test-id="direct-checkbox-small-circle"
            />
            <Field.Checkbox size="large" label="Large Checkbox" test-id="direct-checkbox-large" />
            <Field.CheckboxGroup
              :options="roles"
              layout="horizontal"
              test-id="direct-checkbox-group"
            />
            <Field.Otp :length="6" integer-only test-id="direct-otp" />
            <Field.DatePicker placeholder="Pick a birth date..." test-id="direct-date-picker" />
            <Field.RadioGroup :options="genders" layout="horizontal" test-id="direct-radio-group" />
            <Field.Radio
              label="Standalone Radio (Option A)"
              test-id="direct-radio-standalone"
              value="a"
            />
            <Field.Select
              :options="countries"
              option-label="label"
              option-value="value"
              placeholder="Select a country..."
              test-id="direct-select-single"
              show-clear
              searchable
            >
              <template #value="{ label, selectedOption }">
                <span class="flex items-center gap-2">
                  <span v-if="selectedOption?.value === 'eg'">🇪🇬</span>
                  <span v-else-if="selectedOption?.value === 'us'">🇺🇸</span>
                  <span v-else-if="selectedOption?.value === 'uk'">🇬🇧</span>
                  <span v-else-if="selectedOption?.value === 'ca'">🇨🇦</span>
                  <span>{{ label }}</span>
                </span>
              </template>
            </Field.Select>
            <Field.Select
              multiple
              :options="countries"
              option-label="label"
              option-value="value"
              placeholder="Select countries..."
              test-id="direct-select-multiple"
              :max-selected-labels="2"
            />
            <Field.InfiniteScrollSelect
              endpoint="/api/mock/users"
              :query-key="['mock-users-direct']"
              option-label="name"
              option-value="id"
              placeholder="Search users (Infinite)..."
              test-id="direct-infinite-scroll-select"
              searchable
            />
            <Field.Phone placeholder="12 345 6789" test-id="direct-phone-input" />
            <Field.Phone
              default-country="EG"
              placeholder="10 1234 5678"
              test-id="direct-phone-input-eg"
            />

            <Field.ImageUpload
              v-model="directMedia"
              size-preset="avatar"
              test-id="direct-avatar-upload"
            />

            <Field.ImageUpload
              v-model="directMedia"
              size-preset="default"
              test-id="direct-avatar-upload"
            />

            <Field.ImageUpload
              v-model="directMedia"
              size-preset="logo"
              test-id="direct-avatar-upload"
            />

            <Field.ImageUpload
              v-model="directMedia"
              size-preset="smallLogo"
              test-id="direct-avatar-upload"
            />

            <div class="flex items-center gap-4">
              <Field.ImageUpload
                v-model="directMedia"
                size-preset="avatar"
                test-id="direct-avatar-upload"
              />

              <div class="text-text-disabled text-xs">
                <p>Direct v-model state:</p>
                <pre class="bg-background max-w-60 overflow-auto rounded p-2 text-left">{{
                  JSON.stringify(directMedia, null, 2)
                }}</pre>
              </div>
            </div>

            <Field.InfiniteScrollSelect
              multiple
              endpoint="/api/mock/users"
              :query-key="['mock-users-direct-multiple']"
              option-label="name"
              option-value="id"
              placeholder="Search multiple users (Infinite)..."
              test-id="direct-infinite-scroll-select-multiple"
              searchable
              :max-selected-labels="1"
            />
          </div>
        </div>

        <div>
          <h2 class="mb-2 text-lg font-semibold">Validation Wrapper (FormField)</h2>
          <Form :validation-schema="validationSchema" class="space-y-4" @submit="onFormSubmit">
            <Field.Text
              label="Username"
              name="username"
              placeholder="shadcn"
              test-id="wrapped-username-input"
            />
            <Field.Password
              label="Password"
              name="password"
              placeholder="••••••••"
              test-id="wrapped-password-input"
            />
            <Field.Number label="Age" name="age" placeholder="25" test-id="wrapped-age-input" />
            <Field.Switch
              `description`="Keep up to date with notifications."
              label="Enable Real-time Notifications"
              name="notifications"
              test-id="wrapped-switch-notifications"
            />
            <Field.Checkbox
              label="Accept Terms & Conditions"
              name="terms"
              test-id="wrapped-checkbox-terms"
            />
            <Field.CheckboxGroup
              :options="roles"
              label="User Roles"
              name="roles"
              test-id="wrapped-checkbox-group"
            />
            <Field.Otp
              :length="6"
              integer-only
              label="One-Time Password"
              name="otp_code"
              test-id="wrapped-otp"
            />
            <Field.DatePicker
              label="Birth Date"
              name="birthDate"
              placeholder="Select birth date..."
              test-id="wrapped-date-picker"
            />
            <Field.RadioGroup
              label="Gender"
              name="gender"
              :options="genders"
              test-id="wrapped-radio-group"
            />
            <Field.Radio
              label="Standlone Radio (Option B)"
              name="radioStandalone"
              test-id="wrapped-radio-standalone"
              value="b"
            />
            <Field.Select
              label="Country"
              name="country"
              show-clear
              :options="countries"
              option-label="label"
              option-value="value"
              placeholder="Select a country..."
              test-id="wrapped-select-country"
            />
            <Field.InfiniteScrollSelect
              label="User (Infinite)"
              name="userId"
              endpoint="/api/mock/users"
              :query-key="['mock-users-wrapped']"
              option-label="name"
              option-value="id"
              placeholder="Search user (Infinite)..."
              test-id="wrapped-infinite-scroll-select"
              searchable
            />
            <Field.Phone
              label="Phone Number"
              name="phone"
              default-country="US"
              placeholder="000 000 0000"
              show-clear
              test-id="wrapped-phone-input"
            />
            <Field.ImageUpload
              label="Corporate Logo"
              name="logo"
              size-preset="logo"
              test-id="wrapped-logo-upload"
            />
            <Field.Textarea
              label="Description"
              name="description"
              placeholder="Enter a description"
              test-id="textarea"
            />

            <Button class="w-full" test-id="submit-form-button" type="submit"> Submit Form </Button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
