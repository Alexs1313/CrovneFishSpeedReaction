import {
  View,
  Text,
  TouchableOpacity as CrovneButton,
  Image as CrovneImage,
  ScrollView as CrovneScrollWrap,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLORS } from '../consts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ModeCrovneScreen = () => {
  const navigation = useNavigation();
  const [crovneFishMode, setCrovneFishMode] = useState('solo');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <CrovneScrollWrap
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          style={{
            width: '95%',
            borderRadius: 22,
          }}
        >
          <View
            style={{
              backgroundColor: '#000',
              margin: 1,
              borderRadius: 21,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CrovneButton onPress={() => navigation.goBack()}>
              <CrovneImage
                source={require('../../assets/images/backButton.png')}
              />
            </CrovneButton>

            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
              }}
            >
              Game
            </Text>

            <CrovneImage source={require('../../assets/images/headLogo.png')} />
          </View>
        </LinearGradient>

        <Text
          style={{
            marginTop: 70,
            fontSize: 24,
            fontFamily: 'Montserrat-SemiBold',
            color: '#fff',
          }}
        >
          Choose a mode
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            marginTop: 50,
          }}
        >
          <CrovneButton
            activeOpacity={0.8}
            onPress={() => setCrovneFishMode('solo')}
          >
            <CrovneImage
              source={
                crovneFishMode === 'solo'
                  ? require('../../assets/images/checkedradiobtn.png')
                  : require('../../assets/images/radiobtn.png')
              }
            />
          </CrovneButton>

          <View
            style={{
              width: '76%',
              borderWidth: 1,
              borderColor: '#F5C86B',
              borderRadius: 15,
              paddingVertical: 12,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Solo Mode
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                  color: '#ccc',
                  lineHeight: 18,
                }}
              >
                Test your reaction, improve your results and track your personal
                progress.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            marginTop: 50,
          }}
        >
          <CrovneButton
            activeOpacity={0.8}
            onPress={() => setCrovneFishMode('party')}
          >
            <CrovneImage
              source={
                crovneFishMode === 'party'
                  ? require('../../assets/images/checkedradiobtn.png')
                  : require('../../assets/images/radiobtn.png')
              }
            />
          </CrovneButton>

          <View
            style={{
              width: '76%',
              borderWidth: 1,
              borderColor: '#F5C86B',
              borderRadius: 15,
              paddingVertical: 12,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Party Mode
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                  color: '#ccc',
                  lineHeight: 18,
                }}
              >
                The fish appears for everyone at the same time – the one with
                the fastest reaction wins.
              </Text>
            </View>
          </View>
        </View>

        <CrovneButton
          activeOpacity={0.85}
          style={{
            width: 281,
            marginTop: 130,
            marginBottom: 30,
          }}
          onPress={() =>
            navigation.navigate(
              crovneFishMode === 'solo'
                ? 'GameCrovneScreen'
                : 'PartyGameCrovneScreen',
            )
          }
        >
          <LinearGradient
            colors={GRADIENT_COLORS}
            style={{
              height: 81,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            start={{ x: 0.6, y: 1.8 }}
            end={{ x: 0.7, y: 0 }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
              }}
            >
              Choose
            </Text>
          </LinearGradient>
        </CrovneButton>
      </CrovneScrollWrap>
    </View>
  );
};

export default ModeCrovneScreen;
