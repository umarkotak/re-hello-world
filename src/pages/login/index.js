import React, {useState} from 'react'
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
} from 'shards-react'
import Cookies from 'js-cookie'

export default function Login() {
  const [email, set_email] = useState("")
  const [password, set_password] = useState("")


  async function handleLogin() {
    try {
      const response = await fetch("http://47.254.247.135/eartho/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
      const results = await response.json()
      const status = await response.status

      if (status === 200) {
        Cookies.set("user_data_logged_in", true)
        Cookies.set("user_data_auth_token", results.data.authentication_token)
        Cookies.set("user_data_username", results.data.username)
        Cookies.set("user_data_email", results.data.email)
        Cookies.set("user_data_role", results.data.role)

        window.location.href = "/"
      } else {
        console.log(status, results)
      }
    } catch (error) {
      console.log(error)
    }
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
        <Row noGutters className="page-header py-4">
        </Row>
        <Row>
          <Col sm={{ size: 8, order: 2, offset: 2 }}>
            <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Login</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmailAddress">Email</label>
                            <FormInput
                              id="feEmailAddress"
                              type="email"
                              placeholder="Email"
                              onChange={(e) => set_email(e.target.value)}
                            />
                          </Col>
                          <Col md="6">
                            <label htmlFor="fePassword">Password</label>
                            <FormInput
                              id="fePassword"
                              type="password"
                              placeholder="Password"
                              onChange={(e) => set_password(e.target.value)}
                            />
                          </Col>
                        </Row>

                        <Button
                          className="float-right"
                          type="submit"
                          onClick={() => handleLogin()}
                        >
                          <i className="material-icons">login</i> Login
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
