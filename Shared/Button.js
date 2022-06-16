import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function Button(props){
  return(
    <TouchableOpacity 
      style={{ ...styles.button, backgroundColor: props.backgroundColor }}
      onPress={ props.onAction }
    >
      <Text style={{ ...styles.buttonTitle, color: props.color }}>{ props.title }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonTitle: {
    fontWeight: 'bold'
  }
});

export default Button;