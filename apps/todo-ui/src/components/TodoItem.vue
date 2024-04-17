<script lang="ts" setup>
import { Todo, UpdateTodoDto } from "shared-api";
import { computed, reactive, ref, watchEffect } from "vue";
import client from "../api-client";
import { useQueryClient } from "@tanstack/vue-query";

interface Props {
  item: Todo;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({}) as Todo,
});

const isEdit = ref(false);
const queryClient = useQueryClient();
const item = computed(() => props.item);
const updateState = reactive<UpdateTodoDto>({
  title: "",
  description: "",
  completed: undefined,
});

watchEffect(() => {
  const { title, description, completed } = item.value;
  Object.assign(updateState, { title, description, completed });
});

const { mutate: removeMutate } = client.todos.remove.useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

const { mutate: updateMutate } = client.todos.update.useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

// 删除
function onDelete() {
  removeMutate({
    params: {
      id: item.value.id,
    },
    body: {},
  });
}

// 更新
function onUpdate() {
  updateMutate(
    {
      params: {
        id: item.value.id,
      },
      body: updateState,
    },
    {
      onSuccess: () => {
        isEdit.value = false;
      },
    }
  );
}

// 完成
function onComplete() {
  updateState.completed = !item.value.completed;
  updateMutate({
    params: {
      id: item.value.id,
    },
    body: updateState,
  });
}
</script>

<template>
  <div
    :class="['todo-item', updateState.completed && 'todo-item--completed']"
    :key="item.id"
  >
    <div
      class="flex-col-center"
      style="margin-right: 10px"
      v-if="!isEdit"
      @click="onComplete"
    >
      <img
        v-if="updateState.completed"
        class="todo-item__icon"
        src="../assets/checked.svg"
      />
      <img
        v-if="!updateState.completed"
        class="todo-item__icon"
        src="../assets/check.svg"
      />
    </div>

    <div class="todo-item__content">
      <div class="todo-item__input">
        <span v-if="!isEdit">{{ item.title }}</span>
        <input type="text" v-model="updateState.title" v-if="isEdit" />
      </div>
      <div class="todo-item__input todo-item__desc">
        <span v-if="!isEdit">{{ item.description }}</span>
        <input type="text" v-model="updateState.description" v-if="isEdit" />
      </div>
    </div>

    <div class="todo-item__btn">
      <div v-if="!isEdit" class="flex-row-center">
        <img
          class="todo-item__icon"
          src="../assets/delete.svg"
          @click="onDelete"
        />
        <img
          class="todo-item__icon"
          src="../assets/edit.svg"
          @click="isEdit = true"
        />
      </div>

      <div class="flex-row-center" v-if="isEdit">
        <div class="submit-btn" @click="onUpdate">确定</div>
        <div class="cancel-btn" @click="isEdit = false">取消</div>
      </div>
    </div>
  </div>
</template>

<style>
.todo-item {
  background: #fff;
  border-radius: 0.3em;
  padding: 0.8em;

  display: flex;
  align-items: center;
  user-select: none;
}

.todo-item__content {
  text-align: left;
}

.todo-item__input {
  height: 25px;
}

.todo-item__btn {
  display: flex;
  margin-left: auto;
}

.todo-item input {
  width: 20dvw;
  height: 100%;
}

.todo-item__icon {
  width: 1.8em;
  height: 1.8em;
  cursor: pointer;
  padding: 5px 3px;
}

.todo-item__icon + .todo-item__icon {
  margin-left: 5px;
}

.submit-btn {
  background: #6374e7;
  color: #fff;
  font-size: 13px;
  padding: 0.3em 1em;
  border-radius: 0.3em;
  cursor: pointer;
}

.cancel-btn {
  background: #cccfde;
  color: #fff;
  font-size: 13px;
  padding: 0.3em 1em;
  border-radius: 0.3em;
  cursor: pointer;
  margin-left: 10px;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row-center {
  display: flex;
  align-items: center;
}

.todo-item--completed .todo-item__input {
  text-decoration: line-through;
  color: #a1a1a1;
}

.todo-item__desc {
  font-size: 14px;
  color: #555;
}
</style>
