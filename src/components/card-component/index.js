import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Badge,
  CardBody,
  CardFooter,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react'
import ReactPlayer from 'react-player'
import {
  isLoggedIn,
  userLoggedIn,
  wordingLikesContent,
} from '../../utils/helpers'

/**
 *
 * @param {string} props.linkTo,
 * @param {string} props.imageUrlPost,
 * @param {string} props.titleTagPost,
 * @param {string} props.descriptionPost,
 * @param {string} props.textContentPost,
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
  textContentPost,
  datePost,
  countLikePost,
  likePost,
  whoLikesContent,
  countCommentPost,
  imageUrlCreator,
  titleCreator,
  idCreator,
  size,
  handleClickLike,
}) {
  const [isShow, setIsSHow] = React.useState(false)

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
          >
            {size === 'sm' && (
              <Badge pill className={`card-post__category bg-primary`}>
                <span style={{ textTransform: 'capitalize' }}>
                  {titleTagPost}
                </span>
              </Badge>
            )}
          </div>
          <CardBody>
            {size === 'lg' && (
              <Badge pill className={`card-post__category bg-primary`}>
                <span style={{ textTransform: 'capitalize' }}>
                  {titleTagPost}
                </span>
              </Badge>
            )}
            <p className="card-text text-muted" style={{ fontSize: '14px' }}>
              {descriptionPost}
            </p>
            {textContentPost && (
              <div
                style={{ color: '#343a40' }}
                dangerouslySetInnerHTML={{ __html: textContentPost }}
              />
            )}
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
            {titleTagPost && (
              <Badge pill className={`card-post__category bg-primary`}>
                <span style={{ textTransform: 'capitalize' }}>
                  {titleTagPost}
                </span>
              </Badge>
            )}
            <p
              className="card-text text-muted"
              style={{ fontSize: '18px', margin: '0' }}
            >
              {descriptionPost}
            </p>
            {textContentPost && (
              <div dangerouslySetInnerHTML={{ __html: textContentPost }} />
            )}
          </CardBody>
        </React.Fragment>
      )}

      <CardFooter className="border-top d-flex">
        <div className="card-post__author d-flex">
          <Link
            to={`${
              userLoggedIn().username === titleCreator
                ? '/me'
                : '/profile/' + idCreator
            }`}
            style={{ textDecoration: 'none' }}
          >
            <span
              className="card-post__author-avatar card-post__author-avatar--small"
              style={{
                backgroundImage: `url('${imageUrlCreator}')`,
              }}
            ></span>
          </Link>
          <div className="d-flex flex-column justify-content-center ml-3">
            <Link
              to={`${
                userLoggedIn().username === titleCreator
                  ? '/me'
                  : '/profile/' + idCreator
              }`}
              style={{ textDecoration: 'none', color: '#3d5170' }}
            >
              <span className="card-post__author-name">{titleCreator}</span>
            </Link>
            <small className="text-muted">
              {new Date(datePost).toDateString()}
            </small>
          </div>
        </div>
        <div className="my-auto ml-auto">
          {whoLikesContent && (
            <span className="mr-1">
              {wordingLikesContent(whoLikesContent, countLikePost)}
            </span>
          )}
          {isLoggedIn() ? (
            <React.Fragment>
              <Button
                id={`${elementId}`}
                className="mr-1"
                size="sm"
                theme="white"
                onClick={handleClickLike}
              >
                <i
                  className={`fas fa-heart ${likePost ? 'text-danger' : ''}`}
                  title="like"
                />{' '}
                <span>{countLikePost}</span>
              </Button>
              <Button size="sm" theme="white">
                <i className="fas fa-comment" title="comment" />{' '}
                {countCommentPost}
              </Button>
              <Dropdown
                open={isShow}
                toggle={() => setIsSHow(isShow => !isShow)}
                addonType="append"
              >
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu small right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </React.Fragment>
          ) : (
            <Link to={`/login`}>
              <Button
                id={`${elementId}`}
                className="mr-1"
                size="sm"
                theme="white"
                onClick={handleClickLike}
              >
                <i
                  className={`fas fa-heart ${likePost ? 'text-danger' : ''}`}
                  title="like"
                />{' '}
                <span>{countLikePost}</span>
              </Button>
              <Button size="sm" theme="white">
                <i className="fas fa-comment" title="comment" />{' '}
                {countCommentPost}
              </Button>
            </Link>
          )}
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
