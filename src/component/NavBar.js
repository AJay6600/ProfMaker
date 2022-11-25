import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Menu,Container,Button,Image } from 'semantic-ui-react'
import logo192 from "../asset/logo192.png";


const NavBar = () => {
  return (
    <Menu inverted borderless style={{padding:"0.3rem",marginBottom:"20px"}} attached>
        <Container>
            <Menu.Item name='home'>
                <Link to="/">
                  <Image size='mini' src={logo192}></Image>
                </Link>
            </Menu.Item>
            <Menu.Item name='title'>
                <h1> Create Your Profile with Photo</h1>
            </Menu.Item>
            <Menu.Item name='add' position='right'>
              <Link to="/add">
                <Button size='medium' color='blue'>add User</Button>
              </Link>

            </Menu.Item>
        </Container>

    </Menu>


  )
}   

export default NavBar
