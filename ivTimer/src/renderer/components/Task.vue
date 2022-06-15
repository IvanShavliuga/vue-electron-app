<script>
export default {
  props: {
    task: {
      type: Object
    }
  }
}
</script>
<template>
    <div class="task">
        <p class="task__title">
            {{ task.title }}
        </p>
        <p class="task__date">
            {{task.day}}.{{task.month}}.{{ task.year }}  {{task.hour}}:{{task.minute}}:{{ task.second }}
        </p>
        <p class="task__body">
            {{ task.body }}
        </p>
    </div>
</template>
<style lang="scss" scoped>
.task {
    margin: 15px;
    padding: 0;
    border: 1px solid yellow;
    p {
        margin: 0;
        padding: 5px;
    }
    &__title {
        color: red;
        background-color: white;
        font-weight: 800;
    }
    &__date {
        color: yellow;
        background-color: rgba(200,20,200,0.3);
    }
    &__body {
        color: white;
        background-color: rgba(200,20,200,0.3);
    }
}
</style>