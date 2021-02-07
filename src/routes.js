import React from 'react'
import { Redirect } from 'react-router-dom'

// Layout Types
import { DefaultLayout } from './layouts'
import { isLoggedIn } from './utils/helpers'

// Route Views
import BlogOverview from './pages/BlogOverview'
import AddNewPost from './pages/add-new-post'
import ComponentsOverview from './pages/ComponentsOverview'
import ListPosts from './pages/posts'
import DetailPost from './pages/detail-post'
import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'
import Register from './pages/register'
import Me from './pages/me'
import DetailProfile from './pages/detail-profile'

const Routes = [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/posts" />,
  },
  {
    path: '/blog-overview',
    layout: DefaultLayout,
    component: BlogOverview,
  },
  {
    path: '/add-post',
    layout: DefaultLayout,
    component: AddNewPost,
    isLoggedIn: isLoggedIn(),
    loginComponent: () => <Redirect to="/login" />,
  },
  {
    path: '/me',
    layout: DefaultLayout,
    component: Me,
    isLoggedIn: isLoggedIn(),
    loginComponent: () => <Redirect to="/login" />,
  },
  {
    path: '/profile/:id',
    layout: DefaultLayout,
    component: DetailProfile,
  },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview,
  },
  {
    path: '/posts',
    layout: DefaultLayout,
    component: ListPosts,
  },
  {
    path: '/post/:id',
    layout: DefaultLayout,
    component: DetailPost,
  },
  {
    path: '/login',
    layout: DefaultLayout,
    component: Login,
  },
  {
    path: '/forgot-password',
    layout: DefaultLayout,
    component: ForgotPassword,
  },
  {
    path: '/register',
    layout: DefaultLayout,
    component: Register,
  },
  {
    path: '/users/reset_password',
    layout: DefaultLayout,
    component: ResetPassword,
  },
]

export default Routes
