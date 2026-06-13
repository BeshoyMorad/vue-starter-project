<script setup lang="ts">
  import { Button, ConfirmDialog, Dialog } from '@/components';
  import FormDialog from '@/components/form-dialog/FormDialog.vue';
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
  </div>
</template>
