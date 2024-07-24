import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface UserContextType {
  profileImage: string | null;
  firstName: string;
  lastName: string;
  email: string;
  setProfileImage: (image: string | null) => void;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserData(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  const fetchUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <UserContext.Provider
      value={{
        profileImage,
        firstName,
        lastName,
        email,
        setProfileImage,
        setFirstName,
        setLastName,
        setEmail, 
        // userId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
