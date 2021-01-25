import React from 'react'
import { Link } from 'react-router-dom'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from 'shards-react'
import {
  isLoggedIn,
  userLoggedIn,
  userLoggedOut,
} from '../../../../utils/helpers'

export default function UserActions() {
  const [state, setState] = React.useState({
    visible: false,
  })

  const toggleUserActions = () => {
    setState({
      ...state,
      visible: !state.visible,
    })
  }

  return (
    <NavItem tag={Dropdown} caret toggle={() => toggleUserActions()}>
      {isLoggedIn() ? (
        <React.Fragment>
          <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
            <img
              className="user-avatar rounded-circle mr-2"
              src={userLoggedIn().avatar_url}
              alt="User Avatar"
            />{' '}
            <span className="d-none d-md-inline-block">
              {userLoggedIn().email}
            </span>
          </DropdownToggle>
          <Collapse tag={DropdownMenu} right small open={state.visible}>
            <DropdownItem>
              <i className="material-icons">&#xE7FD;</i> @
              {userLoggedIn().username}
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              className="text-danger"
              onClick={() => userLoggedOut()}
            >
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </DropdownItem>
          </Collapse>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
            <span className="d-none d-md-inline-block">Account</span>
          </DropdownToggle>
          <Collapse tag={DropdownMenu} right small open={state.visible}>
            <DropdownItem tag={Link} to={`/login`}>
              <i className="fas fa-sign-in-alt"></i> Login
            </DropdownItem>
            <DropdownItem tag={Link} to={`/register`}>
              <i className="fas fa-edit"></i> Register
            </DropdownItem>
          </Collapse>
        </React.Fragment>
      )}
    </NavItem>
  )
}
