import { useJsonFile } from '../../../../../preload/useFile'

const { readJson } = useJsonFile()

const fileDir = './tools/OneForAll/result/weigagroup.cn.json'
export const useSubdomain = (): void => {
  const readResult = (url: string) => {}

  readJson(fileDir)
}
