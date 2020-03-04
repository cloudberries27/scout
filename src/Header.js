import React from 'react';
import { Header, Icon, Image } from 'semantic-ui-react'

function Header_app() {
  return (
    <div>
    <Header as='h4' size='huge' color='teal' icon textAlign='center'>
      <Icon name='search'  circular />
      <Header.Content>Scout</Header.Content>
    </Header>
    <Image
      centered
      size='large'
      src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png'
    />
  </div>
  );
}

export default Header_app;
