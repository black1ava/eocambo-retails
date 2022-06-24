import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element
};

function CustomNavigationTitle({ title, icon }){
  return(
    <View style={ styles.drawerContent }>
      { icon }
      <Text style={ styles.title }>{ title }</Text>
    </View>
  );
}

CustomNavigationTitle.propTypes = propTypes;

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    marginLeft: 8,
    color: '#0AA1DD'
  },
  drawerContent: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default CustomNavigationTitle;