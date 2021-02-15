import React from 'react'
import { Row, Col, Card, CardHeader, CardBody, Badge } from 'shards-react'
import { Link } from 'react-router-dom'

export default function PostDetail({ data }) {
  return (
    <Card className="mb-5">
      <CardHeader className="border-bottom">
        <h6 className="m-0">All Posts</h6>
      </CardHeader>
      {data && data.length ? (
        <CardBody style={{ height: '550px', overflowY: 'scroll' }}>
          <Row>
            {data &&
              data.map((item, idx) => (
                <React.Fragment key={String(idx)}>
                  {item &&
                    item.contents.map((items, key) => (
                      <Col lg="12" sm="12" className="mb-4" key={String(key)}>
                        <Card
                          small
                          className="card-post card-post--aside card-post--1"
                        >
                          <div
                            className="card-post__image"
                            style={{
                              backgroundImage: `url('${items.image_url}')`,
                            }}
                          >
                            <Badge
                              pill
                              className={`card-post__category bg-info`}
                            >
                              {item.title}
                            </Badge>
                          </div>
                          <CardBody>
                            <Link
                              to={`/post/${items.content_id}`}
                              style={{ textDecoration: 'none !important' }}
                            >
                              <h5 className="card-title">
                                {items.description}
                              </h5>
                            </Link>
                            <p className="card-text d-inline-block mb-3">
                              <span className="mr-2">
                                <i
                                  className={`fas fa-heart ${
                                    items.liked_by_me ? 'text-danger' : ''
                                  }`}
                                />{' '}
                                {items.count_like}
                              </span>
                              <span>
                                <i className="fas fa-comment" />{' '}
                                {items.count_comment}
                              </span>
                            </p>
                            <span className="text-muted">
                              {' - '}
                              {new Date(items.created_at).toDateString()}
                            </span>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                </React.Fragment>
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
  )
}
