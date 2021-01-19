import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, CardBody, CardFooter, Button } from 'shards-react'
import ReactPlayer from 'react-player'

/**
 *
 * @param {string} props.linkTo,
 * @param {string} props.imageUrlPost,
 * @param {string} props.titleTagPost,
 * @param {string} props.descriptionPost,
 * @param {string} props.datePost,
 * @param {string, number} props.countLikePost,
 * @param {string, number} props.countCommentPost,
 * @param {string} props.imageUrlCreator,
 * @param {string} props.titleCreator,
 */
export default function CardComponent({
  elementId,
  linkTo,
  imageUrlPost,
  videoUrlPost,
  titleTagPost,
  descriptionPost,
  datePost,
  countLikePost,
  likePost,
  countCommentPost,
  imageUrlCreator,
  titleCreator,
  size,
  handleClickLike,
}) {
  return (
    <Card small className="card-post mb-4">
      {linkTo ? (
        <Link
          to={`${linkTo}`}
          style={{ textDecoration: 'none', width: '100%' }}
        >
          <div
            className="card-post__image"
            style={{
              backgroundImage: `url(${imageUrlPost})`,
              height: `${size === 'sm' ? '250px' : '500px'}`,
            }}
          ></div>
          <CardBody>
            <Badge pill className={`card-post__category bg-primary`}>
              <span style={{ textTransform: 'capitalize' }}>
                {titleTagPost}
              </span>
            </Badge>
            <p className="card-text text-muted">{descriptionPost}</p>
          </CardBody>
        </Link>
      ) : (
        <React.Fragment>
          <div
            className="card-post__image"
            style={{
              backgroundImage: `url(${!videoUrlPost ? imageUrlPost : ''})`,
              height: `${size === 'sm' ? '250px' : '500px'}`,
              overflow: 'hidden',
            }}
          >
            {videoUrlPost && (
              <ReactPlayer
                url={`${videoUrlPost}`}
                controls
                width="100%"
                height="100%"
              />
            )}
          </div>
          <CardBody>
            <Badge pill className={`card-post__category bg-primary`}>
              <span style={{ textTransform: 'capitalize' }}>
                {titleTagPost}
              </span>
            </Badge>
            <p className="card-text text-muted">{descriptionPost}</p>
          </CardBody>
        </React.Fragment>
      )}

      <CardFooter className="border-top d-flex">
        <div className="card-post__author d-flex">
          <a
            href="/#"
            className="card-post__author-avatar card-post__author-avatar--small"
            style={{
              backgroundImage: `url('${imageUrlCreator}')`,
            }}
          >
            Written by James Khan
          </a>
          <div className="d-flex flex-column justify-content-center ml-3">
            <span className="card-post__author-name">{titleCreator}</span>
            <small className="text-muted">
              {new Date(datePost).toDateString()}
            </small>
          </div>
        </div>
        <div className="my-auto ml-auto">
          <Button
            id={`${elementId}`}
            className="mr-1"
            size="sm"
            theme="white"
            onClick={handleClickLike}
            value={countLikePost}
          >
            <i
              className={`fas fa-heart ${likePost ? 'text-danger' : ''}`}
              title="bookmark"
            />{' '}
            {countLikePost}
          </Button>
          <Button size="sm" theme="white">
            <i className="fas fa-comment" title="bookmark" /> {countCommentPost}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

CardComponent.defaultProps = {
  countLikePost: 0,
  countCommentPost: 0,
  size: 'sm', // sm, lg
}
