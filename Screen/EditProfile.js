import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import ScreenFrame from './Component/ScreenFrame';
import Button from '../Shared/Button';

const propTypes = {
  navigation: PropTypes.object.isRequired
};

function EditProfile({ navigation }){
  const user = useSelector(state => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [isEditActive, setIsEditActive] = useState(false);

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

  const contactInfoMarkup = isEditActive ? (
    <View style={ styles.edit }>
      <View>
        <Text>Name</Text>
        <TextInput style={ styles.input } value={ name } onChangeText={ handleNameChange } />
        <Text>Email</Text>
        <TextInput 
          style={ styles.input } 
          value={ email } 
          onChangeText={ handleEmailChange } 
          keyboardType="email-address"
        />
        <Text>Phone </Text>
        <TextInput 
          style={ styles.input } 
          value={ phoneNumber } 
          onChangeText={ handlePhoneChange } 
          keyboardType="phone-pad"
        />
      </View>
      <Button title="Save changes" backgroundColor="#0AA1DD" color="#fff" />
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
    <Text style={ styles.boldText }>Edit</Text>
  );

  return (
    <ScreenFrame navigation={ navigation } title="Edit profile">
      <View style={ styles.editProfileContainer }>
        <View style={ styles.editProfileHeader }>
          <Text style={ styles.boldText }>Contact info</Text>
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