<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import { USE_DATA_INFINITE_SCROLL_PARAMS_CODE } from '../constants/constants';
  import { type MockUser, type UserFilters } from '../constants/data';
  import { useDataInfiniteScroll } from '@/composables';
  import { getMockOffsetUsers } from '../constants/mockApi';
  import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';
  import { Avatar, AvatarImage, AvatarFallback, Field } from '@/components';

  const { data, isFetchingNextPage, hasMore, fetchNextPage, search, baseParams } =
    useDataInfiniteScroll<MockUser, UserFilters>({
      queryKey: ['docs-users'],
      endpoint: '/users',
      paginationType: 'offset',
      limit: 10,
      queryOptions: {
        queryFn: ({ pageParam }) => {
          return getMockOffsetUsers({
            ...baseParams.value,
            page: pageParam,
          });
        },
      },
    });
</script>
<template>
  <Card
    title="Search"
    description="Use search to filter the data by a text value."
    how-to-use=" Bind an input to the search ref returned by useDataInfiniteScroll. The search value is automatically debounced before the API request."
    header="Usage"
    :code="USE_DATA_INFINITE_SCROLL_PARAMS_CODE"
  >
    <template #preview>
      <div class="flex w-full flex-col gap-2">
        <Field.Text
          v-model="search"
          type="text"
          placeholder="Search users..."
          test-id="searchTestId"
        />
        <InfiniteScroll
          :items="data"
          :has-more="hasMore"
          :hide-scrollbar="false"
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
      </div>
    </template>
  </Card>
</template>
