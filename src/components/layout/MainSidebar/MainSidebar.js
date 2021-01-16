import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Col } from 'shards-react'

import SidebarMainNavbar from './SidebarMainNavbar'
import SidebarNavItems from './SidebarNavItems'

import { Store } from '../../../flux'

export default function MainSidebar(props) {
  const [state, setState] = React.useState({
    menuVisible: false,
    sidebarNavItems: Store.getSidebarItems(),
  })

  React.useEffect(() => {
    return () => {
      Store.removeChangeListener(onChange)
    }
  }, [])

  const onChange = () => {
    setState({
      ...state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems(),
    })
  }

  const classes = classNames(
    'main-sidebar',
    'px-0',
    'col-12',
    state.menuVisible && 'open',
  )

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarMainNavbar hideLogoText={props.hideLogoText} />
      <SidebarNavItems />
    </Col>
  )
}

MainSidebar.propTypes = {
  hideLogoText: PropTypes.bool,
}

MainSidebar.defaultProps = {
  hideLogoText: false,
}
