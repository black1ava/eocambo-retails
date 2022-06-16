import { View, Text } from 'react-native';

import NavBarScreenFrame from './Component/NavBarScreenFrame';
import { globalStyles } from '../styles/globalStyles';

function Orders(props){

  const fromDrawer = props.route.params?.fromDrawer;

  return(
    <NavBarScreenFrame 
      navigation={ props.navigation } 
      screenName="orders" 
      showNavbar={ !fromDrawer }
      title="My orders"
    >
      <View style={ globalStyles.center}>
        <Text style={ globalStyles.title }>No order history yet</Text>
      </View>
    </NavBarScreenFrame>
  );
}

export default Orders;