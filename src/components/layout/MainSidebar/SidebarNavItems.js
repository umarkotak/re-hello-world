import React from 'react'
import { Nav } from 'shards-react'

import SidebarNavItem from './SidebarNavItem'
import { Store } from '../../../flux'

export default function SidebarNavItems() {
  const [state, setState] = React.useState({
    navItems: Store.getSidebarItems(),
  })

  React.useEffect(() => {
    return () => {
      Store.removeChangeListener(onChange)
    }
  }, [])

  const onChange = () => {
    setState({
      ...state,
      navItems: Store.getSidebarItems(),
    })
  }

  const { navItems: items } = state
  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        {items.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  )
}
