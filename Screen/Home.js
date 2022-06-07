import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Component/Header';
import Categories from './Component/Categories';
import PopularProducts from './Component/PopularProduts';
import RecommandedProducts from './Component/RecommandedProducts';

function Home(){
  return (
    <View style={ styles.scrollView }>
      <Header />
        <ScrollView>
          <View>
            <View style={ styles.content }>
              <Categories />
            </View>
            <View style={ styles.content }>
              <PopularProducts />
            </View>
            <View style={ styles.content}>
              <RecommandedProducts />
            </View>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal:15,
    marginTop: 10
  },
  scrollView: {
    flex: 1
  }
});

export default Home;