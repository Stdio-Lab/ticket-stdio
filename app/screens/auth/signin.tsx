import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

const USERS = [
  { email: "gabrial@gmail.com", password: "Gabrial@123" },
  { email: "tom@gmail.com", password: "Tom@123" },
  { email: "thomas@gmail.com", password: "Thomas@1234" },
];

const Login = () => {

    const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { email: "", password: "", rememberme: false },
  });

  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const validateEmail = (email: string) => {
    // Validación básica de email
    return /\S+@\S+\.\S+/.test(email);
  };

  const onSubmit = (data: any) => {
    // navigation.navigate("Home");
    router.push("/screens/home");
    console.log("PUSH router")

    clearErrors();
    let valid = true;

    if (!data.email) {
      setError("email", { type: "required", message: "Email is required" });
      valid = false;
    } else if (!validateEmail(data.email)) {
      setError("email", { type: "pattern", message: "Email is invalid" });
      valid = false;
    }

    if (!data.password) {
      setError("password", {
        type: "required",
        message: "Password is required",
      });
      valid = false;
    }

    if (!valid) return;

    const user = USERS.find((u) => u.email === data.email);

    if (!user) {
      setValidated({ emailValid: false, passwordValid: true });
      setError("email", { type: "manual", message: "Email not found" });
      return;
    }

    if (user.password !== data.password) {
      setValidated({ emailValid: true, passwordValid: false });
      setError("password", { type: "manual", message: "Password incorrect" });
      return;
    }

    setValidated({ emailValid: true, passwordValid: true });
    alert("Logged in successfully!");
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <View style={styles.formControl}>
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.email ? styles.inputError : undefined,
              ]}
              placeholder="Enter email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="done"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        {!validated.emailValid && (
          <Text style={styles.errorText}>Email ID not found</Text>
        )}
      </View>

      <View style={styles.formControl}>
        <Text>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.password ? styles.inputError : undefined,
                ]}
                placeholder="Enter password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordBtn}
              >
                <Text>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        {!validated.passwordValid && (
          <Text style={styles.errorText}>Password was incorrect</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  formControl: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordBtn: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default Login;
