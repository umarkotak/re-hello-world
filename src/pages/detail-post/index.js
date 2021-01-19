import React from 'react'
import { Container, Row, Col } from 'shards-react'
import { DetailPost } from '../../api'
import CardComponent from '../../components/card-component'
import LoadingComponent from './loading-component'

export default function BlogPosts({ match }) {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    DetailPost({ id: match.params.id }).then(res => {
      const { data, isError, isLoading } = res
      setIsLoading(isLoading)
      setData(data)
      if (isError) console.log('Error ==>', isError)
    })
  }, [])

  return (
    <Container fluid className="main-content-container px-4">
      {isLoading ? (
        <Row
          noGutters
          className="d-flex page-header py-4 justify-content-center"
        >
          <LoadingComponent />
        </Row>
      ) : (
        <React.Fragment>
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
                  <i className="material-icons">vertical_split</i>{' '}
                  {data && data.title}
                </h4>
              </div>
            </Row>
          </div>
          <Row>
            {data && (
              <Col lg="12" md="12">
                <CardComponent
                  imageUrlPost={data.image_url}
                  videoUrlPost={data.video_url}
                  titleTagPost={data.tag}
                  descriptionPost={data.description}
                  datePost={data.created_at}
                  countLikePost={data.count_like}
                  countCommentPost={data.count_comment}
                  imageUrlCreator={require('../../images/avatars/3.jpg')}
                  titleCreator={data.creator_name}
                  size="lg"
                />
              </Col>
            )}
          </Row>
        </React.Fragment>
      )}
    </Container>
  )
}
