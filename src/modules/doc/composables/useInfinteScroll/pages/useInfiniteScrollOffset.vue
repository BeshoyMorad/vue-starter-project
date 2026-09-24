<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import {
    USE_DATA_INFINITE_SCROLL_OFFSET_CODE,
    USE_DATA_INFINITE_SCROLL_OFFSET_COMPONENT_CODE,
  } from '../constants/constants';
  import { type MockUser, type UserFilters } from '../constants/data';
  import { useDataInfiniteScroll } from '@/composables';
  import { getMockOffsetUsers } from '../constants/mockApi';
  import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';
  import { Avatar, AvatarImage, AvatarFallback } from '@/components';

  const {
    data: offsetData,
    isFetchingNextPage: offsetIsFetchingNextPage,
    hasMore: offsetHasMore,
    fetchNextPage: offsetFetchNextPage,
  } = useDataInfiniteScroll<MockUser, UserFilters>({
    queryKey: ['docs-infinite-offset-users'],
    endpoint: '/users',
    paginationType: 'offset',
    limit: 5,
    queryOptions: {
      queryFn: ({ pageParam }) => {
        return getMockOffsetUsers({
          page: pageParam,
          limit: 2,
        });
      },
    },
  });
</script>
<template>
  <Card
    title="Offset Pagination"
    description="Use offset pagination when the API loads data using page numbers and limits."
    how-to-use="Set paginationType to offset. The composable keeps track of the loaded pages and fetches the next page when fetchNextPage is called."
    header="Usage"
    :code-arr="[
      { code: USE_DATA_INFINITE_SCROLL_OFFSET_CODE, header: 'script' },
      { code: USE_DATA_INFINITE_SCROLL_OFFSET_COMPONENT_CODE, header: 'template' },
    ]"
  >
    <template #preview>
      <InfiniteScroll
        :hide-scrollbar="false"
        :items="offsetData"
        :has-more="offsetHasMore"
        :loading="offsetIsFetchingNextPage"
        @load-more="offsetFetchNextPage"
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
    </template>
  </Card>
</template>
