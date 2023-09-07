import { reactive } from 'vue'
import { Md5 } from 'ts-md5'
import { useRunTask } from './run-task'

export enum TASKS_STATUS {
  WAITING = 'waiting',
  RUNNING = 'running',
  FINISHED = 'finished',
  FAILED = 'failed',
  CANCEL = 'cancel'
}
export interface TASK_ENABLE_PROJECT {
  nmap: boolean
  oneForAll: boolean
  itdogPing: boolean
  dirMap: boolean
}
export interface TASK_PROJECT_STATUS {
  nmap: TASKS_STATUS
  oneForAll: TASKS_STATUS
  itdogPing: TASKS_STATUS
  dirMap: TASKS_STATUS
}
export interface Task {
  task_id: string
  task_name: string
  task_status: TASKS_STATUS
  task_target: string
  task_enable_project: TASK_ENABLE_PROJECT
  task_project_status: TASK_PROJECT_STATUS
}

const task_queue: Map<string, Task> = reactive<Map<string, Task>>(new Map<string, Task>())
const finish_task_id: string[] = reactive<string[]>([])
const target_list = reactive<string[]>([])

export const useTaskQueue = (): {
  runTask: (task_id: string) => Promise<string>
  task_queue: Map<string, Task>
  updateTaskStatus: (task_id: string, task_status: TASKS_STATUS) => void
  getTaskFinish: () => void
  findTask: (task_id: string) => Task | undefined
  addTask: (args: { target: string; task_enable_project: TASK_ENABLE_PROJECT }) => Promise<string>
} => {
  const updateTaskStatus = (task_id: string, task_status: TASKS_STATUS): void => {
    const task = findTask(task_id)

    if (task) {
      task.task_status = task_status
    }
  }
  const findTask = (task_id: string): Task | undefined => {
    return task_queue.get(task_id)
  }
  const addTask = (args: {
    target: string
    task_enable_project: TASK_ENABLE_PROJECT
  }): Promise<string> => {
    const target_exist = target_list.some((el) => {
      return el === args.target
    })

    return new Promise((resolve, reject) => {
      if (!target_exist) {
        const task_id = Md5.hashStr(`${args.target}${new Date().getTime()}`)
        task_queue.set(task_id, {
          task_enable_project: args.task_enable_project,
          task_id: '',
          task_name: '',
          task_project_status: {
            oneForAll: TASKS_STATUS.WAITING,
            nmap: TASKS_STATUS.WAITING,
            itdogPing: TASKS_STATUS.WAITING,
            dirMap: TASKS_STATUS.WAITING
          },
          task_status: TASKS_STATUS.WAITING,
          task_target: args.target
        })

        resolve(task_id)
      } else {
        reject('')
      }
    })
  }
  const runTask = (task_id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const task: Task | undefined = findTask(task_id)
      if (task) {
        useRunTask(task)

        resolve('task is running')
      } else {
        reject('task is undefined')
      }
    })
  }
  const getTaskFinish = (): void => {
    task_queue.forEach((task) => {
      if (task.task_status === TASKS_STATUS.FINISHED) {
        finish_task_id.push(task.task_id)
      }
    })
  }

  return {
    task_queue,
    findTask,
    updateTaskStatus,
    addTask,
    runTask,
    getTaskFinish
  }
}
