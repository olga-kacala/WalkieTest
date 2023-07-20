import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Providers/Providers";
// import { AddPet } from "../Providers/Providers";
import classes from "./MyPets.module.css";
import { getDocs, collection, query, where, QuerySnapshot } from "firebase/firestore";
import { firebaseDb, firebaseAuth } from "../../App";
import { Pet } from "../Providers/Providers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";


// type MyAnimalsListProps = {
//   myList: Pet[];
// };
type MyPetsProps = {
  myPetsList: Pet[];
}

// export function MyPets({myList}:MyAnimalsListProps): JSX.Element {



export function MyPets({ myPetsList }: MyPetsProps): JSX.Element {
  const {setUsername, myPets, setMyPets, setIsLogged, animals}=useContext(AppContext);
 
  const {
    username,
    myAnimalsList,
    setmyAnimalsList,
    removeFromList,
    addToList,
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
  } = useContext(AppContext);


  useEffect(():void=> {
    onAuthStateChanged(firebaseAuth, async (user)=> {
      if (user){
        const userEmail = user.email;
        setUsername(userEmail);
        setIsLogged(true);
        const docRef = doc(firebaseDb, 'MyPets', `${user.email}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setmyAnimalsList(data.animals);
          console.log(data.animals)
        }
      } else {
        setUsername("");
        setmyAnimalsList([]);
       
      }
    });
      },[setmyAnimalsList, setUsername, setIsLogged, animals]);

      function calculateAge(dateOfBirth: Date | null): number | string {
        if (!dateOfBirth) {
          return "Unknown";
        }
      
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
      
        return age;
      }

  return (
    <div>
      <h2>My Pets</h2>
      <div className={classes.Pets}>
        <div className={classes.PetList}>
          
          {myAnimalsList.map((pet) => (
            <div key={pet.id}>
              <div>
                <div>Name: {pet.name}</div>
                {/* <div>
                  Date of birth:{" "}
                  {pet.dateOfBirth ? (
  <div>Date of birth: {pet.dateOfBirth.toLocaleDateString()}</div>
) : (
  <div>Date of birth: Unknown</div>
)}

                </div> */}
                <div>
                  Age: {calculateAge(pet.dateOfBirth) || "Unknown"} years
                </div>
                <div>Breed: {pet.breed}</div>
                <div>Sex: {pet.sex}</div>
                <div>Temper: {pet.temper}</div>
                <button onClick={() => removeFromList(pet.id)}>
                  Delete ❌
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.InputContainer}>
          <form className={classes.input}>
            <input
              name="pet name"
              type="string"
              value={petName ?? ''}
              placeholder="Pet name"
              required
              onChange={(e) => {
                setPetName(e.target.value);
              }}
            />
            <DatePicker
              selected={dateOfBirth}
              placeholderText="Date of Birth"
              onChange={(date) => setDateOfBirth(date as Date)}
              value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ""}
            />

            <input
              name="breed"
              type="string"
              value={breed ?? ''}
              placeholder="Breed"
              required
              onChange={(e) => {
                setBreed(e.target.value);
              }}
            />
            <select
              id="picklist"
              value={selectedSex ?? ''}
              onChange={(e) => {
                setSelectedSex(e.target.value);
              }}
            >
              <option value="">Select sex</option>
              <option value="female">Female&#9792;</option>
              <option value="male">Male&#9794;</option>
            </select>
            <select
              id="picklist"
              value={selectedTemper ?? ''}
              onChange={(e) => {
                setSelectedTemper(e.target.value);
              }}
            >
              <option value="">Select temper</option>
              <option value="tiger">
                &#x1F405; Tiger - powerful body and hyperactive individual
              </option>
              <option value="sloth">
                &#x1F9A5; Sloth - slow-motion lifestyle and charming appearances
              </option>
              <option value="octopus">
                &#x1F419; Octopus - shy and secretive behavior
              </option>
            </select>
            <p>{error}</p>
            <button
              className={classes.button}
              onClick={(e) => {
                e.preventDefault();
                addToList({
                  owner: username,
                  id: Date.now(),
                  name: petName ?? '',
                  dateOfBirth: dateOfBirth,
                  breed: breed ?? '',
                  sex: selectedSex ?? '',
                  temper: selectedTemper ?? '',
                });
              }}
            >
              Add Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
