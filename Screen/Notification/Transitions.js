import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles'

function Transitions(){
  return (
    <View style={ globalStyles.content }>
      <View style={ globalStyles.center }>
        <Text style={{ ...globalStyles.title, ...globalStyles.textBold }}>
          No notifications
        </Text>
      </View>
    </View>
  );
}

export default Transitions;