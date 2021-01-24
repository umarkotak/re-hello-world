import React from 'react'
import { Container, Row, Col, Alert, Button } from 'shards-react'
import { Link } from 'react-router-dom'
import { ListPosts, LikePost, UnlikePost } from '../../api'
import { isLoggedIn } from '../../utils/helpers'
import CardComponent from '../../components/card-component'
import LoadingComponent from './loading-component'

export default function BlogPosts({ match }) {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ListPosts().then(res => {
      const { data, isError, isLoading } = res
      // console.log('datanya ===>', data)
      setIsLoading(isLoading)
      setData(data)
      if (isError) console.log('Error ==>', isError)
    })
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

        {isLoading ? (
          <LoadingComponent />
        ) : data && data.feeds.length ? (
          data.feeds.map((item, idx) => (
            <React.Fragment key={String(idx)}>
              <Row noGutters className="page-header py-4">
                <h4 className="text-sm-left" style={{ margin: '0' }}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {item.title}
                  </span>
                </h4>
              </Row>
              <Row>
                {item &&
                  item.contents.map((items, i) => (
                    <Col lg="4" key={String(i)}>
                      <CardComponent
                        elementId={`posts-${items.content_id}`}
                        linkTo={`/post/${items.content_id}`}
                        imageUrlPost={items.image_url}
                        titleTagPost={item.title}
                        descriptionPost={items.description}
                        datePost={items.created_at}
                        countLikePost={items.count_like}
                        likePost={items.liked_by_me}
                        countCommentPost={items.count_comment}
                        imageUrlCreator={require('../../images/avatars/3.jpg')}
                        titleCreator={items.creator_name}
                        handleClickLike={() =>
                          HandleClickLike(
                            `posts-${items.content_id}`,
                            items.content_id,
                          )
                        }
                      />
                    </Col>
                  ))}
              </Row>
            </React.Fragment>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10rem',
            }}
          >
            <div className="error__content">
              <h3>
                <i className="material-icons">vertical_split</i>Posts not exists
              </h3>
              <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>
                <Button pill>refresh</Button>
              </a>
            </div>
          </div>
        )}
      </Container>
    </React.Fragment>
  )
}
