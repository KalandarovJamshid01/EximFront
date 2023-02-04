import { createContext } from "react";
import RootReducer from "../reducers/root.reducer";
import { useLocalStorageReducer } from "../reducers/useLocalStorageReducer";

export const RootContext = createContext();
//eslint-disable-next-line
export const RootDispatch = createContext();

export function RootProvider({ children }) {
  const [state, dispatch] = useLocalStorageReducer(
    "hackable",
    {
      user: {
        id: false,
        role: false,
        isVerified: false,
        details: false,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDhjZGMxYWEzYmE1MThmMmFmMzY0ZiIsImlhdCI6MTY3NTQ5MDMyNCwiZXhwIjoxNjc1NTc2NzI0fQ.PlBc67wleNMlGhtoElWqwaZIfx0yCcy801Kp10RKXnI",
      },
    },
    RootReducer
  );
  return (
    <RootContext.Provider value={state}>
      <RootDispatch.Provider value={dispatch}>{children}</RootDispatch.Provider>
    </RootContext.Provider>
  );
}
