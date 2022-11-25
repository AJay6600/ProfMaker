import { async, isReactNative } from '@firebase/util';
import { collection, deleteDoc,doc, onSnapshot } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,Card,Container,Grid,Image, Item } from 'semantic-ui-react';
import ModalComp from '../component/ModalComp';
import Spinner from '../component/Spinner';
import { db } from '../Firebase';



const Home = () => {
  const [users,setUsers]=useState([]);
  const [open ,setOpen]= useState(false);
  const [user,setUser]=useState({})
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  useEffect(()=> {
    setLoading(true);
    const unsub = onSnapshot(collection(db,"users"),(snapshot)=>{
      let list=[];
      snapshot.docs.forEach((doc)=>{
        list.push({id: doc.id, ...doc.data()})
      });
      setUsers(list);
      setLoading(false);
    },
    (error)=>{
      console.log(false);
    }
    );
    return () =>{
      unsub();
    }
  },[]);

  if(loading){
    return <Spinner/>
  }
  const handleModal = (item)=>{
    setOpen(true); 
    setUser(item);
  }
  const handleDelete = async(id) =>{
    if(window.confirm("Are you sure to delete that user?")){
      try{
        setOpen(false)
        await deleteDoc(doc(db,"users",id));
        setUser(users.filter((user)=> user.id !== id))

       }catch(err)
       {
        console.log(err);
       }
    }
  }
  return (
    <Container>
    
      <Grid columns={3}  stackable> 
        {users && users.map((item)=>(
          <Grid.Column>
            <Card key={item.id}>
             <Card.Content>
             <Image  
             src={item.img} 
             size="medium" 
             style={{
              height:"200px",
              width:"200px",
              borderRadius:"50%"
             }}/>
             <Card.Header style={{marginTop:"10px"}}>{item.name}</Card.Header>
             <Card.Description>{item.email}</Card.Description>
             </Card.Content>    
             <Card.Content extra>
              <div>
                <Button color='blue'  onClick={() =>{let str="/update/"+item.id; navigate(str)}}> Update</Button>
                <Button color='purple'  style={{marginTop:"5px"}} onClick={()=>handleModal(item)}>View</Button>
                {open && (
                  <ModalComp 
                  open={open}
                  setOpen={setOpen}
                  handleDelete={ handleDelete}
                  {...user}
                  />
                )}
              </div>
              </Card.Content>          
            </Card>
          </Grid.Column>
        ))}
      </Grid>
   
    </Container>
  )
}

export default Home
