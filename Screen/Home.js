import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './Component/Header';
import Categories from './Component/Categories';
import NavBar from './Component/NavBar';
import Products from './Component/Products';
import { addProducts, setUser, setCompanyInfo } from '../action';
import * as Firebase from '../firebase'
import NavBarScreenFrame from './Component/NavBarScreenFrame';


function Home(props){
  const [popularProducts, setPopularProducts] = useState([]);
  const [recommandedProducts, setRecommandedProducts] = useState([]);
  const [numberProductsInCart, setNumberProductsInCart] = useState(0);
  const [categories, setCategories] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(function(){

    onAuthStateChanged(Firebase.auth, async function(user){
      props.setUser(user);

      await SplashScreen.preventAutoHideAsync();
      const response = await axios.get('https://pos.eocambo.com/api/products/0/62');
      const { products, category } = response.data;

      props.addProducts(products.map(function(product){
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          categoryId: product.category_id,
          favorite: product.is_favorites,
          popular: product.is_popular,
          recommend: product.is_recommend,
          description: product.description,
          uri: product.image === null ? 'https://pos.eocambo.com/img/default.png' : `https://pos.eocambo.com/uploads/img/${ product.image }`
        };
      }));

      setCategories(category.filter(function(c){
        return products.filter(function(product){
          return product.category_id === c.id;
        }).length > 0;
      }).map(function(c){
        return {
          id: c.id,
          name: c.name,
          uri: c.image_url
        };
      }));

      const companyInfoResponse = await axios.get('https://pos.eocambo.com/api/company/search/62');
      props.setCompanyInfo(companyInfoResponse.data.data[0]);

      setApiLoaded(true);
    });

  }, [props.addProducts, props.setUser, onAuthStateChanged]);

  useEffect(function(){
    setPopularProducts(props.products.filter(function(product){
      return product.popular === 1;
    }));

    setRecommandedProducts(props.products.filter(function(product){
      return product.recommend === 1;
    }));
  }, [props.products]);

  useEffect(function(){
    setNumberProductsInCart(props.productsInCart.filter(product => !product.order).length); 
  }, [props.productsInCart]);
  
  const handleLayout = useCallback(async function(){
    if(apiLoaded){
      await SplashScreen.hideAsync();
    }
  }, [apiLoaded]);

  if(!apiLoaded){
    return null;
  }

  return (
    <View onLayout={ handleLayout } style={ styles.scrollView }>
      <NavBarScreenFrame navigation={ props.navigation } showNavbar screenName="home">
        <Header navigation={ props.navigation } numberInCart={ numberProductsInCart}/>
        <View style={{ ...styles.scrollView, ...styles.content  }}>
          <ScrollView showsVerticalScrollIndicator={ false }>
            <View style={ styles.scrollView }>
              <View>
                <Categories categories={ categories } navigation={ props.navigation } />
              </View>
              <View>
                <Products title="Popular Products" products={ popularProducts } navigation={ props.navigation }/>
              </View>
              <View>
              <Products title="Recommanded Products" products={ recommandedProducts } navigation={ props.navigation }/>
              </View>
            </View>
          </ScrollView>
        </View>
      </NavBarScreenFrame>
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

const mapDispatchToProps = {
  addProducts,
  setUser,
  setCompanyInfo
};

function mapStateToProps(state){
  return {
    products: state.products,
    productsInCart: state.productsInCart
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);