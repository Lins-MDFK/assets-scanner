<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useITDog } from './hooks'

const container = ref()
const { ip_info_list, process_finish, startPing, target, iframe_container, process_text } =
  useITDog()

onMounted(() => {
  iframe_container.value = container.value
})
</script>

<template>
  <a-input v-model:value="target"></a-input>
  {{ process_text }}
  <a-button @click="startPing">开始多地ping</a-button>
  <div ref="iframe_container" class="container"></div>
  <div v-if="process_finish">
    {{ ip_info_list }}
  </div>
</template>

<style lang="less">
frame {
  display: none;
}
td.gg_link {
  display: none !important;
}
.hover-button {
  display: none !important;
}
</style>
