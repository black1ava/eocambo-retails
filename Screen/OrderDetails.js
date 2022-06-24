import { View, Text } from 'react-native';
import PropTypes from 'prop-types'; 
import { useSelector } from 'react-redux';

import ScreenFrame from './Component/ScreenFrame';
import Card from './Component/Card';
import i18n from 'i18n-js';

const propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
};

function OrderDetails({ navigation, route }){

  const { status, date, id, products, total } = route.params;
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  return(
    <View style={{ flex: 1 }}>
      <ScreenFrame navigation={ navigation } title={ i18n.t('order.Orders Detail')}>
        <View style={{ flex: 1 }}>
          <Card 
            data={[
              {
                title: '',
                items: [
                  {
                    name: i18n.t('order.Your order status is'),
                    text: {
                      value: status
                    }
                  },
                  {
                    name: 'ID number',
                    text: {
                      value: id
                    }
                  },
                  {
                    name: i18n.t('order.Date'),
                    text: {
                      value: date
                    }
                  }
                ]
              },
              {
                title: i18n.t('order.Order items'),
                items: products.map(function(product){
                  return {
                    name: `${ Number(product.quantity) }x${ product.name }`,
                    text: {
                      value: `$${ Number(product.price) }.00`,
                      color: 'red'
                    }
                  };
                })
              },
              {
                title: '',
                items: [
                  {
                    name: `${ i18n.t('order.Total') }(US)`,
                    text: {
                      value: `$${ Number(total) }.00`,
                      color: 'red'
                    }
                  }
                ]
              }
            ]}
          />
        </View>
      </ScreenFrame>
    </View>
  );
}

OrderDetails.propTypes = propTypes;

export default OrderDetails;