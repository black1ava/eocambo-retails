import { View, Text } from 'react-native';

function ProductDetails(props){

  // console.log(props.route.params.product.source);
  const { product } = props.route.params;

  return(
    <View>
      <Text>Product Details</Text>
    </View>
  );
}

export default ProductDetails;