import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer, useContext } from "react";

type State =
  | { loading: true; username: null; setUsername: null; resetUsername: null }
  | {
      loading: false;
      username: string | null;
      setUsername: ((username: string) => Promise<void>) | null;
      resetUsername: (() => Promise<void>) | null;
    };
type Action =
  | { type: "setUsername"; payload: { username: string; resetUsername: () => Promise<void> } }
  | { type: "setNoUsername"; payload: { setUsername: (username: string) => Promise<void> } };

const UsernameContext = createContext<State>({
  loading: true,
  username: null,
  setUsername: null,
  resetUsername: null,
});

function usernameReducer(_: State, action: Action): State {
  switch (action.type) {
    case "setUsername":
      return {
        loading: false,
        username: action.payload.username,
        setUsername: null,
        resetUsername: action.payload.resetUsername,
      };
    case "setNoUsername":
      return {
        loading: false,
        username: null,
        setUsername: action.payload.setUsername,
        resetUsername: null,
      };
  }
}

export const UsernameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(usernameReducer, {
    loading: true,
    username: null,
    setUsername: null,
    resetUsername: null,
  });

  useEffect(() => {
    async function getUsername() {
      try {
        return await AsyncStorage.getItem("current_username");
      } catch {
        return null;
      }
    }

    async function setUsername(username: string) {
      await AsyncStorage.setItem("current_username", username);
      dispatch({
        type: "setUsername",
        payload: {
          username,
          resetUsername,
        },
      });
    }

    async function resetUsername() {
      await AsyncStorage.removeItem("current_username");
      dispatch({
        type: "setNoUsername",
        payload: {
          setUsername,
        },
      });
    }

    getUsername().then((username) => {
      if (username) {
        setUsername(username);
      } else {
        resetUsername();
      }
    });
  }, []);

  return <UsernameContext.Provider value={state}>{children}</UsernameContext.Provider>;
};

export function useUsername() {
  const context = useContext(UsernameContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an UsernameProvider.");
  }

  return context;
}
