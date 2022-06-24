import { useState, useEffect } from 'react'; 
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import i18n from '../Translations';

import NavBarScreenFrame from './Component/NavBarScreenFrame';
import { globalStyles } from '../styles/globalStyles';
import OrderCard from './Component/OrderCard';

function Orders(props){

  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fromDrawer = props.route.params?.fromDrawer;
  const user = useSelector(state => state.root.user);
  const orders = useSelector(state => state.root.orders);
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  useEffect(function(){
    
    async function getOrders(){
      try {
        setLoading(true);
        const orderResponse = await axios.get(`https://pos.eocambo.com/api/order/search/${ user.id }`);
        const orders = orderResponse.data.data;
        const orderDetailsResponse = await axios.get(`https://pos.eocambo.com/api/order/searchSpecific/${ user.id }`);
        const orderDetails = orderDetailsResponse.data.data;

        const orderProducts = orders.map(function(order){
          return {
            ...order,
            products: orderDetails.filter(orderDetail => orderDetail.transaction_id === order.id)
          };
        });

        setOrderProducts(orderProducts);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }

    if(user != null){
      getOrders();
    }

  }, [user, orders]);


  const orderScreenMarkup = (
    <FlatList 
      data={ orderProducts }
      renderItem={ ({ item }) => (
        <OrderCard 
          status={ item.status } 
          date={ item.created_at } 
          products={ item.products }
          id={ item.id } 
          total={ Number(item.total_before_tax) } 
          navigation={ props.navigation }
        />
      )}
      keyExtractor={ order => order.id }
    />
  );

  return(
    <NavBarScreenFrame 
      navigation={ props.navigation } 
      screenName="orders" 
      loading={ loading }
      showNavbar={ !fromDrawer }
      title={ i18n.t('order.Your Orders') }
    >
      { orderProducts.length > 0 ? orderScreenMarkup : (
        <View style={ globalStyles.center}>
          <Text style={ globalStyles.title }>{ i18n.t('order.No order history yet')}</Text>
        </View>
      ) }
    </NavBarScreenFrame>
  );
}

export default Orders;