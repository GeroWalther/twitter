import { useSegments, useRouter } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (newToken: string) => void;
  updateAuthToken: (newToken: string, newDate: string) => void;
}
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  setAuthToken: (newToken: string) => {},
  updateAuthToken: (newToken: string, newDate: string) => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [validAuthToken, setValidAuthToken] = useState<string>("");
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (new Date(validAuthToken) < new Date()) {
      console.log("validate: ", validAuthToken);
      setAuthToken(null);
      setValidAuthToken("");
    }
  }, [validAuthToken]);

  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";
    console.log("inside authgroup: ", authToken);
    console.log("inside authgroup2: ", validAuthToken);

    if (!authToken && !isAuthGroup) {
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync("authToken");
      const res2 = await SecureStore.getItemAsync("validEx");
      if (res) {
        setAuthToken(res);
      }
      if (res2) {
        setValidAuthToken(res2);
      }
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string, newDate: string) => {
    const res = await SecureStore.setItemAsync("validEx", newDate);
    console.log("res: ", res);
    await SecureStore.setItemAsync("authToken", newToken);
    setAuthToken(newToken);
    setValidAuthToken(newDate);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
