import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, StatusBar, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/authContext'; // Added missing import

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomKeyboardView from '../../components/CustomKeyboardView';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth(); // Added missing hook
  const [loading, setLoading] = useState(false);

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', 'Please fill all fields!');
      return;
    }
    
    // Implement login logic
    setLoading(true);
    const result = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    
    if (!result.success) {
      Alert.alert('Sign In', result.msg);
    }
  };

  return (
    <CustomKeyboardView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.innerContainer}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../assets/images/login.png')}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Sign In</Text>

          <View style={styles.inputWrapper}>
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputSection}>
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
            <Text style={styles.forgotText}>Forgot password?</Text>
          </View>

          <View>
            {loading ? (
              <View style={styles.loadingWrapper}>
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.signInButton}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('signUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    gap: 12,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    height: hp(25),
  },
  formContainer: {
    gap: 20,
  },
  headerText: {
    fontSize: hp(4),
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    color: '#1f2937', // Tailwind's text-neutral-800
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Tailwind's bg-neutral-100
    paddingHorizontal: 16,
    borderRadius: 12,
    height: hp(7),
  },
  inputSection: {
    gap: 12,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: '600',
    color: '#374151', // Tailwind's text-neutral-700
  },
  forgotText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    textAlign: 'right',
    color: '#6b7280', // Tailwind's text-neutral-500
  },
  signInButton: {
    backgroundColor: '#6366f1', // Tailwind's bg-indigo-500
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