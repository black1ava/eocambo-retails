import { View, Text, StyleSheet } from 'react-native';

function MenuList(props){

  return (
    <View>
      <View style={ styles.menu }>
        <Text 
          style={{ 
            ...styles.menuTitle,
            fontWeight: props.fontWeight
          }}
        >
          { props.title }
        </Text>
      </View>
      { props.children }
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  menuTitle: {
    fontSize: 16
  }
});

export default MenuList