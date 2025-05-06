import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, StatusBar, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { Feather, Octicons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/authContext'; // Added missing import

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomKeyboardView from '../../components/CustomKeyboardView';

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const profileRef = useRef('');

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign Up', 'Please fill all fields!');
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    setLoading(false);

    console.log("got result:", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }

    // Proceed with registration logic here
  };

  return (
    <CustomKeyboardView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.innerContainer}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../assets/images/register.png')}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Sign Up</Text>

          <View style={styles.inputWrapper}>
            <Feather name="user" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (usernameRef.current = value)}
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Octicons name="lock" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (passwordRef.current = value)}
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign name="link" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (profileRef.current = value)}
              style={styles.input}
              placeholder="Profile url"
              placeholderTextColor="gray"
            />
          </View>

          <View>
            {loading ? (
              <View style={styles.loadingWrapper}>
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleRegister} style={styles.signInButton}>
                <Text style={styles.signInText}>Sign Up</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('signin')}>
              <Text style={styles.signUpLink}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: hp(7),
    paddingHorizontal: wp(5),
    gap: 12,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    height: hp(20),
  },
  formContainer: {
    gap: 20,
  },
  headerText: {
    fontSize: hp(4),
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    color: '#1f2937',
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    borderRadius: 12,
    height: hp(7),
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: '600',
    color: '#374151',
  },
  signInButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(6.5),
    marginTop: 10,
  },
  signInText: {
    fontSize: hp(2.7),
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  loadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#6b7280',
  },
  signUpLink: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: '#6366f1',
  },
});