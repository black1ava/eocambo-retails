import { useEffect, createContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Component/Header';
import Categories from './Component/Categories';
import PopularProducts from './Component/PopularProduts';
import RecommandedProducts from './Component/RecommandedProducts';
import NavBar from './Component/NavBar';
import { connect } from 'react-redux';
import { toggleHomeMenuActive, inactivateAllMenus } from '../action';

export const NavigationContext = createContext();

function Home(props){

  useEffect(function(){
    props.inactivateAllMenus();
    props.toggleHomeMenuActive();
  }, [props.toggleHomeMenuActive, props.inactivateAllMenus]);

  return (
    <NavigationContext.Provider value={{ navigation: props.navigation }}>
      <View style={ styles.scrollView }>
        <Header />
        <View style={{ ...styles.scrollView, ...styles.content  }}>
          <ScrollView showsVerticalScrollIndicator={ false }>
            <View>
              <View>
                <Categories />
              </View>
              <View>
                <PopularProducts />
              </View>
              <View>
                <RecommandedProducts />
              </View>
            </View>
          </ScrollView>
          <NavBar navigation={ props.navigation } screenName="home"/>
        </View>
      </View>
    </NavigationContext.Provider>
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
  toggleHomeMenuActive,
  inactivateAllMenus
};

function mapStateToProps(state){
  return {
    menus: state.menusActive
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);