import { reactive } from 'vue'

interface TaskConfig {
  url: string
  nmap: boolean
  oneForAll: boolean
  itdogPing: boolean
  dirMap: boolean
}

const useTask = () => {
  const taskConfig = reactive<TaskConfig>({
    dirMap: false,
    nmap: false,
    oneForAll: false,
    itdogPing: false,
    url: ''
  })

  return {
    taskConfig
  }
  // useOneForAll
  // use
}
