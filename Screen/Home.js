import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { usePreventScreenCapture } from 'expo-screen-capture'

import Header from './Component/Header';
import Categories from './Component/Categories';
import NavBar from './Component/NavBar';
import Products from './Component/Products';
import { addProducts, setUser, setCompanyInfo, setPromotions, setOrderType, setSlides } from '../action';
import * as Firebase from '../firebase'
import NavBarScreenFrame from './Component/NavBarScreenFrame';
import i18n from '../Translations';
import HomeSlide from './Component/HomeSlide';


function Home(props){
  const [popularProducts, setPopularProducts] = useState([]);
  const [recommandedProducts, setRecommandedProducts] = useState([]);
  const [numberProductsInCart, setNumberProductsInCart] = useState(0);
  const [categories, setCategories] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  i18n.locale = props.code;

  usePreventScreenCapture();

  useEffect(function(){
    onAuthStateChanged(Firebase.auth, async function(user){
      let uid = user === null ? 0 : user.providerData[0].uid;
      if(user !== null){       
        try {
          setLoading(true);
          const response = await axios.get(`https://pos.eocambo.com/api/customer/search/16/${ uid }`);
          const _user  = response.data.data[0];
          props.setUser(_user);
        }catch(error){
          console.log(error)
        }finally{
          setLoading(false);
        }
      }else{
        props.setUser(null);
      }

      await SplashScreen.preventAutoHideAsync();
      const response = await axios.get(`https://pos.eocambo.com/api/products/${ uid }/16`);
      const { products, category } = response.data;

      props.addProducts(products.filter(product => product.price > 0).map(function(product){
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

      const companyInfoResponse = await axios.get('https://pos.eocambo.com/api/company/search/16');
      props.setCompanyInfo(companyInfoResponse.data.data[0]);

      const _response = await axios.get('https://pos.eocambo.com/api/discount/search/16');
      const { data } = _response;
      const promotions = [];
      for(const key in data){
        const { 
          id, 
          name, 
          image_url, 
          created_at, 
          starts_at, 
          ends_at, 
          is_active, 
          discount_amount,
          discount_type,
          description
        } = data[key];
        if(key !== 'success'){
          promotions.push({
            id, 
            name, 
            image: image_url || 'https://pos.eocambo.com/img/default.png', 
            created_at, 
            starts_at, 
            ends_at, 
            is_active, 
            discount_amount,
            discount_type,
            description
          });
        }
      }

      props.setPromotions(promotions);

      const slidesResponse = await axios.get('https://pos.eocambo.com/api/slider/search/16');
      const slides = slidesResponse.data;
      const _slides = [];
      for(let key in slides){
        if(key !== 'success'){
          _slides.push(slides[key].image);
        }
      }

      props.setSlides(_slides);

      const orderTypeResponse = await axios.get('https://pos.eocambo.com/api/ordertype/search/16');
      const orderType = orderTypeResponse.data.map(function(orderType){
        return {
          id: orderType.id,
          name: orderType.name
        }
      });

      props.setOrderType(orderType);
      setApiLoaded(true);
    });
  }, [
    props.addProducts, 
    props.setUser, 
    onAuthStateChanged, 
    props.setPromotions, 
    props.loginAttempt,
    props.setOrderType
  ]);

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
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ height: '100%', width: '100%' }} source={ require('./SplashScreen/splash.png') } />
      </View>
    );
  }

  return (
    <View onLayout={ handleLayout } style={ styles.scrollView }>
      <NavBarScreenFrame navigation={ props.navigation } showNavbar screenName="home" loading={ loading }>
        <Header navigation={ props.navigation } numberInCart={ numberProductsInCart}/>
        <View style={{ ...styles.scrollView, ...styles.content  }}>
          <ScrollView showsVerticalScrollIndicator={ false }>
            <View style={ styles.scrollView }>
              <View>
                <HomeSlide images={ props.slides } />
              </View>
              <View>
                <Categories categories={ categories } navigation={ props.navigation } />
              </View>
              <View>
                <Products title={ i18n.t('home.Popular Products') } products={ popularProducts } navigation={ props.navigation }/>
              </View>
              <View>
              <Products title={ i18n.t('home.Recommanded Products') } products={ recommandedProducts } navigation={ props.navigation }/>
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
    marginHorizontal: 15,
    marginVertical: 15
  },
  scrollView: {
    flex: 1,
  }
});

const mapDispatchToProps = {
  addProducts,
  setUser,
  setCompanyInfo,
  setPromotions,
  setOrderType,
  setSlides
};

function mapStateToProps(state){
  return {
    products: state.root.products,
    productsInCart: state.root.productsInCart,
    promotions: state.root.promotions,
    loginAttempt: state.root.loginAttempt,
    code: state.root.code,
    slides: state.root.slides
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);