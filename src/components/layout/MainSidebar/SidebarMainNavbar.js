import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarBrand } from 'shards-react'

import { Dispatcher, Constants } from '../../../flux'

export default function SidebarMainNavbar({ hideLogoText }) {
  const handleToggleSidebar = () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    })
  }

  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light"
      >
        <NavbarBrand
          className="w-100 mr-0"
          href={`/`}
          style={{ lineHeight: '25px' }}
        >
          <div className="d-table m-auto">
            <img
              id="main-logo"
              className="d-inline-block align-top mr-1"
              style={{ maxWidth: '25px' }}
              src={require('../../../images/shards-dashboards-logo.svg')}
              alt="Shards Dashboard"
            />
            {!hideLogoText && (
              <span className="d-none d-md-inline ml-1">Shards Dashboard</span>
            )}
          </div>
        </NavbarBrand>
        <a
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={() => handleToggleSidebar()}
          href="/#"
        >
          <i className="material-icons">&#xE5C4;</i>
          afafa
        </a>
      </Navbar>
    </div>
  )
}

SidebarMainNavbar.propTypes = {
  hideLogoText: PropTypes.bool,
}

SidebarMainNavbar.defaultProps = {
  hideLogoText: false,
}
