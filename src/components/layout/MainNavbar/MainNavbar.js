import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container, Navbar } from 'shards-react'

import NavbarNav from './NavbarNav/NavbarNav'
import NavbarToggle from './NavbarToggle'

export default function MainNavbar({ stickyTop }) {
  const classes = classNames(
    'main-navbar',
    'bg-white',
    stickyTop && 'sticky-top',
  )

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar
          type="light"
          className="justify-content-space-between flex-md-nowrap p-0"
        >
          <NavbarToggle />
          <NavbarNav />
        </Navbar>
      </Container>
    </div>
  )
}

MainNavbar.propTypes = {
  stickyTop: PropTypes.bool,
}

MainNavbar.defaultProps = {
  stickyTop: true,
}
