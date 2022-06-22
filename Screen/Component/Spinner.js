import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  visible: PropTypes.bool
};


function Spinner({ visible }){

  const spinnerMarkup = (
    <View style={ styles.loadingScreen }>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
  
  return (
    <>
      {
        visible && spinnerMarkup
      }
    </>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Spinner.propTypes = propTypes;

export default Spinner;