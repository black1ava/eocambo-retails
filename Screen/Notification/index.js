import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Promotions from './Promotions';
import Transitions from './Transitions';
import ScreenFrame from '../Component/ScreenFrame';

function Notification({ navigation }){
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <ScreenFrame 
        title="Notifications" 
        navigation={ navigation } 
        backgroundColor='white'
      >
        <TabView 
          navigationState={{
            index,
            routes: [
              { key: 'promotions', title: 'Promotions' },
              { key: 'transitions', title: 'Transitions' }
            ]
          }}
          renderScene={ SceneMap({
            promotions: Promotions,
            transitions: Transitions
          }) }
          onIndexChange={ setIndex }
          initialLayout={ layout.width }
        />
      </ScreenFrame>
      </View>
  );
}

export default Notification;