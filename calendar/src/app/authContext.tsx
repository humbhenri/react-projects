import { createContext } from "react";
import { IUser } from "./services/backend";

export const userContext = createContext<IUser>({
  name: "anonimo",
  email: "",
});
