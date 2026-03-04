/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
// import { userDetails } from "@/utils/auth";

type User = {
    userType: string
    email: string
    phone: string
    firstName: string
    lastName: string
    _id: string
    locum?: any
    agency?: any
    organization?: any
} | null;

const UserContext = createContext<User>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // const user = localStorage.getItem("user")

  // useEffect(() => {
  //   setUser(userDetails());
  // }, []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") { 
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
