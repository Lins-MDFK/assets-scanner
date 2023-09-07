import { Ref, ref } from 'vue'

const itdog_url = 'https://www.itdog.cn/ping/'
interface IPInfo {
  realIP: string
  ipAddress: string
}

const process_text = ref('0%')
const process_finish = ref(false)
const ping_running = ref(false)
const target = ref('')

const getIframeHTML = (): string => {
  return (
    '<iframe\n' +
    '    id="itdog-iframe"\n' +
    '    ref="iframe"\n' +
    `    src="${itdog_url + target.value}"\n` +
    '    style="width: 0; height: 0"\n' +
    '  ></iframe>'
  )
}
const ip_info_list: IPInfo[] = []
const statisticalIPInfo = (doc: Document | undefined): void => {
  const tbody = doc?.querySelector('#simpletable > tbody')
  const resultTrList: NodeListOf<HTMLElement> | undefined = tbody?.querySelectorAll(
    '#simpletable > tbody > tr'
  )

  resultTrList?.forEach((el: HTMLElement): void => {
    ip_info_list.push({
      realIP: el.querySelector('.real_ip div')?.innerHTML || '',
      ipAddress: el.querySelector('.ip_address')?.innerHTML || ''
    })
  })
}
const clickIframeStartPing = (doc: Document | undefined): void => {
  const startButton: HTMLButtonElement | null | undefined = doc?.querySelector(
    '#screenshots > div > div > div > div:nth-child(3) > div > div > div > div:nth-child(1) > button'
  )
  startButton?.click()

  ping_running.value = true
}
const setProcess = (doc: Document | undefined, finishCallBack: () => void): void => {
  const timer: number = window.setInterval(() => {
    process_text.value = doc?.querySelector('.progress-bar')?.innerHTML || '0%'

    if (process_text.value === '100%') {
      window.clearInterval(timer)

      process_finish.value = true

      finishCallBack()
    }
  }, 100)
}

const iframeOnload = function (this: GlobalEventHandlers): void {
  const doc: Document | undefined = (this as HTMLIFrameElement)?.contentWindow?.document

  if (ping_running.value === false) {
    clickIframeStartPing(doc)
  } else if (ping_running.value === true) {
    setProcess(doc, () => {
      statisticalIPInfo(doc)
    })
  }
}
const reset = (): void => {
  process_text.value = ''
  process_finish.value = false
  ping_running.value = false
  ip_info_list.splice(0, ip_info_list.length)
}
export const useITDog = (): {
  startPing: () => void
  process_finish: Ref<boolean>
  process_text: Ref<string>
  ip_info_list: IPInfo[]
  target: Ref<string>
  iframe_container: Ref<HTMLElement> | Ref<undefined>
} => {
  const iframe_container: Ref<HTMLElement | undefined> = ref(undefined)

  const startPing = (): void => {
    reset()

    if (iframe_container.value !== undefined) {
      iframe_container.value.innerHTML = ''
      iframe_container.value.innerHTML = getIframeHTML()
      const itdog_iframe: HTMLIFrameElement | null =
        iframe_container.value.querySelector('#itdog-iframe')

      itdog_iframe && (itdog_iframe.onload = iframeOnload)
    }
  }

  return {
    startPing,
    ip_info_list,
    process_finish,
    process_text,
    target,
    iframe_container
  }
}
