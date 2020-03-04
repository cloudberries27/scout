import React from 'react';
import { Container } from 'semantic-ui-react';
import PropType from 'prop-types';


function Layout(props) {
  const { children } = props;
  return (
    <Container>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
      {children}
    </Container>
  );
}

Layout.propTypes = {
  children: PropType.shape(),
};

Layout.defaultProps = {
  children: {},
};

export default Layout;
