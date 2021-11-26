import { createContext, useContext } from "react";
import { IUser } from "./services/backend";

interface IAuthContext {
  user: IUser;
  onSignout: () => void;
}

export const authContext = createContext<IAuthContext>({
  user: {
    nome: "anonimo",
    email: "",
  },
  onSignout: () => {},
});

export const useAuthContext = () => useContext(authContext);
