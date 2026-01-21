import { ScrollView, View } from 'react-native';

const ScrollWrapper = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default ScrollWrapper;
