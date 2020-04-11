import React, { Component } from 'react';
import { Header, Icon, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Tabs from '../Tabs/Tabs';
import profile from '../../images/artist1.jpg';

import '../../stylesheets/userpage.css';

export default class UserPage extends Component {
  render() {
    return (
        <div>
            <Header as='h4' size='huge' color='teal' icon textAlign='center'>
                <Icon name='search'  circular />
                <Link to='/mainpage'><Header.Content>Scout</Header.Content></Link>
            </Header>
            <div className='header'>
             <Image src={profile} size='medium'/>
                <div className='text'>
                    <h1>Elliot Baker</h1>
                    <h2>Artist</h2>
                    <h3>Elliot is a painter that specializes in water color paintings</h3>
                </div>
            </div>
            <Tabs/>
        </div>
    )
  }
}