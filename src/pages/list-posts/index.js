import React from 'react'
import { Container, Row, Col } from 'shards-react'
import { ListPosts } from '../../api'
import CardComponent from '../../components/card-component'
import LoadingComponent from './loading-component'

export default function BlogPosts({ match }) {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ListPosts().then(res => {
      const { data, isError, isLoading } = res
      setIsLoading(isLoading)
      setData(data)
      if (isError) console.log('Error ==>', isError)
    })
  }, [])

  const HandleClickLike = val => {
    let like = document
      .getElementById(`${val}`)
      .firstElementChild.classList.contains('text-danger')
    if (like) {
      document
        .getElementById(`${val}`)
        .firstElementChild.classList.remove('text-danger')
    } else {
      document
        .getElementById(`${val}`)
        .firstElementChild.classList.toggle('text-danger')
    }
  }

  return (
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
      ) : (
        data &&
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
                      countCommentPost={items.count_comment}
                      imageUrlCreator={require('../../images/avatars/3.jpg')}
                      titleCreator={items.creator_name}
                      handleClickLike={() =>
                        HandleClickLike(`posts-${items.content_id}`)
                      }
                    />
                  </Col>
                ))}
            </Row>
          </React.Fragment>
        ))
      )}
    </Container>
  )
}
