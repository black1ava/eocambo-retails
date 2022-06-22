import { NavigationContainer } from '@react-navigation/native';

// import DrawerNavigation from './DrawerNavigation';
import StackNavigation from './StackNavigation';

function Navigation(){
  return(
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default Navigation;