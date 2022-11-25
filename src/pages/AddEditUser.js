import { async } from '@firebase/util'
import { addDoc, collection, doc, getDoc, serverTimestamp ,updateDoc} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React,{useEffect,useState} from 'react'
import { useParams,useNavigate, Navigate } from 'react-router-dom'
import { Button,Form,Grid,Loader } from 'semantic-ui-react'
import { storage ,db} from '../Firebase'

const initialState ={
  name:"",
  email:"",
  info:"",
  contact:"",

}

const AddEditUser = () => {
  const [data,setData] =useState(initialState);
  const {name,email,info,contact}=data;
  const [file,setFile] =useState();
  const [progress,setProgress] =useState(null);
  const [errors,setErrors] =useState({});
  const [isSubmit,setIsSubmit] =useState(false);
  const navigate=useNavigate();
  const {id}=useParams();


  useEffect(()=>{
id && getSingleUser()
  },[id])


  const getSingleUser = async()=>{
    const docRef = doc(db,"users",id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()){
      setData({...snapshot.data()});
    }
  }
useEffect(()=>{
const uploadFile = () =>{
  const name = new Date().getTime()+file.name;
  const storageRef = ref(storage,file.name);
  const uploadTask = uploadBytesResumable(storageRef,file);
  uploadTask.on("state_changed",(snapshot)=>{
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    setProgress(progress);
    switch(snapshot.state)
    {
      case "paused" :
        console.log("upload is paused");
        break;
        case "running":
          console.log("upload is running");
          break;
          default:
            break;
    }
  },(error)=>{
    console.log(error);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setData((prev)=>({...prev,img:downloadURL}));
    });
  }
  );
};
file && uploadFile();
},[file])

const handleChange =(e)=>{
  setData({...data,[e.target.name]:e.target.value});
};

const validate =()=>{
  let errors = {};
  if(!name) {
    errors.name = "Name is Required"
  }

  if(!email) {
    errors.email= "email is Required"
  }

  if(!info) {
    errors.info = "Info is Required"
  }

  if(!contact) {
    errors.contact = "Contact is Required"
  }
return errors;
}

const handleSubmit = async(e)=> {
  e.preventDefault();
  let errors = validate();
  if(Object.keys(errors).length) return setErrors(errors);

  setIsSubmit(true);
if(!id){
  try{
    await addDoc(collection(db,"users"),{
      ...data,
      timestamp:serverTimestamp()
    })
  }catch(error){console.log(error)}
}
else{
  try{
    await updateDoc(doc(db,"users",id),{
      ...data,
      timestamp:serverTimestamp()
    })
  }catch(error){console.log(error)}
}

  
  navigate('/');
}
  return (
    <div>
      <Grid centered verticalAlign='middle' columns={3} style={{height:"80vh"}}>
       <Grid.Row>
        <Grid.Column textAlign='center'>
         <div>
          {isSubmit ? <Loader active inline='centered' size='huge' /> :(
            <>
            <h2>{id? "Update User" : "Add User"}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Input 
              label="Name" 
              placeholder="Enter Name" 
              error={errors.name ? {content:errors.name}:null}
              name="name"
              onChange={handleChange} 
              value={name}
              autoFocus
              />

            <Form.Input 
              label="Email" 
              placeholder="Enter Email" 
              name="email"
              error={errors.email ? {content:errors.email}:null}
              onChange={handleChange} 
              value={email}              
              />
              <Form.TextArea 
              label="Info" 
              placeholder="Enter Info" 
              error={errors.info ? {content:errors.info}:null}
              name="info"
              onChange={handleChange} 
              value={info}              
              />
              <Form.Input 
              label="Contact" 
              placeholder="Enter Contact" 
              error={errors.contact ? {content:errors.contact}:null}
              name="contact"
              onChange={handleChange} 
              value={contact}              
              />
             <Form.Input 
             label="Upload"
             type='file'
             onChange={(e)=>setFile(e.target.files[0])}
             />
              <Button primary type='submit' disabled={progress!=null && progress <100} color='Blue'>Submit</Button>
            </Form>
            </>
          )}
         </div>
        </Grid.Column>
       </Grid.Row>
      </Grid>
    </div>
  )
}

export default AddEditUser
