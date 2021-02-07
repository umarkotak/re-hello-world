import React from 'react'
import { Row, Col, Button, Badge } from 'shards-react'
import CardComponent from '../../components/card-component'
import LoadingComponent from './loading-component'

export default function AllPosts({ isLoading, data, HandleClickLike }) {
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingComponent />
      ) : data && data.feeds.length ? (
        data.feeds.map((item, idx) => (
          <React.Fragment key={String(idx)}>
            <Row noGutters className="page-header py-4">
              <h4 className="text-sm-left" style={{ margin: '0' }}>
                <span style={{ textTransform: 'capitalize' }}>
                  {item.title}
                  <Badge pill theme="primary" className="ml-2">
                    {item && item.contents.length}
                  </Badge>
                </span>
              </h4>
            </Row>
            <Row>
              {item &&
                item.contents.map((items, i) => (
                  <Col lg="6" md="6" key={String(i)}>
                    <CardComponent
                      elementId={`posts-${items.content_id}`}
                      linkTo={`/post/${items.content_id}`}
                      imageUrlPost={items.image_url}
                      titleTagPost={item.title}
                      descriptionPost={items.title}
                      textContentPost={items.description}
                      datePost={items.created_at}
                      countLikePost={items.count_like}
                      likePost={items.liked_by_me}
                      countCommentPost={items.count_comment}
                      imageUrlCreator={items.creator_avatar_url}
                      titleCreator={items.creator_name}
                      idCreator={items.creator_id}
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
    </React.Fragment>
  )
}
