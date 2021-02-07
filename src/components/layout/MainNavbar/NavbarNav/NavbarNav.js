import React from 'react'
import { Nav } from 'shards-react'
import { isLoggedIn } from '../../../../utils/helpers'

import UserActions from './UserActions'
import AddPost from './AddPost'

export default () => (
  <Nav navbar className="border-left flex-row">
    {isLoggedIn() && <AddPost />}
    <UserActions />
  </Nav>
)
