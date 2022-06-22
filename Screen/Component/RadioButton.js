import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function RadioButton({ title, active, onAction }){

  const radioButtonMarkup = (
    active ? (
      <Ionicons name="radio-button-on" size={ 24 } color="#0AA1DD" />
    ) : (
      <Ionicons name="radio-button-off" size={ 24 } color="#0AA1DD" />
    )
  );

  return(
    <View>
      <TouchableOpacity onPress={ onAction }>
        <View style={ styles.radioButton }>
          <Text>{ title }</Text>
          { radioButtonMarkup }
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});

RadioButton.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onAction: PropTypes.func
}

export default RadioButton