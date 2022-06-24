import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.element
};

function Modal({ active, children }){

  const modalMarkup = (
    <View style={ styles.modal }>
      <View style={ styles.modalContent }>
        { children }
      </View>
    </View>
  );

  return (
    <View>
      { active && modalMarkup }
    </View>
  );
}

Modal.propTypes = propTypes;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8
  }
});

export default Modal;