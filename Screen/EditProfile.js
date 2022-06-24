import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

import ScreenFrame from './Component/ScreenFrame';
import Button from '../Shared/Button';
import { updateProfile } from '../action';
import i18n from '../Translations';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

function EditProfile({ navigation }){
  const user = useSelector(state => state.root.user);
  const code = useSelector(state => state.root.code);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.mobile);
  const [isEditActive, setIsEditActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  i18n.locale = code;

  const { id } = user;

  function handleNameChange(value){
    setName(value);
  }

  function handleEmailChange(value){
    setEmail(value);
  }

  function handlePhoneChange(value){
    setPhoneNumber(value);
  }

  function handleEditToggle(){
    setIsEditActive(state => !state);
  }

  async function handleUpdateProfile(){
    try {
      setLoading(true);
      await axios.post('https://pos.eocambo.com/api/contact/update', {
        id,
        email,
        mobile: phoneNumber,
        name
      });
      dispatch(updateProfile({ name, email, mobile: phoneNumber }));
      navigation.navigate('Me');
      setLoading(false);
    }catch(err){
      console.log(error);
    }
  }

  const contactInfoMarkup = isEditActive ? (
    <View style={ styles.edit }>
      <View>
        <Text>{ i18n.t('editprofile.Name')}</Text>
        <TextInput 
          style={ styles.input } 
          value={ name } 
          onChangeText={ handleNameChange } 
        />
        <Text>{ i18n.t('editprofile.Email') }</Text>
        <TextInput 
          style={ styles.input } 
          value={ email } 
          onChangeText={ handleEmailChange } 
          keyboardType="email-address"
        />
        <Text>{ i18n.t('editprofile.Phone')}</Text>
        <TextInput 
          style={ styles.input } 
          value={ phoneNumber } 
          onChangeText={ handlePhoneChange } 
          keyboardType="phone-pad"
        />
      </View>
      <Button 
        title={ i18n.t('editprofile.Save change') } 
        backgroundColor="#0AA1DD" 
        color="#fff" 
        onAction={ handleUpdateProfile }
      />
    </View>
  ):(
    <View>
      <Text>{ name }</Text>
      <Text>{ email }</Text>
      <Text>{ phoneNumber }</Text>
    </View>
  );

  const editButtonMarkup = isEditActive ? (
    <Entypo name="cross" size={24} color="red" />
  ):(
    <Text style={ styles.boldText }>{ i18n.t('editprofile.Edit') }</Text>
  );

  return (
    <ScreenFrame navigation={ navigation } title={ i18n.t('editprofile.Edit Profile') } loading={ loading }>
      <View style={ styles.editProfileContainer }>
        <View style={ styles.editProfileHeader }>
          <Text style={ styles.boldText }>{ i18n.t('editprofile.Contact info')}</Text>
          <TouchableOpacity onPress={ handleEditToggle }>
            { editButtonMarkup }
          </TouchableOpacity>
        </View>
        { contactInfoMarkup }
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  editProfileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editProfileContainer: {
    flex: 1,
    padding: 20
  },
  boldText: {
    fontWeight: 'bold'
  },
  input: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: 5
  },
  edit: {
    flex: 1,
    justifyContent:'space-between'
  }
});

EditProfile.propTypes = propTypes;

export default EditProfile;