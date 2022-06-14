import { useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';

function Login(){

  return (<View>
    <TextInput 
      placeholder="Email"
    />
    <TextInput 
      placeholder="Password"
    />
    <Button title="Login" />
  </View>)
}

export default Login;