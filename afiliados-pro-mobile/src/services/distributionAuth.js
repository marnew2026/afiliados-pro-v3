import AsyncStorage from "@react-native-async-storage/async-storage";
import distributionApi from "./distributionApi";

const TOKEN_KEY = "distributionToken";
const USER_ID_KEY = "distributionUserId";

export async function loginDistribution(email, password) {
  const { data } = await distributionApi.post("/auth/login", {
    email,
    password,
  });

  if (!data?.token || !data?.user?._id) {
    throw new Error("Login V4 não retornou uma sessão válida.");
  }

  await AsyncStorage.multiSet([
    [TOKEN_KEY, data.token],
    [USER_ID_KEY, String(data.user._id)],
  ]);

  return {
    user: data.user,
    token: data.token,
  };
}

export async function getDistributionSession() {
  const values = await AsyncStorage.multiGet([
    TOKEN_KEY,
    USER_ID_KEY,
  ]);

  const token = values[0][1];
  const userId = values[1][1];

  return {
    authenticated: Boolean(token && userId),
    token,
    userId,
  };
}

export async function logoutDistribution() {
  await AsyncStorage.multiRemove([
    TOKEN_KEY,
    USER_ID_KEY,
  ]);
}