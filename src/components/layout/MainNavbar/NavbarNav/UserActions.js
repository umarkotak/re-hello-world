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
import { isLoggedIn } from '../../../../utils/helpers'

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
              src={require('./../../../../images/avatars/0.jpg')}
              alt="User Avatar"
            />{' '}
            <span className="d-none d-md-inline-block">Sierra Brooks</span>
          </DropdownToggle>
          <Collapse tag={DropdownMenu} right small open={state.visible}>
            <DropdownItem tag={Link} to="user-profile">
              <i className="material-icons">&#xE7FD;</i> Profile
            </DropdownItem>
            <DropdownItem tag={Link} to="edit-user-profile">
              <i className="material-icons">&#xE8B8;</i> Edit Profile
            </DropdownItem>
            <DropdownItem tag={Link} to="file-manager-list">
              <i className="material-icons">&#xE2C7;</i> Files
            </DropdownItem>
            <DropdownItem tag={Link} to="transaction-history">
              <i className="material-icons">&#xE896;</i> Transactions
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to="/" className="text-danger">
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
