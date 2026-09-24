<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import { USE_DATA_INFINITE_SCROLL_VIRTUAL_CODE } from '../constants/constants';
  import { type MockUser, type UserFilters } from '../constants/data';
  import { useDataInfiniteScroll } from '@/composables';
  import { getMockOffsetUsers } from '../constants/mockApi';
  import InfiniteScroll from '@/components/infinite-scroll/InfiniteScroll.vue';
  import { Avatar, AvatarImage, AvatarFallback } from '@/components';
  const { data, isFetchingNextPage, hasMore, fetchNextPage } = useDataInfiniteScroll<
    MockUser,
    UserFilters
  >({
    queryKey: ['docs-infinite-virtual-users'],
    endpoint: '/users',
    paginationType: 'offset',
    limit: 2,
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
    title="Virtual Scroll"
    description="Enable virtual scrolling for large datasets to render only the items currently visible in the scroll container."
    how-to-use="Set virtual to true and provide the items, itemHeight, and overscan values. The component renders only the visible items while maintaining the correct scroll height."
    header="Usage"
    :code="USE_DATA_INFINITE_SCROLL_VIRTUAL_CODE"
  >
    <template #preview>
      <InfiniteScroll
        :items="data"
        virtual
        :item-height="54"
        max-height="400px"
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
      </InfiniteScroll>
    </template>
  </Card>
</template>
