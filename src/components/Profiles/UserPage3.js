import React, { Component } from 'react';
import { Header, Icon, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Tabs from '../Tabs/Tabs2';
import profile from '../../images/artist3.jpg';

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
                    <h1>Michael Rosé</h1>
                    <h2>Singer</h2>
                    <h3>Michael is a singer that has debutted in multiple shows, including opening in Coachella.</h3>
                </div>
            </div>
            <Tabs/>
        </div>
    )
  }
}