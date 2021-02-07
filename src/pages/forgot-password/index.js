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
import { ForgotPasswordAccount } from '../../api'

export default function ForgotPassword() {
  const [data, setData] = React.useState({
    email: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [responseMessage, setResponseMessage] = React.useState({
    isError: false,
    isShow: false,
    message: '',
  })

  const handleSubmit = () => {
    setIsLoading(true)
    ForgotPasswordAccount({ data }).then(res => {
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
          message: 'Forgot password success, please check your email',
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
                <h6 className="m-0">Forgot Password</h6>
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
                      </Row>
                      <Button
                        className="float-right"
                        type="submit"
                        onClick={() => handleSubmit()}
                        disabled={!data.email || isLoading}
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
