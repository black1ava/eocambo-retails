import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';

import i18n from '../../Translations';

function Promotions(){

  const code = useSelector(state => state.root.code);
  i18n.locale = code;

  return (
    <View style={ globalStyles.content }>
      <View style={ globalStyles.center }>
        <Text style={{ ...globalStyles.title, ...globalStyles.textBold }}>
          { i18n.t('notification.No notification') }
        </Text>
      </View>
    </View>
  );
}

export default Promotions;