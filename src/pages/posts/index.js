import React from 'react'
import { Container, Row, Col, Alert } from 'shards-react'
import { Link } from 'react-router-dom'
import {
  ListPosts,
  ListPopularPosts,
  LikePost,
  UnlikePost,
  ListCategories,
  ListPostsByCategory,
} from '../../api'
import { isLoggedIn } from '../../utils/helpers'
import CategoryPost from './categories'
import AllPosts from './all-posts'
import PopularPosts from './popular-posts'

export default function BlogPosts({ history }) {
  const [data, setData] = React.useState()
  const [listCategories, setListCategories] = React.useState()
  const [category, setCategory] = React.useState('all')
  const [dataPopular, setDataPopular] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isLoadingPopular, setIsLoadingPopular] = React.useState(true)
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(true)

  React.useEffect(() => {
    async function fetchDataPosts() {
      await ListPosts().then(res => {
        const { data, isError, isLoading } = res
        setIsLoading(isLoading)
        setData(data)
        if (isError) console.log('Error Posts ==>', isError)
      })
    }
    async function fetchDataPupularPosts() {
      await ListPopularPosts().then(res => {
        const { data, isError, isLoading } = res
        setIsLoadingPopular(isLoading)
        setDataPopular(data)
        if (isError) console.log('Error Popular Posts ===>', isError)
      })
    }
    async function fetchDataCategories() {
      await ListCategories().then(res => {
        const { data, isError, isLoading } = res
        if (!isError) {
          setListCategories(data)
          setIsLoadingCategories(isLoading)
        }
      })
    }
    fetchDataPosts()
    fetchDataPupularPosts()
    fetchDataCategories()
  }, [])

  const HandleClickLike = (el, id) => {
    let like = document
        .getElementById(`${el}`)
        .firstElementChild.classList.contains('text-danger'),
      valueLike = document.getElementById(`${el}`).textContent

    if (like) {
      document
        .getElementById(`${el}`)
        .firstElementChild.classList.remove('text-danger')
      document.getElementById(
        `${el}`,
      ).lastElementChild.textContent = `${parseInt(valueLike) - 1}`
      UnlikePost(id)
    } else {
      document
        .getElementById(`${el}`)
        .firstElementChild.classList.toggle('text-danger')
      document.getElementById(
        `${el}`,
      ).lastElementChild.textContent = `${parseInt(valueLike) + 1}`
      LikePost(id)
    }
  }

  const HandleCategory = val => {
    if (String(val) === 'all') {
      setCategory(val)
      history.push({
        pathname: '/',
      })
    } else {
      setCategory(val)
      setIsLoading(true)
      ListPostsByCategory(val).then(res => {
        const { data, isError } = res
        if (!isError) {
          setIsLoading(false)
          setData(data)
        }
      })
    }
  }

  return (
    <React.Fragment>
      {!isLoggedIn() && (
        <Container fluid className="px-0">
          <Alert className="mb-0 alert-info">
            <i className="fa fa-info mx-2"></i> please login to enjoy all
            features like add post, like post, comment post etc.{' '}
            <Link to={'/login'} style={{ color: 'white' }}>
              Login Here
            </Link>
          </Alert>
        </Container>
      )}
      <Container fluid className="main-content-container px-4">
        <div
          style={{
            position: 'sticky',
            top: '3.75rem',
            zIndex: '999',
          }}
        >
          <Row noGutters className="page-header py-4">
            <div
              className="bg-primary"
              style={{ borderRadius: '30px', color: '#fff', padding: '10px' }}
            >
              <h4 style={{ color: '#f2f2f2', margin: 0 }}>
                <i className="material-icons">vertical_split</i> Posts
              </h4>
            </div>
          </Row>
        </div>
        <Row>
          <Col lg="8" md="8">
            <CategoryPost
              data={listCategories}
              isActive={category}
              isLoading={isLoadingCategories}
              handleClickCategory={HandleCategory}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="8" md="8">
            <AllPosts
              isLoading={isLoading}
              data={data}
              HandleClickLike={HandleClickLike}
            />
          </Col>
          <Col lg="4" md="4">
            <PopularPosts isLoading={isLoadingPopular} data={dataPopular} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
