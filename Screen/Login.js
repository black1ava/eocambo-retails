import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Modal, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { 
  PhoneAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google'
import { ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

import * as Firebase from '../firebase'
import Button from '../Shared/Button';


const app = Firebase.app;
const auth = Firebase.auth;
WebBrowser.maybeCompleteAuthSession();

function Login(props){
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const recaptchaRef = useRef(null);

  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '3198717493724350'
  });

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    clientId: '858605708808-65v33u0upm5k9un1phi32rt9obkh4tcf.apps.googleusercontent.com'
  });

  function handlePhoneNumberChange(value){
    setPhoneNumber(value);
  }

  async function handleAuthenticateWithPhone(){
    const provider = new PhoneAuthProvider(auth);
    const phone = `+855${ phoneNumber }`;
    const verificationId = await provider.verifyPhoneNumber(phone, recaptchaRef.current);
    setVerificationId(verificationId);
    handleVerificationModalVisibleToggle();
  };

  function handleVerificationModalVisibleToggle(){
    setVerificationModalVisible(function(visibleState){
      return !visibleState;
    });
  }

  async function handleVerifyAuthenticationWithPhoneNumber(){
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      setPhoneNumber('');
      handleVerificationModalVisibleToggle();
      props.navigation.navigate('Home');
    }catch(err){
      handleVerificationModalVisibleToggle();
      alert("Please try again");
    }
  }

  async function handleAuthenticateWithFacebook(){
    await facebookPromptAsync();
    props.navigation.navigate('Home');
  }

  async function handleAuthenticateWithGoogle(){
    await googlePromptAsync();
    props.navigation.navigate('Home');
  }

  function handleOtpChange(value){
    setOtp(value);
  }

  useEffect(function(){
    if(facebookResponse?.type === 'success'){
      const { access_token } = facebookResponse.params; 
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential);
    }
  }, [facebookResponse]);

  useEffect(function(){
    if(googleResponse?.type === 'success'){
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [googleResponse]);

  function handleGoBack(){
    props.navigation.goBack();
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.backButton }>
        <TouchableOpacity onPress={ handleGoBack }>
          <Ionicons name="chevron-back-sharp" size={ 35 } color="white" />
        </TouchableOpacity>
      </View>
      <FirebaseRecaptchaVerifierModal 
        ref={ recaptchaRef }
        firebaseConfig={ app.options }
      />
      <View style={ styles.content }>
        <Text style={ styles.title }>Login account</Text>
        <View style={ styles.phone }>
          <View style={ styles.phonePrefix }>
            <Image 
              source={ require('../assets/images/cambodia.png') } 
              style={ styles.imagePrefix }
            />
            <Text>+855</Text>
          </View>
          <TextInput
            placeholder="Phone number"
            onChangeText={ handlePhoneNumberChange }
            value={ phoneNumber }
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity 
          style={ styles.nextButton } 
          onPress={ handleAuthenticateWithPhone }
        >
          <Text style={ styles.nextButtonText }>
            Next
          </Text>
        </TouchableOpacity>
        <View style={ styles.divider }>
          <View style={ styles.dividerLine }></View>
          <Text style={ styles.dividerText }>OR</Text>
          <View style={ styles.dividerLine }></View>
        </View>
        <View style={ styles.otherLogin }>
          <TouchableOpacity style={ styles.facebookLogin } disabled={ !facebookRequest } onPress={ handleAuthenticateWithFacebook }>
            <Entypo name="facebook-with-circle" size={26} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity disabled={ !googleRequest } onPress={ handleAuthenticateWithGoogle }>
            <AntDesign name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={ verificationModalVisible }
      >
        <View style={ styles.modalContainer }>
          <View style={ styles.modalContent }>
            <Text style={ styles.modalTitle }>Verification code</Text>
            <View style={ styles.otpInput }>
              <TextInput 
                keyboardType="number-pad"
                value={ otp }
                placeholder="OTP code"
                onChangeText={ handleOtpChange }
              />
            </View>
            <Button 
              title="Verify"
              backgroundColor="#0AA1DD"
              onAction={ handleVerifyAuthenticationWithPhoneNumber }
              color="#fff"
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0AA1DD',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  phone: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
  },
  phonePrefix: {
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center'
  },
  imagePrefix: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  nextButton: {
    backgroundColor: '#0AA1DD',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 15
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  divider: {
    flexDirection: 'row',
    paddingVertical: 25
  },
  dividerLine: {
    borderBottomColor: 'grey',
    flex: 1,
    borderBottomWidth: 1
  },
  dividerText: {
    marginHorizontal: 10
  },
  otherLogin: {
    flexDirection: 'row'
  },
  facebookLogin: {
    marginRight: 5
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    width: '70%'
  },
  modalTitle: {
    fontWeight: 'bold'
  },
  otpInput: {
    borderBottomWidth: 1,
    marginVertical: 15
  }
});

export default Login;