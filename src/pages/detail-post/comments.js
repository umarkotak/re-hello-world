import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  FormTextarea,
} from 'shards-react'

export default function Comments({
  comments,
  valueComment,
  HandleOnChange,
  HandleSubmitComment,
}) {
  return (
    <Card small className="blog-comments mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">
          <i className="fas fa-comment mr-1"></i>
          Comments
        </h6>
      </CardHeader>

      <CardBody className="p-0">
        <div className="blog-comments__item p-3">
          <Row>
            <Col lg="12" md="12">
              <FormTextarea
                size="lg"
                className="mb-3"
                placeholder="Comment ..."
                value={valueComment}
                onChange={e => HandleOnChange(e.target.value)}
              />
            </Col>
            <Col lg="12" md="12">
              <Button
                onClick={() => HandleSubmitComment()}
                disabled={!valueComment}
              >
                <i className="fas fa-paper-plane"></i> Post
              </Button>
            </Col>
          </Row>
        </div>
        <div style={{ height: '300px', overflow: 'scroll' }}>
          {comments &&
            comments.map((item, idx) => (
              <div key={idx} className="blog-comments__item d-flex p-3">
                <div className="blog-comments__avatar mr-3">
                  <img src={item.avatar_url} alt={item.username} />
                </div>
                <div className="blog-comments__content">
                  <div className="blog-comments__meta text-mutes">
                    <span className="text-secondary">{item.username}</span>{' '}
                    <span className="text-muted">
                      - {new Date(item.created_at).toDateString()}
                    </span>
                  </div>
                  <p className="m-0 my-1 mb-2 text-muted">{item.comment}</p>
                  {item.liked_by_me && (
                    <div className="blog-comments__actions">
                      <i className="fas fa-heart text-danger"></i>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  )
}
