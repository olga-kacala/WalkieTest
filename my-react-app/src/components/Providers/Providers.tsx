import React, { createContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../App";
import { MyPets } from "../MyPets/MyPets";

export type Pet = {
  owner: string | null;
  id: number;
  name: string;
  dateOfBirth: Date | null;
  breed: string;
  sex: string;
  temper: string;
  photoURL: string | null;
};

export type AppContextState = {
  animals: Pet[];
  setPets: (param: []) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  isLogged: boolean;
  setIsLogged: (param: boolean) => void;
  resultMyPets: string | null;
  setResultMyPets: (param: string) => void;
  myAnimalsList: Pet[];
  setmyAnimalsList: (animals: Pet[]) => void;
  removeFromList: (petId: number) => void;
  // addToList: (product: Pet) => void;
  petName: string | null;
  setPetName: (param: string) => void;
  breed: string | null;
  setBreed: (param: string) => void;
  selectedSex: string | null;
  setSelectedSex: (param: string) => void;
  selectedTemper: string | null;
  setSelectedTemper: (param: string) => void;
  error: string | null;
  setError: (param: string) => void;
  dateOfBirth: Date | null;
  setDateOfBirth: (param: Date) => void;
  logoPop: boolean;
  setLogoPop: (param: boolean) => void;
  logoTransform: (param: boolean) => void;
  photoURL: string | null;
  setPhotoURL: (param: string | null) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [animals, setPets] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState<string | null>("");
  const [resultMyPets, setResultMyPets] = useState("");
  const [myAnimalsList, setmyAnimalsList] = useState([] as Pet[]);
  const [petName, setPetName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [selectedSex, setSelectedSex] = useState<string>("");
  const [selectedTemper, setSelectedTemper] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [logoPop, setLogoPop] = useState<boolean>(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  // const addToList = async (product: Pet): Promise<void> => {
  //   try {
  //     const newProduct = {
  //       ...product,
  //       name: petName.toUpperCase(),
  //       photoURL: photoURL ?? "Img/profilePic.png", 
  //     };
  
  //     await setDoc(doc(firebaseDb, "MyPets", `${username}`), {
  //       animals: [...myAnimalsList, newProduct],
  //     });
  
  //     setmyAnimalsList([...myAnimalsList, newProduct]);
  //     setPetName("");
  //     setDateOfBirth(null);
  //     setBreed("");
  //     setSelectedSex("");
  //     setSelectedTemper("");
  //     setPhotoURL(null);
  //     setError("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  const removeFromList = async (petId: number): Promise<void> => {
    const newArr = myAnimalsList.filter((obj) => obj.id !== petId);
    try {
      await setDoc(doc(firebaseDb, "MyPets", `${username}`), {
        animals: newArr,
      });
      setmyAnimalsList(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  const logoTransform = async (): Promise<void> => {
    setLogoPop(true);
    setTimeout(() => {
      setLogoPop(false);
    }, 900);
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        isLogged,
        setIsLogged,
        animals,
        setPets,
        resultMyPets,
        setResultMyPets,
        myAnimalsList,
        setmyAnimalsList,
        removeFromList,
        // addToList,
        petName,
        breed,
        selectedSex,
        selectedTemper,
        error,
        dateOfBirth,
        setPetName,
        setDateOfBirth,
        setBreed,
        setSelectedSex,
        setSelectedTemper,
        setError,
        logoPop,
        setLogoPop,
        logoTransform,
        photoURL,
        setPhotoURL
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
