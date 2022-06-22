import { View } from 'react-native';
import MenuList from './MenuList';
import MenuItem from './MenuItem';

export { 
  MenuList,
  MenuItem
};

function SettingsMenu(props){
  return (
    <View>
      { props.children }
    </View>
  );
}

export default SettingsMenu;