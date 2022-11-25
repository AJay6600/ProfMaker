import React from 'react'
import { Modal, Header,Image,Button } from 'semantic-ui-react'

const ModalComp = ({open,setOpen,img,name,info,email,contact,id, handleDelete}) => {
  return (
   <Modal onClose={() => setOpen(false)} onOpen={()=>setOpen(true) } open={open}>
    <Modal.Content image>
      <Image size='medium' src={img} wrapped />
      <Modal.Description>
        <Header>{name}</Header>
        <p>{email}</p>
        <p>{info}</p>
        <p>{contact}</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
        <Button color='black' onClick={()=>setOpen(false)}>Cancel</Button>
        <Button content="Delete" icon="checkmark" labelPosition='right' color='red' onClick={()=>handleDelete(id)}/>
    </Modal.Actions>

   </Modal>
  )
}

export default ModalComp