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
  FormFeedback,
  Button,
  Alert,
} from 'shards-react'
import { ResetPassword } from '../../api'

export default function ResetPasswordContainer({ location, history }) {
  const { search } = location
  const query = new URLSearchParams(search)
  const [data, setData] = React.useState({
    password: '',
    password_confirmation: '',
  })
  const [invalid, setInvalid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [responseMessage, setResponseMessage] = React.useState({
    isError: false,
    isShow: false,
    message: '',
  })

  const handleSubmit = () => {
    setIsLoading(true)
    ResetPassword({ ...data, forgot_token: query.get('forgot_token') }).then(
      res => {
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
            message:
              'Change new password success, page automatically redirect to login',
          })
          setTimeout(() => {
            setResponseMessage({
              ...responseMessage,
              isShow: false,
            })
            history.push({
              pathname: '/login',
            })
          }, 3000)
        }
      },
    )
  }

  const HandleChange = (value, key) => {
    const { password, password_confirmation } = data
    if (key === 'password_confirmation') {
      value === password ? setInvalid(false) : setInvalid(true)
    } else {
      value === password_confirmation ? setInvalid(false) : setInvalid(true)
    }
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
          <Col sm={{ size: 6, order: 3, offset: 3 }}>
            <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Reset Password</h6>
              </CardHeader>
              <ListGroup flush>
                <Container fluid className="px-0">
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
                </Container>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Row form className="mb-2">
                        <Col md="12" lg="12" className="form-group">
                          <label htmlFor="fePassword">New Password</label>
                          <FormInput
                            id="fePassword"
                            type="password"
                            placeholder="New Password ..."
                            value={data.password}
                            onChange={e =>
                              HandleChange(e.target.value, 'password')
                            }
                          />
                        </Col>
                        <Col md="12" lg="12" className="form-group">
                          <label htmlFor="feConfirmPassword">
                            New Password Confirmation
                          </label>
                          <FormInput
                            id="feConfirmPassword"
                            type="password"
                            invalid={invalid}
                            placeholder="New Password confirmation ..."
                            value={data.password_confirmation}
                            onChange={e =>
                              HandleChange(
                                e.target.value,
                                'password_confirmation',
                              )
                            }
                          />
                          <FormFeedback>
                            Confirm password must be the same as the password
                          </FormFeedback>
                        </Col>
                      </Row>
                      <Button
                        className="float-right"
                        type="submit"
                        onClick={() => handleSubmit()}
                        disabled={
                          !data.password_confirmation ||
                          !data.password ||
                          isLoading ||
                          invalid
                        }
                      >
                        {isLoading ? `Loading ...` : <span>Send</span>}
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
