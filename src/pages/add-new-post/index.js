import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  FormGroup,
  FormInput,
  FormFeedback,
  FormSelect,
  CardBody,
  CardFooter,
  Alert,
  Button,
} from 'shards-react'
import ReactQuill from 'react-quill'

import { AddPost, ListCategories } from '../../api'
import 'react-quill/dist/quill.snow.css'
import '../../assets/quill.css'

export default function AddNewPost() {
  const warning = {
    title: 'Please enter title',
    description: 'Please enter description',
    text_content: 'Please enter text content',
    category_id: 'Please choose one',
    image_url: 'Please enter image url',
    video_url: 'Please enter video url',
  }
  const [categories, setCategories] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [responseMessage, setResponseMessage] = React.useState({
    isError: false,
    isShow: false,
    message: '',
  })
  const [data, setData] = React.useState({
    title: '',
    description: '',
    category_id: '',
    text_content: '',
    image_url: '',
    video_url: '',
  })

  const [isInvalid, setIsInvalid] = React.useState({
    title: false,
    description: false,
    text_content: false,
    category_id: false,
    image_url: false,
    video_url: false,
  })

  const HandleChange = (value, key) => {
    setData({
      ...data,
      [key]: value,
    })
  }

  const HandleKeyUp = (value, key) => {
    let { text_content } = data
    setIsInvalid({
      ...isInvalid,
      [key]:
        (key === 'text_content' &&
          ['<p><br></p>', ''].includes(text_content)) ||
        !value
          ? true
          : false,
    })
  }

  const ClearData = () => {
    setData({
      ...data,
      title: '',
      description: '',
      category_id: '',
      text_content: '',
      image_url: '',
      video_url: '',
    })
  }

  const HandleSubmit = () => {
    setIsLoading(true)
    AddPost({ data }).then(res => {
      ClearData()
      setIsLoading(false)
      const { isError } = res
      if (isError) {
        setResponseMessage({
          ...responseMessage,
          isError: true,
          isShow: true,
          message: isError[0],
        })
      } else {
        setResponseMessage({
          ...responseMessage,
          isError: false,
          isShow: true,
          message: 'Add Post Success',
        })
      }
    })
  }

  React.useEffect(() => {
    ListCategories().then(res => {
      const { data, isError } = res
      if (!isError) {
        setCategories(data)
      }
    })
  }, [])

  return (
    <Container fluid className="main-content-container px-4 pb-4">
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
              <i className="material-icons">note_add</i> Add New Posts
            </h4>
          </div>
        </Row>
      </div>
      <Row>
        <Col lg="12" md="12">
          <Card small className="card-post overflow-hidden">
            <Container fluid className="px-0">
              {responseMessage.isShow && (
                <Alert
                  className={`${
                    responseMessage.isError ? 'alert-danger' : 'alert-success'
                  }`}
                >
                  <i className="fa fa-info mx-2"></i> {responseMessage.message}{' '}
                </Alert>
              )}
            </Container>
            <CardBody>
              <FormGroup>
                <label htmlFor="feTitlePost">
                  Title Post <span className="text-danger">*required</span>
                </label>
                <FormInput
                  id="feTitlePost"
                  type="text"
                  placeholder="ex: title fun ..."
                  value={data.title}
                  invalid={isInvalid.title}
                  onChange={e => HandleChange(e.target.value, 'title')}
                  onKeyUp={e => HandleKeyUp(e.target.value, 'title')}
                />
                <FormFeedback>{warning.title}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <label htmlFor="feDescPost">
                  Description Post{' '}
                  <span className="text-danger">*required</span>
                </label>
                <FormInput
                  id="feDescPost"
                  type="text"
                  placeholder="ex: description fun ..."
                  value={data.description}
                  invalid={isInvalid.description}
                  onChange={e => HandleChange(e.target.value, 'description')}
                  onKeyUp={e => HandleKeyUp(e.target.value, 'description')}
                />
                <FormFeedback>{warning.description}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <label htmlFor="feCategory">
                  Category <span className="text-danger">*required</span>
                </label>
                <FormSelect
                  value={data.category_id}
                  onChange={e => HandleChange(e.target.value, 'category_id')}
                >
                  <option style={{ display: 'none' }}>-- choose one --</option>
                  {categories &&
                    categories.map((item, idx) => (
                      <option key={String(idx)} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </FormSelect>
                <FormFeedback>{warning.description}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <label htmlFor="feImageUrl">
                  Image Url <span className="text-danger">*required</span>
                </label>
                <FormInput
                  id="feImageUrl"
                  type="text"
                  placeholder="ex: https://icatcare.org/app/uploads/2018/06/Layer-1704-1200x630.jpg"
                  value={data.image_url}
                  invalid={isInvalid.image_url}
                  onChange={e => HandleChange(e.target.value, 'image_url')}
                  onKeyUp={e => HandleKeyUp(e.target.value, 'image_url')}
                />
                <FormFeedback>{warning.image_url}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <label htmlFor="feVideoUrl">Video Url</label>
                <FormInput
                  id="feVideoUrl"
                  type="text"
                  placeholder="ex: https://www.youtube.com/watch?v=4b33NTAuF5E&ab_channel=Kurzgesagt%E2%80%93InaNutshell"
                  value={data.video_url}
                  invalid={isInvalid.video_url}
                  onChange={e => HandleChange(e.target.value, 'video_url')}
                />
                <FormFeedback>{warning.video_url}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <label htmlFor="feTextContentPost">
                  Text Content Post{' '}
                  <span className="text-danger">*required</span>
                </label>
                <div
                  style={{
                    height: '195px',
                    border: `${
                      isInvalid.text_content ? '1px solid #c4183c' : ''
                    }`,
                    borderRadius: '5px',
                  }}
                >
                  <ReactQuill
                    className="add-new-post__editor"
                    value={data.text_content}
                    invalid={true}
                    onChange={val => HandleChange(val, 'text_content')}
                    onKeyUp={val => HandleKeyUp(val, 'text_content')}
                    theme="snow"
                  />
                </div>
                {isInvalid.text_content && (
                  <div
                    style={{
                      fontSize: '80%',
                      color: '#c4183c',
                    }}
                  >
                    {warning.text_content}
                  </div>
                )}
              </FormGroup>
            </CardBody>
            <CardFooter className="border-top d-flex">
              <Button
                disabled={
                  isInvalid.title ||
                  !data.title ||
                  isInvalid.description ||
                  !data.description ||
                  isInvalid.text_content ||
                  ['<p><br></p>', ''].includes(data.text_content) ||
                  isInvalid.image_url ||
                  !data.image_url ||
                  isInvalid.category_id ||
                  !data.category_id
                }
                onClick={() => HandleSubmit()}
              >
                {isLoading ? 'Loading ...' : 'Submit Post'}
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
