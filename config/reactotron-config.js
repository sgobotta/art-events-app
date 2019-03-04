import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import { Constants } from 'expo'

const { myLanIpAddress } = Constants.manifest.extra.dev
const reactotron = Reactotron
  // controls connection & communication settings
  .configure({ name: 'React Native Demo', host: myLanIpAddress })
  .use(reactotronRedux())
  // add all built-in react native plugins
  .useReactNative()
  // let's connect!
  .connect()

export default reactotron
