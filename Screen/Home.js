import { View, StyleSheet, ScrollView } from 'react-native';

import Header from './Component/Header';
import Categories from './Component/Categories';
import PopularProducts from './Component/PopularProduts';
import RecommandedProducts from './Component/RecommandedProducts';
import NavBar from './Component/NavBar';


function Home(props){

  return (
    <View style={ styles.scrollView }>
      <Header navigation={ props.navigation }/>
      <View style={{ ...styles.scrollView, ...styles.content  }}>
        <ScrollView showsVerticalScrollIndicator={ false }>
          <View>
            <View>
              <Categories />
            </View>
            <View>
              <PopularProducts navigation={ props.navigation }/>
            </View>
            <View>
              <RecommandedProducts />
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

export default Home;