import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

function SearchButton({ title, onAction }){
  return(
    <TouchableOpacity style={ styles.searchField } onPress={ onAction }>
      <AntDesign style={{ ...styles.searchPlaceholder, marginRight: 10 }} name="search1" size={24} color="black" />
      <Text style={ styles.searchPlaceholder }>{ title }</Text>
    </TouchableOpacity>
  );
}

SearchButton.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func
};

const styles = StyleSheet.create({
  searchField: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchPlaceholder: {
    opacity: 0.3
  }
});

export default SearchButton;