<script setup lang="ts">
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
  import { useToast } from '@/composables/useToast';

  const columns: ColumnDef<{ id: number; name: string; createdAt: Date }, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;
        return h('p', {}, data.id);
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;
        return h('p', {}, data.name);
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      enableSorting: true,
      cell: ({ row }) => {
        const data = row.original;
        return h('p', {}, formatDate(data.createdAt));
      },
    },
  ];

  const data = [
    { id: 1, name: 'name 1', createdAt: new Date() },
    { id: 2, name: 'name 2', createdAt: new Date() },
    { id: 3, name: 'name 3', createdAt: new Date() },
  ];
  const meta: Meta = {
    currentPage: 1,
    totalItems: 50,
    totalPages: 5,
    itemsPerPage: 10,
    hasNextPage: true,
    hasPreviousPage: false,
  };
  const cursorMeta: CursorMeta = {
    hasNextPage: true,
    hasPreviousPage: false,
    limit: 10,
    nextCursor: 'sdffdsdfs',
    previousCursor: null,
  };

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer', disabled: true },
  ];

  const toast = useToast();

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
      description: yup
        .string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
    })
  );

  const onFormSubmit = (values: Record<string, unknown>) => {
    toast.success('Form submitted successfully!');
    toast.info(`Form values: ${JSON.stringify(values)}`);
  };
</script>

<template>
  <div class="space-y-4">
    <div>
      <h1 class="text-3xl font-bold mb-2">Buttons</h1>

      <Button test-id="" variant="default">default</Button>
      <Button test-id="" variant="danger">danger</Button>
      <Button test-id="" variant="success">success</Button>
      <Button test-id="" variant="warning">warning</Button>
      <Button test-id="" variant="ghost">ghost</Button>
      <Button test-id="" variant="link">link</Button>
      <Button test-id="" variant="outline">outline</Button>
    </div>

    <div>
      <h1 class="text-3xl font-bold mb-2">Dialogs</h1>

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
      <h1 class="text-3xl font-bold mb-2">Tables</h1>

      <div class="space-y-5">
        <Table :columns="columns" :value="data" :loading="false" :meta="meta" />
        <Table :columns="columns" :value="data" :loading="false" :meta="cursorMeta" />
        <InfiniteScrollTable :columns="columns" :value="data" :loading="false" />
      </div>
    </div>

    <div>
      <h1 class="text-3xl font-bold mb-2">Forms</h1>

      <div class="max-w-md space-y-6">
        <div>
          <h2 class="text-lg font-semibold mb-2">Direct v-model</h2>
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
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-2">Validation Wrapper (FormField)</h2>
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
