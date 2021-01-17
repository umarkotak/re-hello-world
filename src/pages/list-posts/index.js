import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
} from 'shards-react'
import { listPosts } from '../../api'
import LoadingComponent from './loading-component'

export default function BlogPosts() {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    listPosts().then(res => {
      const { data, isError, isLoading } = res
      setIsLoading(isLoading)
      setData(data)
      if (isError) console.log('Error ==>', isError)
    })
  }, [])

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
              <i className="material-icons">vertical_split</i> List Posts
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
                    <Card small className="card-post mb-4">
                      <div
                        className="card-post__image"
                        style={{
                          backgroundImage: `url(${items.image_url})`,
                          height: '250px',
                        }}
                      >
                        <Badge
                          pill
                          className={`card-post__category bg-primary`}
                        >
                          <span style={{ textTransform: 'capitalize' }}>
                            {item.title}
                          </span>
                        </Badge>
                      </div>
                      <CardBody>
                        <p className="card-text text-muted">
                          {items.description}
                        </p>
                      </CardBody>
                      <CardFooter className="border-top d-flex">
                        <div className="card-post__author d-flex">
                          <a
                            href="/#"
                            className="card-post__author-avatar card-post__author-avatar--small"
                            style={{
                              backgroundImage: `url('${require('../../images/avatars/3.jpg')}')`,
                            }}
                          >
                            Written by James Khan
                          </a>
                          <div className="d-flex flex-column justify-content-center ml-3">
                            <span className="card-post__author-name">
                              {items.creator_name}
                            </span>
                            <small className="text-muted">
                              {new Date(items.created_at).toDateString()}
                            </small>
                          </div>
                        </div>
                        <div className="my-auto ml-auto">
                          <Button className="mr-1" size="sm" theme="white">
                            <i className="far fa-heart" title="bookmark" />{' '}
                            {items.count_like}
                          </Button>
                          <Button size="sm" theme="white">
                            <i className="far fa-comment" title="bookmark" />{' '}
                            {items.count_comment}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                ))}
            </Row>
          </React.Fragment>
        ))
      )}
    </Container>
  )
}
