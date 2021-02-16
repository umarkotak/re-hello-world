import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'shards-react'
import 'react-quill/dist/quill.snow.css'
import '../../assets/quill.css'

export default function AddNewPost() {
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
              <i className="material-icons">info</i> About
            </h4>
          </div>
        </Row>
      </div>
      <Row>
        <Col lg="12" md="12">
          <Card small className="card-post overflow-hidden">
            <CardBody>
              <Col lg="12" md="12" className="text-center">
                <img
                  src={require('../../assets/logo.png')}
                  alt=""
                  width="100px"
                />
                <p style={{ fontSize: '16px', margin: '10px 0 0 0' }}>
                  <strong>Marian LOL</strong> is a website build for comunity to
                  share their thoughts, findings, ideas, and many other
                  positiveness through image, video and text
                </p>
              </Col>
              <Col lg="12" md="12" className="d-flex justify-content-center">
                <div
                  style={{
                    minWidth: '200px',
                    height: '80px',
                    backgroundImage: `url(${require('../../assets/alibaba.png')})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    margin: '15px',
                  }}
                >
                  &nbsp;
                </div>
                <div
                  style={{
                    minWidth: '200px',
                    height: '80px',
                    backgroundImage: `url(${require('../../assets/codepolitan.png')})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    margin: '15px',
                  }}
                >
                  &nbsp;
                </div>
                <div
                  style={{
                    minWidth: '200px',
                    height: '80px',
                    backgroundImage: `url(${require('../../assets/re-cloud.png')})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    margin: '15px',
                  }}
                >
                  &nbsp;
                </div>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
