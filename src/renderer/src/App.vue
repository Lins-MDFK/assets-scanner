<script setup lang="ts">
import { useTaskQueue } from './hooks/task-queue/queue'
import { ref } from 'vue'

const { addTask, runTask, task_queue } = useTaskQueue()
const task_id = ref('')

addTask({
  target: 'bitc.edu.cn',
  task_enable_project: {
    itdogPing: false,
    nmap: false,
    oneForAll: true,
    dirMap: false
  }
})
  .then((data) => {
    task_id.value = data

    runTask(task_id.value)
      .then((data) => {
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  })
  .catch((e) => {
    console.log(e)
  })
</script>

<template>
  <div>{{ task_queue }}</div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
//子域名 端口 目录 资产
