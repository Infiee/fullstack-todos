<script lang="ts" setup>
import { computed } from "vue";
import { client } from "../api-client";
import TodoItem from "./TodoItem.vue";

const { data } = client.todos.getAll.useQuery(["todos"], () => ({}), {
  // 设置过期时间，如果设置为Infinity则是不过期
  // staleTime: Infinity,
  // refetchOnMount: true,

  // TODO: 当窗口获焦的时候是否重新获取数据，这里暂时关闭，因为开发的时候会很频繁的触发
  // 参考链接：https://tanstack.com/query/v4/docs/framework/vue/guides/important-defaults
  refetchOnWindowFocus: false
});
const list = computed(() => data.value?.body);
</script>

<template>
  <div class="todo-list">
    <TodoItem v-for="item in list" :key="item.id" :item="item" />
  </div>
</template>

<style>
.todo-list {
  width: 100%;
  /* background: #ecedf5; */
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
