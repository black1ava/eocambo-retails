import { useState, useEffect } from 'react'; 
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

import NavBarScreenFrame from './Component/NavBarScreenFrame';
import { globalStyles } from '../styles/globalStyles';
import OrderCard from './Component/OrderCard';

function Orders(props){

  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fromDrawer = props.route.params?.fromDrawer;
  const user = useSelector(state => state.user);

  useEffect(function(){
    
    async function getOrders(){
      try {
        setLoading(true);
        const response = await axios.get(`https://pos.eocambo.com/api/order/searchSpecific/${ user.id }`);
        const _response = await axios.get(`https://pos.eocambo.com/api/order/search/${ user.id }`);
        const { data } = response.data;
        const _data = _response.data.data;
        
        if(data !== [] && _data !== []){
          data.forEach((d, i) => {
            d.date = _data[i]?.created_at;
            d.status = _data[i]?.status;
          });
        }

        console.log("data", data);
        setOrderProducts(data);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }

    getOrders();

  }, []);


  const orderScreenMarkup = (
    <FlatList 
      data={ orderProducts }
      renderItem={ ({ item }) => (
        <OrderCard 
          status={ item.status } 
          date={ item.date } 
          quantity={ item.quantity }
          id={ item.transaction_id } 
          name={ item.name } 
          total={ Number(item.price) * Number(item.quantity) } 
        />
      )}
      keyExtractor={ product => product.transaction_id }
    />
  );

  return(
    <NavBarScreenFrame 
      navigation={ props.navigation } 
      screenName="orders" 
      loading={ loading }
      showNavbar={ !fromDrawer }
      title="My orders"
    >
      { orderProducts.length > 0 ? orderScreenMarkup : (
        <View style={ globalStyles.center}>
          <Text style={ globalStyles.title }>No order history yet</Text>
        </View>
      ) }
    </NavBarScreenFrame>
  );
}

export default Orders;