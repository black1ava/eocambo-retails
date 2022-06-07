import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import NavBar from './Component/NavBar';

function Orders(props){
  return(
    <View style={ globalStyles.content }>
      <View style={ globalStyles.center}>
        <Text style={ globalStyles.title }>No order history yet</Text>
      </View>
      <NavBar navigation={ props.navigation } screenName="orders"/>
    </View>
  );
}

export default Orders;