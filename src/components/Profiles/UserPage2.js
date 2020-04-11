import React, { Component } from 'react';
import { Header, Icon, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Tabs from '../Tabs/Tabs2';
import profile from '../../images/artist2.png';

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
                    <h1>Rachel Brown</h1>
                    <h2>Musician</h2>
                    <h3>Rachel writes and produces her own music and specializes in pop</h3>
                </div>
            </div>
            <Tabs/>
        </div>
    )
  }
}