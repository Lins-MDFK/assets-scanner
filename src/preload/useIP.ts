const axios = require('axios')

export interface MultiplePingArgs {
  url: string
}
export const useMultiplePing = async (args: MultiplePingArgs): Promise<void> => {
  const resp = await axios.get('https://ping.chinaz.com/' + args.url)

  console.log(resp)
}
