<script setup lang="ts">
import { ref } from 'vue'

window.file.readJson('tools/OneForAll/results/weigagroup.cn.json', (json: object) => {
  console.log(json)
})
const targets = ref('')
</script>

<template>
  <div>
    <a-input v-model:default-value="targets"></a-input>
  </div>
</template>

<style scoped lang="less"></style>
