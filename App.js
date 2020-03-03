import React, { useState } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Button } from 'react-native';

import Sodium from 'react-native-sodium';

const m = 'Hello World';
const App = () => {
  const [keyPair, setKeyPair] = useState({ sk: '', pk: '' });
  const [ranbomBytes, setRandomBytes] = useState('');
  const [message, setMessage] = useState(m);

  const publicKey = 'pvvdMhoILo2YNxQ1MnxtQlOKTR1jZV0I=';

  React.useEffect(() => {
    handleSobium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSobium = async () => {
    try {
      const key = await Sodium.crypto_box_keypair();
      setKeyPair(key);
      const nonce = await Sodium.randombytes_buf(Sodium.crypto_box_NONCEBYTES);
      setRandomBytes(nonce);
      const cryptoMessage = await Sodium.crypto_box_easy(message, nonce, publicKey, key.sk);
      setMessage(cryptoMessage);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <View style={styles.body}>
      <Text>{`Public Key: ${keyPair.pk || 'loading'}`}</Text>
      <Text>{`Nonce: ${ranbomBytes || 'loading'}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
