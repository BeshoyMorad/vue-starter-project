import type { DocPageContent, DocSection } from '@/modules/doc/shared/types';

const OVERVIEW_ITEMS = [
  {
    name: 'useDataTable / useDataInfiniteScroll',
    description:
      'Server lists. See the useDataTable, useDataTable Deep Dive and useInfiniteScroll pages.',
  },
  {
    name: 'useTableState',
    description: 'Search, filters, sort and paging state under the two above.',
  },
  {
    name: 'useUploadImage / useFormMedia',
    description: 'Presigned uploads and form media. See their pages.',
  },
  {
    name: 'useMultiStepForm',
    description:
      'Wizard forms with per-step validation and persistence. See Forms > Multi Step Form.',
  },
  { name: 'useDarkTheme', description: 'Theme choice with device fallback. See its page.' },
  { name: 'useDialog', description: 'Open / close boolean for dialogs.' },
  { name: 'useCan', description: 'Permission check helper.' },
  { name: 'useAuthRedirect', description: 'Remember the page to return to after login.' },
  { name: 'useNetwork', description: 'Offline detection and the no-internet page.' },
  { name: 'useVirtualScroll', description: 'Render only the visible rows of a very long list.' },
] as const;

const DIALOG_CODE = `import { useDialog } from '@/composables';

const { isOpen, openDialog, closeDialog, toggleDialog } = useDialog();      // useDialog(true) = open at start

// <Button @click="openDialog">Add</Button>
// <CreateDialog v-if="isOpen" v-model:open="isOpen" />
// v-if on the dialog makes its form composable start fresh every time it opens.
// Use it for any dialog flag. The helper module already calls it as useDialog.`;

const CAN_CODE = `import { useCan } from '@/composables/useCan';   // not exported from the barrel

const { can } = useCan();            // same as usePermissionStore().can

// <Button v-if="can('assets.create')">Add</Button>
can('assets.update');                        // 'resource.action' string
can(['a.list', 'b.list'], 'and');            // several permissions, default operator is 'or'

// A hidden button is not protection. Add a route guard too (permissions rule).
// Permission names are typed from src/types/permissions.d.ts (AppPermissions).`;

const AUTH_CODE = `import { useAuthRedirect } from '@/composables';

const { saveRedirectUrl, handleRedirect } = useAuthRedirect();

// before sending a guest to login (auth guard)
saveRedirectUrl(to.fullPath);            // ignores urls that contain /auth/

// after a successful login (useLoginMutation)
handleRedirect();                        // goes to the saved url, or to the dashboard
handleRedirect(paths.dashboard.starter); // other fallback route name
// stored in sessionStorage under redirect_url; getRedirectUrl() / clearRedirectUrl() also exist`;

const NETWORK_CODE = `import { useNetwork } from '@/composables';

// called once in App.vue
const { initListeners } = useNetwork();
initListeners();                         // adds online / offline listeners, redirects on offline

const { isOnline, tryAgain } = useNetwork();   // on the no-internet page
// offline -> saves the current route, pushes paths.errors.noInternet
// online  -> returns to the saved route
// The api client also calls handleOffline when a request fails with no response and navigator.onLine is false.`;

const VIRTUAL_CODE = `const container = ref<HTMLElement | null>(null);

const { visibleItems, totalHeight, offsetTop } = useVirtualScroll({
  containerRef: container,
  items: () => rows.value,        // ref or getter
  itemHeight: 48,                 // px, fixed height rows (number, ref or getter)
  overscan: 5,                    // extra rows above and below, default 5
  enabled: () => rows.value.length > 100,   // false renders all items
});

// <div ref="container" class="h-96 overflow-auto">
//   <div :style="{ height: totalHeight + 'px', position: 'relative' }">
//     <div :style="{ transform: 'translateY(' + offsetTop + 'px)' }">
//       <Row v-for="r in visibleItems" :key="r.id" :row="r" />
// Also returns scrollTop, containerHeight, startIndex, endIndex, totalItems.
// Rows must have the same height. For server lists prefer useDataInfiniteScroll.`;

const INFINITE_CODE = `// Same options and return shape as useDataTable, but pages are appended
const { data, isLoading, isFetchingNextPage, hasMore, fetchNextPage, search, setFilters } =
  useDataInfiniteScroll<Asset, { networkId?: number }>({
    queryKey: QUERY_KEYS.assets.allAssets(),
    endpoint: apiRoute('assets.all'),
  });
// <InfiniteScrollTable :value="data" :has-more="hasMore" :is-fetching-next-page="isFetchingNextPage"
//   @load-more="fetchNextPage" />
// Use it for selection lists, dropdown data and mobile feeds; use useDataTable for pages with page numbers.`;

const MULTI_CODE = `const { form, currentStep, isFirstStep, isLastStep, progress, next, back, goTo,
        submit, handleApiError, clearStorage } = useMultiStepForm(options);

await next();                                   // validates the current step only
await submit(async (values) => { await mutateAsync(values); });
handleApiError(err, 'email');                   // applyApiErrorToForm + jump to the step that has the error`;

const SECTIONS: readonly DocSection[] = [
  {
    title: 'All composables at a glance',
    description:
      'Everything in src/composables. The barrel @/composables exports all of them except useCan and useTableState, which you import from their own file. Search here before you write a new one.',
    items: OVERVIEW_ITEMS,
  },
  {
    title: 'useDialog',
    description: 'A boolean plus open, close and toggle.',
    code: DIALOG_CODE,
    header: 'useDialog',
  },
  {
    title: 'useCan',
    description: 'Show or hide UI by permission.',
    code: CAN_CODE,
    header: 'useCan',
  },
  {
    title: 'useAuthRedirect',
    description: 'Return the user to where they were after login.',
    code: AUTH_CODE,
    header: 'useAuthRedirect',
  },
  {
    title: 'useNetwork',
    description: 'Offline handling.',
    code: NETWORK_CODE,
    header: 'useNetwork',
  },
  {
    title: 'useVirtualScroll',
    description: 'Windowing for long lists.',
    code: VIRTUAL_CODE,
    header: 'useVirtualScroll',
  },
  {
    title: 'useDataInfiniteScroll',
    description: 'Infinite lists with the same API as useDataTable.',
    code: INFINITE_CODE,
    header: 'useDataInfiniteScroll',
  },
  {
    title: 'useMultiStepForm',
    description: 'Wizard forms. Full guide in Forms > Multi Step Form.',
    code: MULTI_CODE,
    header: 'useMultiStepForm',
  },
];

export const DOC_CONTENT: DocPageContent = {
  title: 'App Composables',
  description:
    'The smaller composables of the starter: what each one does, when to use it, and the shortest correct example.',
  sections: SECTIONS,
};
