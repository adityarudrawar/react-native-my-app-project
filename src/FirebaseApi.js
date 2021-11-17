// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDocs, collection } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvyNyAa6ZNhIrVK_aGN5EQvC49oHYmSog",
  authDomain: "my-app-28499.firebaseapp.com",
  projectId: "my-app-28499",
  storageBucket: "my-app-28499.appspot.com",
  messagingSenderId: "290159002973",
  appId: "1:290159002973:web:4fb2c9cce8779f3d5094b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();

export let getPostsSnapshot = async () =>{
    let tempArray = []
    let querySnapshot = await getDocs(collection(firestore, "Posts"));
    
    let i = 0
    querySnapshot.forEach((doc)=>{
            tempArray.push({
                        title: doc.data().title, 
                        body: doc.data().body, 
                        id: i,
                        documentId: doc.id
                        })
                    i = i + 1
          })
    return tempArray
}

export let getComments = async (documentId) => {
  console.log("getComment function: ", documentId)
  let temp = await getDocs(collection(firestore, "Comments"));
  let tempArray = []
  let i = 0
  temp.forEach((doc)=>{
            if (doc.data().postid == documentId){
              tempArray.push({
                title: doc.data().title, 
                id: i })
              i = i + 1}
      })
  return tempArray
}


export let addComments = async (documentId, comment) => {
  // console.log("getComment function: ", documentId)
  // Generate a auto id for the comment doc.
  console.log("addComments FUNCTION", comment);
  await setDoc(doc(firestore, "Comments", generateString(20)), {
    title: comment,
    postid: documentId
  });
}

export const getPostsFromList = async(listOfDocuments) =>{
  let tempArray = []
  let querySnapshot = await getDocs(collection(firestore, "Posts"));
  let i = 0
  querySnapshot.forEach((doc)=>{
    console.log( doc.id);
    if (listOfDocuments.includes(doc.id)){
        tempArray.push({
                        title: doc.data().title, 
                        body: doc.data().body, 
                        id: i,
                        documentId: doc.id
                        })
      i = i + 1
    } else{
      console.log(doc.id, "Not saved")
    }
          })
}


const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}







console.log(generateString(5));

//  https://docs.expo.dev/guides/using-firebase/
// https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_2