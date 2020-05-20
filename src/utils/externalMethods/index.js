import APP from './appMethods.js'
import WX from './wxMethods.js'

const externalMethods = {
    APP: APP,
    WX: WX
}
export default externalMethods[navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1?"WX":'APP']