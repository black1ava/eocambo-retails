import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import i18n from '../../Translations';

const { string, number, array, object } = PropTypes;

const propTypes = {
  status: string,
  data: string,
  id: number,
  product: array,
  total: number,
  navigation: object
};

function OrderCard({
  status,
  date,
  id,
  products,
  total,
  navigation
}){

  const code = useSelector(state => state.root.code);
  i18n.locale = code;

  return (
    <Card 
      touchable
      onPress={ () => navigation.navigate('OrderDetails', { status, date, id, products, total }) }
      data={[
        {
          title: '',
          items: [
            {
              name: i18n.t('order.Your order status is'),
              text: {
                value: status,
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
                value: '',
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
                value: `$${total}.00`,
                color: 'red'
              }
            }
          ]
        }
      ]}
    />
  );
}

OrderCard.propTypes = propTypes;

export default OrderCard;