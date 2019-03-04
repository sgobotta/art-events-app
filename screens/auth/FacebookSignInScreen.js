import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  View,
} from 'react-native';
import {
  AuthSession,
  Constants
} from 'expo'
import { logIn } from '../../store/actions/auth'

class FacebookSignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Facebook Sign In',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const appId = Constants.manifest.extra.dev.facebook.facebookAppId
    const redirectUrl = AuthSession.getRedirectUrl();
    try {
      const result = await AuthSession.startAsync({
        authUrl:
        `https://www.facebook.com/v3.2/dialog/oauth?response_type=token` +
        `&client_id=${appId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      });
      // this.props.navigation.navigate('Welcome');
      console.log('Result', result)

      if (result.type === 'success') {
        const { logIn, navigation } = this.props
        const token = result.params.access_token
        logIn({ token })
        const scope = 'email,public_profile,user_actions.events'
        const fields = 'email,events,name,picture'
        const fbUrl = `https://graph.facebook.com/me?access_token=${token}` +
        `&scope=${scope}` +
        `&fields=${fields}`

        // Get the user's name using Facebook's Graph API
        const response = await fetch(fbUrl);
        const parsedResponse = await response.json()
        navigation.navigate('Main');
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (payload) => {
      dispatch(logIn(payload));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSignInScreen)
