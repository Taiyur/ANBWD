import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "APP_USERS";

export const registerUser = async (user: any) => {
  const existing = await AsyncStorage.getItem(USERS_KEY);
  const users = existing ? JSON.parse(existing) : [];

  const alreadyExists = users.find((u: any) => u.email === user.email);

  if (alreadyExists) {
    throw new Error("User already exists");
  }

  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = async (email: string, password: string) => {
  const existing = await AsyncStorage.getItem(USERS_KEY);
  const users = existing ? JSON.parse(existing) : [];

  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
};
const CURRENT_USER = "CURRENT_USER";

export const saveLoggedInUser = async (user: any) => {
  await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
};

export const getLoggedInUser = async () => {
  const user = await AsyncStorage.getItem(CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem(CURRENT_USER);
};

