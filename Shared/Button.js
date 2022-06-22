import PropTypes from 'prop-types'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function Button({ backgroundColor, onAction, title, color }){
  return(
    <TouchableOpacity 
      style={{ ...styles.button, backgroundColor }}
      onPress={ onAction }
    >
      <Text style={{ ...styles.buttonTitle, color }}>{ title }</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  onAction: PropTypes.func,
  title: PropTypes.string.isRequired,
  color: PropTypes.string
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonTitle: {
    fontWeight: 'bold'
  }
});

export default Button;