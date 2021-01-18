import React from 'react'
import {
  Container,
  Row,
  Col,
  FormFeedback,
  FormInput,
  FormGroup,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from 'shards-react'
import { Link } from 'react-router-dom'
import { RegisterAccount } from '../../api'

export default function Register() {
  const warning = {
    username: 'Please enter your username',
    email: 'Please enter your email',
    password: 'Please enter your password',
    password_confirmation: 'Your password confirmation not same with password',
  }
  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [isInvalid, setIsInvalid] = React.useState({
    username: false,
    email: false,
    password: false,
    password_confirmation: false,
  })
  const [responseMessage, setResponseMessage] = React.useState({
    isError: false,
    isShow: false,
    message: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const HandleSubmit = () => {
    setIsLoading(true)
    RegisterAccount({ data }).then(res => {
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
          message: 'Account Register Success',
        })
        setTimeout(() => {
          setResponseMessage({
            ...responseMessage,
            isShow: false,
          })
        }, 3000)
      }
    })
  }

  const HandleChange = (value, key) => {
    setData({
      ...data,
      [key]: value,
    })
  }

  const HandleKeyUp = (value, key) => {
    const { password } = data
    setIsInvalid({
      ...isInvalid,
      [key]:
        (key === 'password_confirmation' && value !== password) || value === ''
          ? true
          : false,
    })
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4"></Row>
      <Row>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Register</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  {responseMessage.isShow && (
                    <Alert
                      className={`${
                        responseMessage.isError
                          ? 'alert-danger'
                          : 'alert-primary'
                      }`}
                    >
                      <i className="fa fa-info mx-2"></i>{' '}
                      {responseMessage.message}
                    </Alert>
                  )}
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label htmlFor="feUsername">Username</label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon type="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <FormInput
                          placeholder="ex: John Doe"
                          invalid={isInvalid.username}
                          value={data.username}
                          onChange={e =>
                            HandleChange(e.target.value, 'username')
                          }
                          onKeyUp={e => HandleKeyUp(e.target.value, 'username')}
                        />
                        <FormFeedback>{warning.username}</FormFeedback>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        id="feEmail"
                        type="email"
                        placeholder="ex: johndoe@gmail.com"
                        invalid={isInvalid.email}
                        value={data.email}
                        onChange={e => HandleChange(e.target.value, 'email')}
                        onKeyUp={e => HandleKeyUp(e.target.value, 'email')}
                      />
                      <FormFeedback>{warning.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="fePassword">Password</label>
                      <FormInput
                        id="fePassword"
                        type="password"
                        invalid={isInvalid.password}
                        value={data.password}
                        onChange={e => HandleChange(e.target.value, 'password')}
                        onKeyUp={e => HandleKeyUp(e.target.value, 'password')}
                      />
                      <FormFeedback>{warning.password}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="feConfirmPassword">
                        Confirm Password
                      </label>
                      <FormInput
                        id="feConfirmPassword"
                        type="password"
                        invalid={isInvalid.password_confirmation}
                        value={data.password_confirmation}
                        onChange={e =>
                          HandleChange(e.target.value, 'password_confirmation')
                        }
                        onKeyUp={e =>
                          HandleKeyUp(e.target.value, 'password_confirmation')
                        }
                      />
                      <FormFeedback>
                        {warning.password_confirmation}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      Have account? <Link to={`/login`}>Login Here</Link>
                    </FormGroup>
                    <Button
                      onClick={() => HandleSubmit()}
                      disabled={
                        isInvalid.username === true ||
                        (data.username === '' && isInvalid.email === true) ||
                        (data.email === '' && isInvalid.password === true) ||
                        (data.password === '' &&
                          isInvalid.password_confirmation === true) ||
                        data.password_confirmation === '' ||
                        data.password_confirmation !== data.password
                      }
                    >
                      {isLoading ? 'Loading ...' : 'Create New Account'}
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
