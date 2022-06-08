import { View } from 'react-native';
import ScreenFrame from './Component/ScreenFrame';

function Cart(props){
  return(
    <View>
      <ScreenFrame navigation={ props.navigation } title="Your cart"  hasSearch />
    </View>
  );
}

export default Cart;