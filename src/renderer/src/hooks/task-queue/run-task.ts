import { Task, TASKS_STATUS } from './queue'
import { runOneForAll } from '../project/oneforall'

export const useRunTask = (task: Task): void => {
  if (task && task.task_enable_project.oneForAll) {
    runOneForAll(task)
    task.task_project_status.oneForAll = TASKS_STATUS.RUNNING
  } else {
    console.log('task is undefined')
  }
}
