const exec = require('child_process').exec
const iconvLite = require('iconv-lite')

export interface SpawnArgs {
  command: string
  stdout: (data: string) => void
  stderr: (data: string) => void
  onclose: (code: number) => void
  cwd: string
}
export const useSpawn = (args: SpawnArgs): void => {
  const workProcess = exec(args.command, {
    encoding: 'buffer',
    cwd: args.cwd
  })

  workProcess.stdout.on('data', (data: string) => {
    args.stdout(iconvLite.decode(data, 'cp936'))
  })
  workProcess.stderr.on('data', (data: string) => {
    args.stderr(iconvLite.decode(data, 'cp936'))
  })

  workProcess.on('close', (code: number) => {
    console.log('close code : ' + code)
  })
}
