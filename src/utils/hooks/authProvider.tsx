import React, { createContext, useContext, useEffect, useState } from "react";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";

import { API } from "../../api/api";
import { loginRequest } from "../config/msalConfig";

type RoleType = "flor" | "eva" | "extensionista" | string;

interface UserProps {
  roles: RoleType[];
  authenticated?: boolean;
  email: string;
  name: string;
}

interface AuthContextProps {
  loading: boolean;
  user: UserProps;
  error: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void;
  onLogin: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

const INITIAL_STATE = {
  name: "",
  roles: ["eva"],
  accessToken: "",
  email: "",
} as UserProps;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [user, setUser] = useState<UserProps>(INITIAL_STATE);

  const initializeSignIn = () => {
    instance.loginRedirect(loginRequest);
  };

  const sleep = (delay: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  const onLogin = async () => {
    try {
      initializeSignIn();
    } catch (er) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getTokenSilent = async () => {
    try {
      const { idToken } = await instance.acquireTokenSilent({
        account: accounts[0],
        scopes: ["User.Read"],
      });
      await sleep(1000);

      API.defaults.headers.Authorization = `Bearer ${idToken}`;
      API.defaults.headers.idToken = idToken;
      setLoading(false);
      return idToken;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const account = accounts[0];

        if (isAuthenticated) {
          await getTokenSilent();

          setUser((prev: UserProps) => {
            return {
              ...prev,
              authenticated: true,
              name: account.name ?? "",
              email: account.username,
              roles: user.roles ?? [],
            };
          });
        } else if (inProgress === "none" && !accounts.length) {
          onLogin();
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, isAuthenticated, inProgress, accounts]);

  const context = {
    loading,
    error,
    onLogin,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
