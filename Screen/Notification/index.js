import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useSelector } from 'react-redux';

import Promotions from './Promotions';
import Transitions from './Transitions';
import ScreenFrame from '../Component/ScreenFrame';
import i18n from '../../Translations';

function Notification({ navigation }){
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  return (
    <View style={{ flex: 1 }}>
      <ScreenFrame 
        title={ i18n.t('settings.Notifications') } 
        navigation={ navigation } 
        backgroundColor='white'
      >
        <TabView 
          navigationState={{
            index,
            routes: [
              { key: 'promotions', title: i18n.t('promotion.Promotion') },
              { key: 'transitions', title: i18n.t('notification.Transitions') }
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