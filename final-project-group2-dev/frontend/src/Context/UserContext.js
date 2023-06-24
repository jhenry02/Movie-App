import { useState, useEffect, createContext } from 'react';
import {getAuth} from "firebase/auth";
import '../config/firebase-config';

// Creates a context, basically creates a scope
export const UserContext = createContext();

//Creates AuthContext hook that takes children
export const UserContextProvider = ({children}) => {

  // Sets usercredentials and sets Token for user verification
  const [User, setUser] = useState(false);
  const [Token, setToken] = useState(false)

  // When page first loads, get the useres credentials
  useEffect(() => {

    const currUser = localStorage.getItem("user");

    // If it is set, set the user
    if(currUser)
      setUser(currUser);

  }, [])

  // Check If users logedin 
  const CheckAuthStateChanged = () => {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if(user){
        const StringUser = JSON.stringify(user)
        setUser(StringUser);
        setToken(Token)
        //localStorage.setItem("user", StringUser);
        // StringUser has a lot of information, we only use userID to parse profile component, here we slice it so it only has that avaiable.
        localStorage.setItem("user", StringUser.slice(0,37) + "}"); 
      }else
        setUser(null)
    })
  }


  // which values will be avaliable through context
  const value = {
    User,
    setUser,
    Token,
    setToken,
    CheckAuthStateChanged,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}