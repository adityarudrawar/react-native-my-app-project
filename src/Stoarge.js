import  AsyncStorage  from '@react-native-async-storage/async-storage';



export const storeData = async (value) => {
    try {
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(value))
    } catch (e) {
    console.log("Error While storing the data", e);
    }
}

export const getSavedPosts = async () =>{
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        if(jsonValue!=null){
            return JSON.parse(jsonValue)
            // return jsonValue;
        }else{
            await storeData(["0"]);
            return ["0"]
        }
    } catch(e) {
        console.log("Error While Fetching Data", e)
    }
}

export const savePost = async (documentId) =>{
    let savedPosts = await getSavedPosts();
    savedPosts.push(documentId);
    await storeData(savedPosts);
    console.log("Posts Saved.")
}




export const unSavePost = async (documentId) =>{
    let savedPosts = await getSavedPosts();
    
    const index = array.indexOf(documentId);
    if (index > -1) {
        savedPosts.splice(index, 1);
    }
    
    await storeData(savedPosts);
    console.log("Removed from Saved Posts.");

}