import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer, useContext } from "react";

type State = {
  loading: boolean;
  favorites: string[];
  addFavorite: (username: string) => Promise<void>;
  removeFavorite: (username: string) => Promise<void>;
};

type Action =
  | {
      type: "setLoaded";
      payload: {
        favorites: string[];
      };
    }
  | {
      type: "addFavorite";
      payload: {
        username: string;
      };
    }
  | {
      type: "removeFavorite";
      payload: {
        username: string;
      };
    };

const FavoritesContext = createContext<State>({
  loading: true,
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
});

function favoritesReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setLoaded":
      return {
        ...state,
        loading: false,
        favorites: action.payload.favorites,
      };
    case "addFavorite":
      return {
        ...state,
        favorites: state.favorites.concat([action.payload.username]),
      };
    case "removeFavorite":
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav !== action.payload.username),
      };
  }
}

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    loading: true,
    favorites: [],
    addFavorite,
    removeFavorite,
  });

  async function addFavorite(username: string) {
    dispatch({ type: "addFavorite", payload: { username } });
  }

  async function removeFavorite(username: string) {
    dispatch({ type: "removeFavorite", payload: { username } });
  }

  useEffect(() => {
    async function getFavorites() {
      try {
        return (await AsyncStorage.getItem("@favorites"))?.split(";") ?? [];
      } catch {
        return [];
      }
    }

    getFavorites().then((favorites) => {
      dispatch({ type: "setLoaded", payload: { favorites } });
    });
  }, []);

  useEffect(() => {
    if (!state.loading) {
      AsyncStorage.setItem("@favorites", state.favorites.join(";"));
    }
  }, [state]);

  return <FavoritesContext.Provider value={state}>{children}</FavoritesContext.Provider>;
};

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an FavoritesProvider.");
  }

  return context;
}
