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
  { menuItem: 'Music Gallery', render: () => <Tab.Pane>
      <div className='buttons'>
        <Button circular color='spotify' icon='spotify' size='large'/>
        <Button circular color='soundcloud' icon='soundcloud'/>
        <Button circular color='instagram' icon='instagram'/>
        <Button circular color='youtube' icon='youtube' />
          
      </div>
    </Tab.Pane> },
  { menuItem: 'Contact Me', render: () => <Tab.Pane>
        <div className='buttons'>
        <Button circular color='envelope' icon='envelope'>Email Me</Button>
        </div>
      </Tab.Pane> },
]

const TabExampleVerticalTabular = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
)

export default TabExampleVerticalTabular
