// import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import { savePost } from '../src/Stoarge';
import {PostPanel} from '../components/Post-Panel'

//  React Native Dimensions. FOR DESIGNING;

import * as firebaseFunctions from '../src/FirebaseApi.js'

export function HomeScreen(props){
  const [Posts, setPosts] = useState([]);

  const getData = async()=> {
    let temp = await firebaseFunctions.getPostsSnapshot()
    setPosts(temp)
  }

  useEffect(async ()=>{
    await getData();
  },[]);

  const renderItem = ({ item }) => (
    <PostPanel title={item.title} body={item.body} id={item.id} documentId={item.documentId}/>
  );

  return (
    <View>
      <View>
        <FlatList
                  data={Posts}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
        />
      </View>
      {/* <Button 
                title="Refresh to get posts"
                style={{width: 10, height: 10}}
                onPress={ ()=> getData()}>
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// export function HomeScreen(props){
  
//   const [panels, setPanels] = useState([]);

//   const getData = async()=> {
//         let temp = await firebaseFunctions.getPostsSnapshot()
//         setPanels(temp)
//   }

//   return(
//     <View>
//        <KeyboardAvoidingView behavior="padding">
//             <FlatList
//                 data={panels}
//                 renderItem={({item}) => <PostPanel {...item} />}
//                 keyExtractor={item => item.id.toString()}
//             />
//             <Button 
//                 title="Refresh to get posts"
//                 style={{width: 10, height: 10}}
//                 onPress={ ()=> getData()}>
//             </Button>
//         </KeyboardAvoidingView>
//     </View>
//     );
//   }
  
//   function PostPanel(props){
//     return(
//       <View>
//         <Title title={props.title}/>
//         <Body body={props.body}/>
//         <CommentSection docID={props.documentId}/>
//         <SavePost docID={props.documentId}/>
//       </View>
//     )
//   }

//   function SavePost(props){
//     const [postSaved, setPostSaveStatus] = useState(false);

//     const saveThisPost = async(documentId)=>{  
//       await savePost(documentId)
//       alert("Post Saved");
//       setPostSaveStatus(true);
//     }
//     return(!postSaved)?(
//       <View>
//         <Button
//         title="Save this Post"
//         onPress={()=>saveThisPost(props.docID)}
//         ></Button>
//       </View>):null;
//   }
//   function Popup(props){
//     console.log("Printing CHILD");    
//     const [commentText, setComment] = useState("")
//     const [comments, updateComments] = useState("")

    
//     //  SETS commentText STATE
//     let getText = (text)=>{
//         setComment(text)
//         console.log(text)
//     }

//     // GETS Comments from Firebase
//     const getComm = async() => { 
//         let temp = await firebaseFunctions.getComments(props.docID) 
//         if (temp != comments){
//           updateComments(temp)
//           console.log("Comments are:" ,temp)
//         } else{
//           console.log("Returning since comments value have not changed.")
//         }
//     }
    
//     useEffect(()=>{
//       if (props.trigger === true){
//         console.log("Loading Comments for doc ID: ", props.docID);
//         getComm();
//       }
//     },[])

//     const renderItem = (item)=>{
//       <CommentPanel title={item.title}/>
//     }
//     // Returns if trigger is true, otherwise returns false.
//     return(props.trigger)?(
//           <View style={{height: 200, width: 380}}> 
//               <Button 
//                     // style = {{ position: 'relative', top: '16px', right: '16px'}}
//                     title="close"
//                     onPress={()=>props.setTrigger(false) }
//                 />
//             {/* <View style={{ width:"100%", height:"50%", backgroundColor: '#EAEAEA', justifyContent: 'flex-start'}   }> */}
//               <KeyboardAvoidingView behavior="padding">
//                 <FlatList
//                     data={comments}
//                     renderItem={({item}) => <CommentPanel {...item} />}
//                     keyExtractor={item => item.id.toString()}
//                 />
//               </KeyboardAvoidingView>
//             {/* </View> */}
//             <View style={{height: 100, width: 200}}>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={getText}
//                 value={commentText}
//                 placeholder="Add a comment"
//                 />
//                 <TouchableOpacity
//                   style={{ height: 200 ,alignItems: "center", backgroundColor: "#EAEAEA"}}
//                   onPress={ ()=>{ firebaseFunctions.addComments(props.docID, commentText)
//                                   setComment("")} }>
//                   <Octicons name="diff-added" size={20} color="gray" />
//                   </TouchableOpacity>
//             </View>
//           </View>
//       ): null;
//   }


//   function CommentSection(props){
//       const [buttonPopup, setButtonPopup] = useState(false);
//     console.log("Printing PARENT for DOC ID", props.docID);
//       return(
//           <View>
//                 <Text>{props.docID}</Text>
//                 <Button 
//                     style={{width: 10, height: 10}}
//                     onPress={ () => setButtonPopup(true)}
//                     title="Comments">
//                 </Button>
//                 {buttonPopup&&<Popup 
//                     trigger={buttonPopup}
//                     setTrigger={setButtonPopup}
//                     style= {{width:'100', height: '100'}}
//                     docID= {props.docID}
//                     >
//                 </Popup>}
//             </View>
//       )
//     }

// function Title(props){
//     return(
//       <Text>{props.title}</Text>
//     )
//   }
  
// function CommentPanel(props){
//     return(
//         <Text>{props.title}</Text>
//     )
// }
// function Body(props){
//     return(
//       <Text>
//         {props.body}
//       </Text>
//     )
//   }
  
// function ImageF(props){
//     return(
//       <View style={{width:100, height:100}}>
//         <Image style={styles.ImageFStyle} source={{uri:props.image}}/>
//       </View>
//     )
//   }

//   const styles = StyleSheet.create({
//     container: {
//     //   flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       width: "100%",
//       height: "100%",
//       paddingTop: 40
//     },ImageFStyle:{
//       width:100,
//       height: 100
//     }, postPanel:{
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       padding: 3,
//       margin: 5,
//       width: 300,
//     }, popup:{
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }, popupinner:{
//         position: 'relative',
//         padding: '32px',
//         width: '100%',
//         maxWidth: '640px',
//         backgroundColor: '#FFF'
//     }, input: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 2,
//         padding: 3,
//         margin: 5,
//     }
//   });

// //   fixed