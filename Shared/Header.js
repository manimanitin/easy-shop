import { StyleSheet, Image, SafeAreaView } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={style.header}>
      <Image
        source={require('../assets/logo.jpg')}
        resizeMode='contain'
        style={{ height: 50,marginTop:20 }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default Header;
