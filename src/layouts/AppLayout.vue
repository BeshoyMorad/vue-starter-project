<template>
  <div class="flex h-screen flex-col overflow-hidden bg-gray-100">
    <header class="shrink-0 bg-white p-4 shadow">Header</header>
    <main class="flex min-h-0 flex-1 flex-col overflow-hidden p-6">
      <RouterView />
    </main>
  </div>
</template>
