import { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheet } from 'react-native-btr';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';

import Card from './Component/Card';
import ScreenFrame from './Component/ScreenFrame';


function Checkout(props){
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [payByCash, setPayBayCash] = useState(true);

  const productsInCart = useSelector(state => state.productsInCart);
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.user);
  const total = useSelector(state => state.total);
  const [loading, setLoading] = useState(false);

  const _productsInCart = productsInCart.filter(function(productInCart){
    return !productInCart.order;
  });

  const dispatch = useDispatch();

  const userInfo = [
    {
      key: 'Name',
      value: user.name || user.name
    },
    {
      key: 'Phone number',
      value: user.mobile || ''
    },
    {
      key: 'Email',
      value: user.email || ''
    }
  ];

  const userInfoItemsMarkUp = userInfo.map(function(info){
    return {
      name: info.key,
      text: {
        value: info.value,
        color: 'black'
      }
    };
  });

  function handleBottomSheetVisible(){
    setBottomSheetVisible(state => !state);
  }

  function handlePayByCashPress(){
    setPayBayCash(true);
  }

  function handlePayByCardPress(){
    setPayBayCash(false);
  }

  async function handleNavigateToOrder(){
    setLoading(true);

    const date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

    const _products = productsInCart.map(function(productInCart){
      const product = products.find(product => product.id === productInCart.productId);
      product.variation_id = productInCart.variations_id;
      product.quantity = productInCart.amount;
      product.unit_price = parseInt(product.price);
      product.unit_price_before_discount = parseInt(product.price);
      product.product_id = product.id;
      return {
        "children_type": "combo",
        "created_at": date,
        "discount_id": "",
        "item_tax": "0",
        "line_discount_amount": 0,
        "line_discount_type": "",
        "lot_no_line_id": "",
        "parent_sell_line_id": "",
        "product_id": product.id,
        "quantity": productInCart.amount,
        "quantity_returned": "0",
        "res_line_order_status": "",
        "res_service_staff_id": "",
        "sell_line_note": null,
        "sub_unit_id": "",
        "tax_id": "",
        "unit_price": parseInt(product.price),
        "unit_price_before_discount": parseInt(product.price),
        "unit_price_inc_tax": parseInt(product.price),
        "updated_at": date,
        "variation_id": productInCart.variations_id,
        "woocommerce_line_items_id": ""
      };
    });

    function guidGenerator() {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(10).substring(1);
      };
      return S4() + S4();
    }
    
    try {
      await axios.post('https://pos.eocambo.com/api/checkout', {
      "additional_notes": "",
      "business_id": "16",
      "buy_for_other_id": "",
      "cash_register_id": "1",
      "commission_agent": "",
      "contact_id": user.id,
      "coupon_id": 0,
      "created_at": date,
      "created_by": "42",
      "customer_group_id": "",
      "delivered_to": "",
      "delivery_fee_by_point": 50,
      "discount_amount": "0",
      "discount_type": "percentage",
      "essentials_amount_per_unit_duration": "0",
      "essentials_duration": "0",
      "exchange_rate": "1",
      "extraOption": [],
      "final_total": total,
      "import_batch": "",
      "import_time": "",
      "invoice_no": `Yoopec-${ guidGenerator() }`,
      "is_buy_for_other": 0,
      "is_created_from_api": "0",
      "is_direct_sale": "0",
      "is_quotation": "0",
      "is_recurring": "0",
      "is_suspend": "0",
      "latitude": 0,
      "location_id": "17",
      "longitude": 0,
      "order_addresses": "",
      "packing_charge": 0,
      "packing_charge_type": "",
      "pay_method": "wallet",
      "pay_term_number": "",
      "pay_term_type": "",
      "payment_image": null,
      "payment_status": "paid",
      "products": _products,
      "recur_interval": "",
      "recur_interval_type": "days",
      "recur_repetitions": "0",
      "ref_no": "",
      "round_off_amount": total,
      "rp_earned": "0",
      "rp_redeemed": 0,
      "rp_redeemed_amount": 0,
      "selling_price_group_id": "0",
      "service_custom_field_1": "",
      "service_custom_field_2": "",
      "service_custom_field_3": "",
      "service_custom_field_4": "",
      "shipping_address": "",
      "shipping_charges": "0",
      "shipping_details": "",
      "shipping_status": "",
      "staff_note": "",
      "status": "draft",
      "sub_type": "",
      "subscription_no": "",
      "subscription_repeat_on": "",
      "tax_amount": "0",
      "tax_id": "",
      "total_before_tax": total,
      "transaction_date": date,
      "transaction_type": "sell",
      "type": "sell",
      "types_of_service_id": 16,
      "updated_at": date
    });

    dispatch({ type: 'ORDER_PRODUCTS_IN_CART' });
    setLoading(false);
    props.navigation.navigate('Orders');
    }catch(err){
      console.log(err);
    }

  }

  const checkOutProducts = _productsInCart.map(function(productInCart){
    return {
      ...productInCart,
      product: products.find(product => product.id === productInCart.productId)
    }
  });

  const productItems = checkOutProducts.map(function(product){
    return {
      name: `${ product.amount}x ${ product.product.name }`,
      text: {
        value: `$${ parseInt(product.product.price * product.amount) }.00`,
        color: 'red'
      }
    }
  });

  const payByCashRadioButton = payByCash ? (
    <Ionicons name="radio-button-on" size={24} color="#0AA1DD" />
  ) : (
    <Ionicons name="radio-button-off" size={24} color="#0AA1DD" onPress={ () => alert('hi') } />
  );

  const payByCardRadioButton = payByCash ? (
    <Ionicons name="radio-button-off" size={24} color="#0AA1DD" />
  ) : (
    <Ionicons name="radio-button-on" size={24} color="#0AA1DD" onPress={ () => alert('hi') } />
  );


  return (
    <View>
      <ScreenFrame title="Check-Out" navigation={ props.navigation } loading={ loading }>
        <View style={{ flex: 1 }}>
          <Card 
            onBottomSheetToggle={ handleBottomSheetVisible }
            bottomSheetActive={ bottomSheetVisible }
            data={[
              {
                title: 'Your order item',
                items: productItems
              },
              {
                title: 'Customer info',
                items: userInfoItemsMarkUp
              },
              {
                title: '',
                items: [
                  {
                    name: 'Delivery fee',
                    text: {
                      value: '$2.00',
                      color: 'red'
                    }
                  },
                  {
                    name: 'Total(US)',
                    text: {
                      value: `$${ parseInt(total) + 2}.00`,
                      color: 'red',
                    },
                  }
                ]
              },
              {
                title: 'Payment method',
                items: [
                  {
                    name: payByCash ? 'Pay by cash' : 'Pay by card',
                    text: {
                      value: `$${ parseInt(total) + 2}.00`,
                      color: 'red',
                      dropdown: true
                    }
                  }
                ]
              }
            ]}
          />
          <View style={ styles.buttonContainer }>
            <TouchableOpacity style={ styles.button } onPress={ handleNavigateToOrder }>
              <Text style={ styles.buttonText }>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenFrame>
      <BottomSheet 
        visible={ bottomSheetVisible } 
        onBackdropPress={ handleBottomSheetVisible }
        onBackButtonPress={ handleBottomSheetVisible }
      >
        <View style={ styles.bottomSheet }>
          <TouchableOpacity onPress={ handlePayByCashPress }>
            <View style={ styles.paymentSelection }>
              <View style={ styles.payment }>
                <Ionicons style={ styles.paymentIcon } name="cash-outline" size={24} color="black" />
                <View>
                  <Text style={ styles.paymentText }>Pay by cash</Text>
                  <Text>Give cash to our cashier</Text>
                </View>
              </View>
              { payByCashRadioButton }
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ handlePayByCardPress }>
            <View style={ styles.paymentSelection }>
              <View style={ styles.payment }>
                <AntDesign style={ styles.paymentIcon } name="creditcard" size={24} color="black" />
                <View>
                  <Text style={ styles.paymentText }>Pay by card</Text>
                  <Text>Give online</Text>
                </View>
              </View>
              { payByCardRadioButton }
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentIcon: {
    marginRight: 10
  },
  paymentText: {
    fontSize: 17
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#0AA1DD',
    width: '65%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'white',
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  }
});

export default Checkout;