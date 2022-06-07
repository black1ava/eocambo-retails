import { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Component/Header';
import Categories from './Component/Categories';
import PopularProducts from './Component/PopularProduts';
import RecommandedProducts from './Component/RecommandedProducts';
import NavBar from './Component/NavBar';
import { connect } from 'react-redux';
import { toggleHomeMenuActive } from '../action';

function Home(props){

  useEffect(function(){
  props.toggleHomeMenuActive('home');
  }, [props.toggleHomeMenuActive]);

  return (
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
        <NavBar />
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

const mapDispatchToProps = {
  toggleHomeMenuActive
};

function mapStateToProps(state){
  return {
    menus: state.menusActive
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);