import { ProjectType, useTaskOutput } from '../task-queue/task-output'
import { Task, TASKS_STATUS } from '../task-queue/queue'
const oneForAllDir = './tools/OneForAll'

const getCommand = (args: { target: string; suffix?: string }): string => {
  // python oneforall.py --target weigagroup.cn run
  const commandPrefix = `python oneforall.py `
  const targetArg = '--target '
  const runArg = ' run'
  return `${commandPrefix}${targetArg}${args.target}${args.suffix || ''}${runArg}`
}

export const runOneForAll = (task: Task): void => {
  const { findOutput } = useTaskOutput()
  const task_output = findOutput(ProjectType.oneForAll, task.task_id)
  window.useProcess.useSpawn({
    command: getCommand({
      target: task.task_target
    }),
    cwd: oneForAllDir,
    onclose: (code: number) => {
      task_output.code = code
    },
    stderr: (data: string) => {
      task_output.stderr.push(data)
    },
    stdout: (data: string) => {
      task_output.stdout.push(data)
    }
  })
}
export const readOnForAllResult = (task: Task): Promise<JSON | unknown> => {
  const path = 'tools/OneForAll/results/'

  if (task.task_project_status.oneForAll === TASKS_STATUS.FINISHED) {
    return new Promise((resolve, reject) => {
      try {
        window.file.readJson(`${path}${task.task_target}`, (json: object) => {
          resolve(json)
        })
      } catch (e: unknown) {
        reject(e)
      }
    })
  } else {
    return new Promise((reject) => {
      reject('task is not finished')
    })
  }
}
