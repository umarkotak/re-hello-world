import React from 'react'
import { Redirect } from 'react-router-dom'

// Layout Types
import { DefaultLayout } from './layouts'
import { isLoggedIn } from './utils/helpers'

// Route Views
import BlogOverview from './pages/BlogOverview'
import AddNewPost from './pages/add-new-post'
import ComponentsOverview from './pages/ComponentsOverview'
import ListPosts from './pages/list-posts'
import Login from './pages/login'
import Register from './pages/register'

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/list-posts" />,
  },
  {
    path: '/blog-overview',
    layout: DefaultLayout,
    component: BlogOverview,
  },
  {
    path: '/add-new-post',
    layout: DefaultLayout,
    component: AddNewPost,
    isLoggedIn: isLoggedIn(),
    loginComponent: () => <Redirect to="/login" />,
  },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview,
  },
  {
    path: '/list-posts',
    layout: DefaultLayout,
    component: ListPosts,
  },
  {
    path: '/login',
    layout: DefaultLayout,
    component: Login,
  },
  {
    path: '/register',
    layout: DefaultLayout,
    component: Register,
  },
]
