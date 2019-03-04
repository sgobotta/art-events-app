import FacebookSignInScreen from '../screens/auth/FacebookSignInScreen'
import { createStackNavigator } from 'react-navigation';

const AuthStack = createStackNavigator({ SignIn: FacebookSignInScreen });

export default AuthStack
