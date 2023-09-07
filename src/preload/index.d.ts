import { ElectronAPI } from '@electron-toolkit/preload'
import { SpawnArgs } from "./useProcess";
import { MultiplePingArgs } from "./useIP";

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    useProcess: {
      useSpawn: (args: SpawnArgs) => void
    },
    useIP: {
      useMultiplePing: (args: MultiplePingArgs) => void
    },
    useFile: {
      readJson: (fileDir: string) => void
    }
  }
}
