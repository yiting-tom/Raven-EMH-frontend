/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import favicon from 'assets/img/favicon.png';

function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://ravenapp.org/">Raven AI Group</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://ravenapp.org/">About Us</NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made by{' '}
          <a href="https://ravenapp.org/" target="_blank">
            <img
              style={{ width: '1.5em', margin: '0 1 0.2vw' }}
              src={favicon}
              alt="Raven"
            />
            {'  '}
            Raven
          </a>{' '}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
