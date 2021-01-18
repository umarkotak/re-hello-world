import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  FormInput,
  Button,
  Alert,
} from 'shards-react'
import { Link } from 'react-router-dom'
import { LoginAccount } from '../../api'

export default function Login() {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [responseMessage, setResponseMessage] = React.useState({
    isError: false,
    isShow: false,
    message: '',
  })

  const handleLogin = () => {
    setIsLoading(true)
    LoginAccount({ data }).then(res => {
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
          message: 'Login Success',
        })
        setTimeout(() => {
          setResponseMessage({
            ...responseMessage,
            isShow: false,
          })
          window.location.href = '/'
        }, 1000)
      }
    })
  }

  const HandleChange = (value, key) => {
    setData({
      ...data,
      [key]: value,
    })
  }

  return (
    <Container fluid className="main-content-container px-4">
      <div
        style={{
          position: 'sticky',
          top: '3.75rem',
          zIndex: '999',
        }}
      >
        <Row noGutters className="page-header py-4"></Row>
        <Row>
          <Col sm={{ size: 8, order: 2, offset: 2 }}>
            <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Login</h6>
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
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feEmailAddress">Email</label>
                          <FormInput
                            id="feEmailAddress"
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={e =>
                              HandleChange(e.target.value, 'email')
                            }
                          />
                        </Col>
                        <Col md="6">
                          <label htmlFor="fePassword">Password</label>
                          <FormInput
                            id="fePassword"
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={e =>
                              HandleChange(e.target.value, 'password')
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" className="form-group"></Col>
                        <Col md="6" className="form-group text-sm-right">
                          Don't have an account yet?{' '}
                          <Link to={`/register`}>Register Here</Link>
                        </Col>
                      </Row>

                      <Button
                        className="float-right"
                        type="submit"
                        onClick={() => handleLogin()}
                      >
                        {isLoading ? (
                          `Loading ...`
                        ) : (
                          <span>
                            <i className="material-icons">login</i> Login
                          </span>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
