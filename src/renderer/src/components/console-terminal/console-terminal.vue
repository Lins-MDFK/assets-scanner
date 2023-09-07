<script setup lang="ts">
import { reactive, ref } from 'vue'
withDefaults(
  defineProps<{
    command?: string
  }>(),
  {
    command: ''
  }
)

const stdout = reactive<string[]>([])
const stderr = reactive<string[]>([])
const logPanel = ref<HTMLElement>()

const updateScrollTopThrottle = (): (() => void) => {
  let timer: NodeJS.Timeout | null = null

  return (): void => {
    if (!timer) {
      timer = setTimeout(() => {
        timer && clearTimeout(timer)
        timer = null

        console.log('test')

        logPanel.value!.scrollTop = logPanel.value!.scrollHeight
      }, 100)
    }
  }
}

const updateScrollTop = updateScrollTopThrottle()
const exec = (): void => {
  window.useProcess.useChildProcess({
    command: 'python oneforall.py --target weigagroup.cn run',
    cwd: './tools/OneForAll',
    stdout: (data: string) => {
      stdout.push(data)
      updateScrollTop()
    },
    stderr: (data: string) => {
      stdout.push(data)
      updateScrollTop()
    },
    onclose: (code: number) => {
      console.log(code)
    }
  })
}
const test = (): void => {
  setInterval(() => {
    stdout.push('1111')
    updateScrollTop()
  }, 10)
}
</script>

<template>
  <div class="console-terminal">
    <p>{{ logPanel ? logPanel.offsetHeight : 0 }}</p>
    <a-button @click="exec">执行</a-button>

    <div ref="logPanel" class="log-panel">
      <p v-for="(out, i) in stdout" :key="i" class="text">{{ out }}</p>
      <p v-for="(err, i) in stderr" :key="i" class="text">{{ err }}</p>
    </div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
