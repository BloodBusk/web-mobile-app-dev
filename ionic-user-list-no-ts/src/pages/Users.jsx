import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useState, useEffect } from "react";
import UserListItem from "../component/UserListItem";

const Users = () => {
  const [users, setUsers] = useState([]); // useState allows us to track state in a function component.

  async function loadUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/web-mobile-app-dev/main/data/users.json"
    );
    const data = await response.json(); // parse json into js array with objects
    setUsers(data); // saves all fetched users in the state users
  }

  // useEffect allows you to perform side effects in your components.
  useEffect(() => {
    loadUsers();
  }, []); // empty array as dependency - makes sure to run only on the first render

  useIonViewDidEnter(() => {
    console.log("ionView You entered the users page");
  });
  useIonViewDidLeave(() => {
    console.log("ionView You left the users page");
  });

  useEffect(()=> {
      console.log("useEffect");
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {users.map((users, index) => (
            <UserListItem user={users} key={index} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Users;
