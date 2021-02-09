import React from 'react'
import { Container, Row, Col } from 'shards-react'
import {
  DetailPost,
  ListRecommendationPosts,
  LikePost,
  UnlikePost,
  CommentPost,
} from '../../api'
import CardComponent from '../../components/card-component'
import CommentComponent from './comments'
import RecommendationPosts from './recommendation-posts'
import LoadingComponent from './loading-component'

export default function DetailPostContainer({ match }) {
  const [data, setData] = React.useState()
  const [dataRecommendPosts, setDataRecommendPosts] = React.useState()
  const [comment, setComment] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const [isLoadingRecommendPosts, setIsLoadingRecommendPosts] = React.useState(
    true,
  )

  React.useEffect(() => {
    async function FetchDetailPost() {
      if (match.params.id) setIsLoading(true)
      await DetailPost({ id: match.params.id }).then(res => {
        const { data, isError, isLoading } = res
        if (data && data.category_id) {
          ListRecommendationPosts({
            category_id: data && data.category_id,
            content_id: data && data.id,
          }).then(res => {
            const { data, isError, isLoading } = res
            if (!isError) {
              setDataRecommendPosts(data)
              setIsLoadingRecommendPosts(isLoading)
            } else {
              console.log('Error Recommendation Posts ==>', isError)
            }
          })
        }
        if (!isError) {
          setIsLoading(isLoading)
          setData(data)
        } else {
          console.log('Error ==>', isError)
        }
      })
    }
    FetchDetailPost()
  }, [match.params.id])

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

  const HandleOnChange = val => {
    setComment(val)
  }

  const HandleSubmitComment = () => {
    CommentPost({
      data: {
        comment: comment,
      },
      id: match.params.id,
    }).then(res => {
      const { isError } = res
      if (!isError) {
        setComment('')
        setIsLoading(true)
        DetailPost({ id: match.params.id }).then(res => {
          const { data, isError, isLoading } = res
          setIsLoading(isLoading)
          setData(data)
          if (isError) console.log('Error ==>', isError)
        })
      }
    })
  }

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
                  elementId="post-1"
                  imageUrlPost={data.image_url}
                  videoUrlPost={data.video_url}
                  titleTagPost={data.category && data.category.title}
                  descriptionPost={data.description}
                  textContentPost={data.text_content}
                  datePost={data.created_at}
                  countLikePost={data.count_like}
                  likePost={data.liked_by_me}
                  whoLikesContent={data.user_who_likes}
                  countCommentPost={data.count_comment}
                  imageUrlCreator={data.creator_avatar_url}
                  titleCreator={data.creator_name}
                  idCreator={data.creator_id}
                  handleClickLike={() =>
                    HandleClickLike('post-1', match.params.id)
                  }
                  size="lg"
                />
              </Col>
            )}
          </Row>
          <Row>
            <Col lg="7" md="7">
              <CommentComponent
                valueComment={comment}
                HandleOnChange={HandleOnChange}
                HandleSubmitComment={HandleSubmitComment}
                comments={data && data.comments}
              />
            </Col>
            <Col lg="5" md="5">
              <RecommendationPosts
                data={dataRecommendPosts}
                isLoading={isLoadingRecommendPosts}
              />
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  )
}
