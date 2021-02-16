import React from 'react'
import { Redirect } from 'react-router-dom'

// Layout Types
import { DefaultLayout } from './layouts'
import { isLoggedIn } from './utils/helpers'

// Route Views
import AddNewPost from './pages/add-new-post'
import ListPosts from './pages/posts'
import DetailPost from './pages/detail-post'
import EditPost from './pages/edit-post'
import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'
import Register from './pages/register'
import About from './pages/about'
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
    path: '/edit/:id',
    layout: DefaultLayout,
    component: EditPost,
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
    path: '/about',
    layout: DefaultLayout,
    component: About,
  },
  {
    path: '/register',
    layout: DefaultLayout,
    component: Register,
    isLoggedIn: isLoggedIn(),
    loginComponent: () => <Redirect to="/posts" />,
  },
  {
    path: '/users/reset_password',
    layout: DefaultLayout,
    component: ResetPassword,
  },
]

export default Routes
