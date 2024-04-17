<script lang="ts" setup>
import { ref } from "vue";
import { client } from "../api-client";
import { useQueryClient } from "@tanstack/vue-query";

const title = ref("");
const description = ref("");
const queryClient = useQueryClient();

const { mutate } = client.todos.create.useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

function onAdd() {
  if (!title.value && !description.value) return;
  mutate({
    body: {
      title: title.value,
      description: description.value,
      completed: false,
    },
  });
}
</script>

<template>
  <div class="add-todo">
    <input
      class="add-todo__input"
      type="text"
      v-model="title"
      placeholder="标题"
    />
    <input
      class="add-todo__input"
      type="text"
      v-model="description"
      placeholder="描述"
    />
    <div class="add-todo__btn" @click="onAdd">添加Todo</div>
  </div>
</template>

<style>
.add-todo {
  background: #6374e7;
  padding: 1em;
  border-radius: 0.5em 0 0 0.5em;

  display: flex;
  flex-direction: column;
  height: 100%;
}

.add-todo__input {
  margin-bottom: 1em;
  padding: 0.5em 1em;
  border-radius: 0.1em;
  border: none;
  outline: none;
}

.add-todo__btn {
  background: #65657e;
  color: #fff;
  font-size: 14px;
  padding: 0.5em 1em;
  border-radius: 0.2em;
  cursor: pointer;
}
</style>
