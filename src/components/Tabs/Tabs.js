import React from 'react'
import { Tab, Button} from 'semantic-ui-react'

import '../../stylesheets/userpage.css';

const panes = [
  { menuItem: 'About Me', render: () => <Tab.Pane>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
      labore et dolore magna aliqua. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis 
      feugiat vivamus. Felis bibendum ut tristique et. Parturient montes nascetur ridiculus mus. 
      Faucibus interdum posuere lorem ipsum dolor sit amet. Dignissim suspendisse in est ante in 
      nibh mauris cursus. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. 
      \Aliquet risus feugiat in ante metus dictum. Commodo odio aenean sed adipiscing diam donec. 
      Suspendisse faucibus interdum posuere lorem ipsum dolor sit. 
      </Tab.Pane> },
  { menuItem: 'Art Gallery', render: () => <Tab.Pane>
      <div className='gallery'>
          <img src='https://source.unsplash.com/zjDexYy67as/300x200' alt='artwork'/>
          <img src='https://source.unsplash.com/mHRTpIizGe8/300x200' alt='artwork'/>
          <img src='https://source.unsplash.com/WAR4DbHdiKA/300x200' alt='artwork'/>
          <img src='https://source.unsplash.com/wp201Ti7XBI/300x200' alt='artwork'/>
          <img src='https://source.unsplash.com/j4ppUnwXqIk/300x200' alt='artwork'/>
          <img src='https://source.unsplash.com/urSwFSA4itI/300x200' alt='artwork'/>
      </div>
    </Tab.Pane> },
  { menuItem: 'Contact Me', render: () => <Tab.Pane>
        <div className='buttons'>
        <Button circular color='facebook' icon='facebook' />
        <Button circular color='instagram' icon='instagram'/>
        <Button circular color='youtube' icon='youtube' />
        <Button circular color='envelope' icon='envelope' />
        </div>
      </Tab.Pane> },
]

const TabExampleVerticalTabular = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
)

export default TabExampleVerticalTabular
