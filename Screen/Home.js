import { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Header from './Component/Header';
import Categories from './Component/Categories';
import NavBar from './Component/NavBar';
import Products from './Component/Products';


function Home(props){
  const [popularProducts, setPopularProducts] = useState([]);
  const [recommandedProducts, setRecommandedProducts] = useState([]);

  useEffect(function(){
    setPopularProducts(props.products.filter(function(product){
      return (
        product.name === 'Online Retail App' ||
        product.name === 'Online Mini Mart' ||
        product.name === 'Online Travel Agency' ||
        product.name === 'Online Electronic Store' ||
        product.name === 'Online Jewelry Store'
      );
    }));

    setRecommandedProducts(props.products.filter(function(product){
      return (
        product.name === 'Online Retail App' ||
        product.name === 'Online Mini Mart' ||
        product.name === 'Furniture Online Store' ||
        product.name === 'Fashion Design and Shopping App' ||
        product.name === 'Parking App'
      );
    }));
  }, [props.products]);

  return (
    <View style={ styles.scrollView }>
      <Header navigation={ props.navigation }/>
      <View style={{ ...styles.scrollView, ...styles.content  }}>
        <ScrollView showsVerticalScrollIndicator={ false }>
          <View style={ styles.scrollView }>
            <View>
              <Categories navigation={ props.navigation } />
            </View>
            <View>
              <Products title="Popular Products" products={ popularProducts } navigation={ props.navigation }/>
            </View>
            <View>
            <Products title="Recommanded Products" products={ recommandedProducts } navigation={ props.navigation }/>
            </View>
          </View>
        </ScrollView>
        <NavBar navigation={ props.navigation } screenName="home"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: '100%',
    marginHorizontal: 15
  },
  scrollView: {
    flex: 1,
  }
});

function mapStateToProps(state){
  return {
    products: state.products
  };
}

export default connect(mapStateToProps)(Home);