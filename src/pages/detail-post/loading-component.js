import React from 'react'
import { Row, Col } from 'shards-react'
import { HashLoader } from 'react-spinners'

export default function LoadingComponent() {
  return (
    <Row>
      <Col className="d-flex justify-content-center align-items-center">
        <HashLoader color={`#007bff`} size={50} />
      </Col>
    </Row>
  )
}
