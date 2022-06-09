import { View } from 'react-native';
import ScreenFrame from './Component/ScreenFrame';

function Cart(props){
  return(
    <View>
      <ScreenFrame navigation={ props.navigation } title="Cart"  hasSearch>
        
      </ScreenFrame>
    </View>
  );
}

export default Cart;