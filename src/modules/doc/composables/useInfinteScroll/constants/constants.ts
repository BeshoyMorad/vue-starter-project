export const USE_DATA_INFINITE_SCROLL_DOM = {
  title: 'useDataInfiniteScroll',
  description:
    'A composable for managing infinite scrolling data with pagination, loading states, and API requests.',
  import: {
    title: 'Import',
    description:
      'Import useDataInfiniteScroll and InfiniteScroll from the composables and components modules.',
  },
};
export const USE_DATA_INFINITE_SCROLL_TABLE_CODE_SCRIPT = `const {
  data,
  isLoading,
  isFetchingNextPage,
  hasMore,
  fetchNextPage,
} = useDataInfiniteScroll<MockUser>({
  queryKey: ['docs-infinite-scroll-users'],
  endpoint: '/users',
});`;
export const USE_DATA_INFINITE_SCROLL_TABLE_CODE_TEMPLATE = `<InfiniteScrollTable
  :columns="columns"
  :value="data"
  :loading="isLoading"
  :is-fetching-next-page="isFetchingNextPage"
  :has-more="hasMore"
  max-height="400px"
  @load-more="fetchNextPage"
/>`;
export const USE_DATA_INFINITE_SCROLL_IMPORT_CODE = `import { useDataInfiniteScroll } from '@/composables';
import { InfiniteScroll } from '@/components';`;

export const USE_DATA_INFINITE_SCROLL_BASIC_CODE = `const {
  data,                 // Get the accumulated data from all loaded pages
  isFetchingNextPage,   // Check if the next page is currently loading
  hasMore,              // Check if more data is available
  fetchNextPage,        // Load the next page
  filters,               // Access the current filters
  search,                // Access the current search query
} = useDataInfiniteScroll<User, UserFilters>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'offset',  // Use pagination type 'offset' or 'cursor'
  limit: 10,
});`;

export const USE_DATA_INFINITE_SCROLL_OFFSET_CODE = `const {
  data,
  isFetchingNextPage,
  hasMore,
  fetchNextPage,
  baseParams,
} = useDataInfiniteScroll<User, UserFilters>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'offset',
  limit: 5,
});`;

export const USE_DATA_INFINITE_SCROLL_OFFSET_COMPONENT_CODE = `<InfiniteScroll
     :hideScrollbar="false"
     :items="data"
     :has-more="hasMore"
     :loading="isFetchingNextPage"
     @load-more="fetchNextPage"
      >
     <template #default="{ items }">
       <div class="grid w-full grid-cols-1 gap-2 space-y-2 p-2 md:grid-cols-2">
         <div
    v-for="user in items"
    :key="user.id"
    class="border-border-primary/30 bg-primary-500/2 hover:bg-primary-500/10 hover:border-border-primary rounded-md border p-3 transition-all hover:scale-101">
    <div class="flex items-center justify-between gap-2">
      <div class="flex gap-2">
        <Avatar class="size-12">
          <AvatarImage :src="user.avatar" alt="User avatar" />
          <AvatarFallback> {{ user.name.charAt(0) }} </AvatarFallback>
        </Avatar>
        <div>
          <p class="font-medium">
     {{ user.name }}
          </p>
          <p class="text-text-secondary text-sm">
     {{ user.email }}
          </p>
        </div>
      </div>
      <div>
        <p class="bg-border-primary text-bg-surface rounded-full px-3 text-sm">
          {{ user.role }}
        </p>
      </div>
    </div>
         </div>
       </div>
     </template>
</InfiniteScroll>`;

export const USE_DATA_INFINITE_SCROLL_CURSOR_CODE = `const {
  data,
  isFetchingNextPage,
  hasMore,
  isLoading,
  fetchNextPage,
  sort,
} = useDataInfiniteScroll<User, UserFilters>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'cursor',
  limit: 10,
  initialSort: {
   sortKey: 'id', // accessorKey of the column you want to be initial sort
    order: 'ASC', // 'ASC' or 'DESC' for ascending or descending order
  },
});`;

export const USE_DATA_INFINITE_SCROLL_CURSOR_COMPONENT_CODE = `<InfiniteScrollTable
  :columns="columns"          // Array of column definitions
  :value="data"               // Array of data
  :loading="isLoading"        // state of loading 
  :is-fetching-next-page="isFetchingNextPage"     
  :has-more="hasMore"         
  max-height="400px"          // Max height of the scrollable area
  @load-more="fetchNextPage"
  @sort="sort"                // Event handler for sorting
/>`;

export const USE_DATA_INFINITE_SCROLL_CURSOR_COLUMNS_CODE = `const columns: ColumnDef<MockUser, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
];`;

export const USE_DATA_INFINITE_SCROLL_VIRTUAL_CODE = `<InfiniteScroll
  :items="data"       // Array of items
  virtual             // Use virtual scroll
  :item-height="54"   // Height of each item
  max-height="400px"  // Max height of the scrollable area
  :has-more="hasMore"
  :loading="isFetchingNextPage"
  @load-more="fetchNextPage"
    >
  <template #default="{ items }">
          <div class="grid w-full grid-cols-1 gap-2 space-y-2 p-2 md:grid-cols-2">
            <div
              v-for="user in items"
              :key="user.id"
              class="border-border-primary/30 bg-primary-500/2 hover:bg-primary-500/10 hover:border-border-primary rounded-md border p-3 transition-all hover:scale-101"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="flex gap-2">
                  <Avatar class="size-12">
                    <AvatarImage :src="user.avatar" alt="User avatar" />
                    <AvatarFallback> {{ user.name.charAt(0) }} </AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-medium">
                      {{ user.name }}
                    </p>
                    <p class="text-text-secondary text-sm">
                      {{ user.email }}
                    </p>
                  </div>
                </div>

                <div class="flex">
                  <p class="rounded-full px-3 text-sm"># {{ user.id }}</p>

                  <p class="bg-border-primary text-bg-surface rounded-full px-3 text-sm">
                    {{ user.role }}
                  </p>
                </div>
              </div>
            </div>
          </div>
  </template>
</InfiniteScroll>`;
export const USE_DATA_INFINITE_SCROLL_CURSOR_DOC = {
  title: 'Infinite Scroll Table',
  description: 'Infinite scroll table using the useDataInfiniteScroll composable.',
  howToUse:
    'Infinite scroll table using the useDataInfiniteScroll composable. The table is rendered using the InfiniteScrollTable component.',
  header: 'Usage',
  codeArr: [
    {
      code: USE_DATA_INFINITE_SCROLL_CURSOR_COLUMNS_CODE,
      header: 'columns',
    },
    {
      code: USE_DATA_INFINITE_SCROLL_CURSOR_CODE,
      header: 'script',
    },
    {
      code: USE_DATA_INFINITE_SCROLL_CURSOR_COMPONENT_CODE,
      header: 'template',
    },
  ],
} as const;
export const USE_DATA_INFINITE_SCROLL_PARAMS_CODE = `<Field.Select
  v-model="filters.role"
  show-clear
  test-id="select-role-filter"
  :options="filterOptions"
  option-label="label"
  option-value="value"
  />

<InfiniteScroll
  :items="data"
  :has-more="hasMore"
  :loading="isFetchingNextPage"
  @load-more="fetchNextPage"
   >
   <template #default="{ items }">
    <div class="grid w-full grid-cols-1 gap-2 space-y-2 p-2 md:grid-cols-2">
      <div
        v-for="user in items"
        :key="user.id"
        class="border-border-primary/30 bg-primary-500/2 hover:bg-primary-500/10 hover:border-border-primary rounded-md border p-3 transition-all hover:scale-101"
      >
        <div class="flex items-center justify-between gap-2">
    <div class="flex gap-2">
      <Avatar class="size-12">
        <AvatarImage :src="user.avatar" alt="User avatar" />
        <AvatarFallback> {{ user.name.charAt(0) }} </AvatarFallback>
      </Avatar>
      <div>
        <p class="font-medium">
    {{ user.name }}
        </p>
        <p class="text-text-secondary text-sm">
    {{ user.email }}
        </p>
      </div>
    </div>
    <div>
      <p class="bg-border-primary text-bg-surface rounded-full px-3 text-sm">
        {{ user.role }}
      </p>
    </div>
        </div>
      </div>
    </div>
  </template>
</InfiniteScroll>`;

export const USE_DATA_INFINITE_SCROLL_SEARCH = `<Field.Text
          v-model="search"
          type="text"
          placeholder="Search users..."
          test-id="searchTestId"
        />
        <InfiniteScroll
          :items="data"
          :has-more="hasMore"
          :loading="isFetchingNextPage"
          @load-more="fetchNextPage"
        >
          <template #default="{ items }">
            <div class="grid w-full grid-cols-1 gap-2 space-y-2 p-2 md:grid-cols-2">
              <div
                v-for="user in items"
                :key="user.id"
                class="border-border-primary/30 bg-primary-500/2 hover:bg-primary-500/10 hover:border-border-primary rounded-md border p-3 transition-all hover:scale-101"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex gap-2">
                    <Avatar class="size-12">
                      <AvatarImage :src="user.avatar" alt="User avatar" />
                      <AvatarFallback> {{ user.name.charAt(0) }} </AvatarFallback>
                    </Avatar>
                    <div>
                      <p class="font-medium">
                        {{ user.name }}
                      </p>
                      <p class="text-text-secondary text-sm">
                        {{ user.email }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p class="bg-border-primary text-bg-surface rounded-full px-3 text-sm">
                      {{ user.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </InfiniteScroll>
`;

export const USE_DATA_INFINITE_SCROLL_BASIC_COMPONENT_CODE = `<InfiniteScroll
  :items="data"
  :has-more="hasMore"
  :loading="isFetchingNextPage"
  @load-more="fetchNextPage"
>
  <template #default="{ items }">
    <div
      v-for="user in items"
      :key="user.id"
    >
      {{ user.name }}
    </div>
  </template>
</InfiniteScroll>`;

export const USE_DATA_INFINITE_SCROLL_COMPONENT_PROPS_CODE = `<InfiniteScroll
  :items="data"
  :has-more="hasMore"
  :loading="isFetchingNextPage"
  :distance="120"
  :height="'400px'"
  :max-height="'600px'"
  :hide-scrollbar="true"
  @load-more="fetchNextPage"
/>`;

export const USE_DATA_INFINITE_SCROLL_VIRTUAL_PROPS_CODE = `<InfiniteScroll
  :items="data"
  :has-more="hasMore"
  :loading="isFetchingNextPage"
  :virtual="true"
  :item-height="140"
  :overscan="5"
  :fit-height="true"
  @load-more="fetchNextPage"
/>`;

export const USE_DATA_INFINITE_SCROLL_SLOT_CODE = `<InfiniteScroll
  :items="data"
  :has-more="hasMore"
  :loading="isFetchingNextPage"
  @load-more="fetchNextPage"
>
  <template #default="{ items, startIndex }">
    <div
      v-for="(item, index) in items"
      :key="item.id"
    >
      {{ startIndex + index + 1 }}. {{ item.name }}
    </div>
  </template>

  <template #loading>
    Loading more users...
  </template>
</InfiniteScroll>`;

export const USE_DATA_INFINITE_SCROLL_PROPS_CODE = `interface Props {
  hasMore: boolean;
  loading: boolean;
  disabled?: boolean;
  distance?: number;
  height?: string;
  maxHeight?: string;
  class?: HTMLAttributes['class'];
  hideScrollbar?: boolean;
  virtual?: boolean;
  items?: T;
  itemHeight?: number;
  overscan?: number;
  fitHeight?: boolean;
}`;

export const USE_DATA_INFINITE_SCROLL_DEFAULTS_CODE = `const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  distance: 120,
  height: 'auto',
  maxHeight: '400px',
  class: '',
  hideScrollbar: true,
  virtual: false,
  items: () => [] as unknown as T,
  itemHeight: 140,
  overscan: 5,
  fitHeight: false,
});`;
