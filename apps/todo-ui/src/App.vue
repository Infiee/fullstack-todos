<script setup lang="ts">
import AddTodo from "./components/AddTodo.vue";
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <h2>TODO LIST</h2>
  <div class="todo-wrapper">
    <div class="add-todo-layout">
      <AddTodo />
    </div>
    <div class="todo-list-layout">
      <TodoList />
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  background: #f8f9ff;
}

h2 {
  color: #65657e;
  margin-top: 0;
}

.todo-wrapper {
  display: flex;
  width: 80dvw;
  justify-content: center;
}

.add-todo-layout {
  width: 30dvw;
  max-width: 250px;
}

.todo-list-layout {
  width: 50dvw;
  background: #ecedf5;
  border-radius: 0 0.5em 0.5em 0;
}

@media screen and (max-width: 767px) {
  .todo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .add-todo-layout {
    width: 100%;
    max-width: none;
  }
  .todo-list-layout {
    width: 100%;
    margin-top: 1em;
  }
}
</style>
