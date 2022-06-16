import { View, Text } from 'react-native';

import { globalStyles } from '../styles/globalStyles';
import NavBarScreenFrame from './Component/NavBarScreenFrame';


function Promotions(props){

  const fromDrawer = props.route.params?.fromDrawer;

  return(
    <NavBarScreenFrame navigation={ props.navigation } title="Promotions" screenName="promotions" showNavbar={ !fromDrawer }>
      <View style={ globalStyles.center}>
        <Text style={ globalStyles.title }>Empty</Text>
      </View>
    </NavBarScreenFrame>
  );
}

export default Promotions;