import React from 'react';
import Card from './Card';

function OrderCard({
  status,
  date,
  id,
  name,
  total,
  quantity
}){
  return (
    <Card 
      data={[
        {
          title: '',
          items: [
            {
              name: 'Your order status',
              text: {
                value: status,
              }
            },
            {
              name: 'Date',
              text: {
                value: date
              }
            },
            {
              name: 'ID Number',
              text: {
                value: id,
              }
            },
          ]
        },
        {
          title: 'Order items',
          items: [{
            name: `${ Number(quantity)}x${ name }`,
            text: {
              value: `$${total}.00`,
              color: 'red'
            }
          }]
        },
        {
          title: '',
          items: [
            {
              name: 'Total(US)',
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

export default OrderCard;