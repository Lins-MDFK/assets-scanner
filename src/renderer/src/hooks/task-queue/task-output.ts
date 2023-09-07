import { reactive } from 'vue'

interface TaskOutput {
  task_id: string
  stdout: string[]
  stderr: string[]
  code: number
}
export enum ProjectType {
  oneForAll = 'oneForAll',
  nmap = 'nmap',
  itdogPing = 'itdogPing',
  dirMap = 'dirMap'
}
export const oneforall_output: TaskOutput[] = reactive<TaskOutput[]>([])
export const nmap_output: TaskOutput[] = reactive<TaskOutput[]>([])
export const itdogPing_output: TaskOutput[] = reactive<TaskOutput[]>([])
export const dirMap_output: TaskOutput[] = reactive<TaskOutput[]>([])

const getOutputList = (type: ProjectType): TaskOutput[] | null => {
  switch (type) {
    case ProjectType.oneForAll:
      return oneforall_output
    case ProjectType.nmap:
      return nmap_output
    case ProjectType.itdogPing:
      return itdogPing_output
    case ProjectType.dirMap:
      return dirMap_output
    default:
      return null
  }
}
const addOutput = (type: ProjectType, task_id: string): void => {
  let output_list: TaskOutput[] | null = []
  let output_exist = false

  output_list = getOutputList(type)

  output_exist = output_list.some((output) => {
    return output.task_id === task_id
  })

  if (output_exist) {
    console.log('output array is exist')
  }
}
const findOutput = (type: ProjectType, task_id: string): TaskOutput => {
  let output_list: TaskOutput[] = []
  let task_output: TaskOutput | null = null

  output_list = getOutputList(type)

  output_list.forEach((output) => {
    if (output.task_id === task_id) {
      task_output = output
      return
    }
  })

  return task_output
}
export const useTaskOutput = (): {
  addOutput: (type: ProjectType, task_id: string) => void
  findOutput: (type: ProjectType, task_id: string) => TaskOutput
} => {
  return {
    addOutput,
    findOutput
  }
}
