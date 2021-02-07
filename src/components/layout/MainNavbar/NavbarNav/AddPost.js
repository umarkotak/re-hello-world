import React from 'react'
import { Link } from 'react-router-dom'
import { NavItem, NavLink, Badge } from 'shards-react'

export default function AddPost() {
  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        tag={Link}
        className="nav-link-icon text-center"
        to={'/add-post'}
      >
        <div className="nav-link-icon__wrapper" style={{ cursor: 'pointer' }}>
          <i className="material-icons">note_add</i>
          <Badge pill theme="primary">
            Add
          </Badge>
        </div>
      </NavLink>
    </NavItem>
  )
}
