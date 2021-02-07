import React from 'react'
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'shards-react'
import { Link } from 'react-router-dom'
import LoadingComponent from './loading-component'

export default function PopularPosts({ isLoading, data }) {
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Card
          className="mb-5"
          style={{ position: 'sticky', top: '5rem', zIndex: '999' }}
        >
          <CardHeader className="border-bottom">
            <h6 className="m-0">
              <i className="far fas fa-heart mr-1" />
              Popular Posts
            </h6>
          </CardHeader>
          {data && data.length ? (
            <CardBody
              style={{
                height: '500px',
                overflowY: 'scroll',
              }}
            >
              <Row>
                {data.map((item, idx) => (
                  <Col lg="12" md="12" key={String(idx)}>
                    <Card small className="card-post mb-4">
                      <Link to={`/post/${item.id}`}>
                        <CardBody>
                          <h5 className="card-title">{item.title}</h5>

                          <p className="card-text text-muted">
                            {item.description}
                          </p>
                        </CardBody>
                      </Link>
                      <CardFooter className="border-top d-flex">
                        <div className="card-post__author d-flex">
                          <span
                            className="card-post__author-avatar card-post__author-avatar--small"
                            style={{
                              backgroundImage: `url('${item.creator_avatar_url}')`,
                            }}
                          >
                            {item.creator_name}
                          </span>
                          <div className="d-flex flex-column justify-content-center ml-3">
                            <span className="card-post__author-name">
                              {item.creator_name}
                            </span>
                            <small className="text-muted">
                              {new Date(item.created_at).toDateString()}
                            </small>
                          </div>
                        </div>
                        <div className="my-auto ml-auto">
                          <span className="mr-3">
                            <i
                              className={`mr-1 far fas fa-heart ${item.liked_by_me} ? 'text-danger' : ''`}
                            />
                            {item.count_like}
                          </span>
                          <span>
                            <i className={`mr-1 fas fa-comment`} />
                            {item.count_like}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardBody>
          ) : (
            <CardBody>
              <p className="text-center">
                <i className="fas fa-exclamation-circle"></i> has no post
              </p>
            </CardBody>
          )}
        </Card>
      )}
    </React.Fragment>
  )
}
