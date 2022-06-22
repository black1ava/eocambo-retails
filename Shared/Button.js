import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function Button(props){
  return(
    <TouchableOpacity style={{ ...styles.button, backgroundColor: props.backgroundColor }}>
      <Text style={ styles.buttonTitle }>{ props.title }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5
  },
  buttonTitle: {
    color: '#0AA1DD'
  }
});

export default Button;