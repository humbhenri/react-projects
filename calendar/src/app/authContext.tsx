import { createContext, useContext } from "react";
import { IUser } from "./services/backend";

interface IAuthContext {
  user: IUser;
  onSignout: () => void;
}

export const authContext = createContext<IAuthContext>({
  user: {
    name: "anonimo",
    email: "",
  },
  onSignout: () => {},
});

export const useAuthContext = () => useContext(authContext);
