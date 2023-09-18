import classNames from 'classnames';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  // Input,
  // InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  // Modal,
  NavbarToggler,
  // ModalHeader,
} from 'reactstrap';

import userAvatar from 'assets/img/anime3.png';
import { AuthContext } from 'contexts/AuthContext';
// reactstrap components

function BaseNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  // const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState('navbar-transparent');
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener('resize', updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener('resize', updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor('bg-white');
    } else {
      setcolor('navbar-transparent');
    }
  };
  const handleClickProfile = () => {
    navigate('/profile');
  };

  const handleLogOut = async () => {
    await logout();
    navigate('/auth');
  };

  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor('navbar-transparent');
    } else {
      setcolor('bg-white');
    }
    setcollapseOpen(!collapseOpen);
  };
  // // this function is to open the Search modal
  // const toggleModalSearch = () => {
  //   setmodalSearch(!modalSearch);
  // };
  return (
    <>
      <Navbar
        className={classNames('navbar-absolute', color)}
        expand="lg"
        style={{ position: 'fixed' }}
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames('navbar-toggle d-inline', {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>

          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>

          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={currentUser.photoUrl ? currentUser.photoUrl : `https://avatar.oxro.io/avatar.svg?name=${currentUser.displayName.replace(/ /g, "%20")}&bold=true`} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">{currentUser.displayName}</p>
                </DropdownToggle>

                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem
                      onClick={handleClickProfile}
                      className="nav-item"
                    >
                      Profile
                    </DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem onClick={handleLogOut} className="nav-item">
                      Log out
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BaseNavbar;
