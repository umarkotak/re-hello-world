import React from 'react'
import { Row, Col } from 'shards-react'
import { HashLoader } from 'react-spinners'

export default function LoadingComponent() {
  return (
    <Row>
      <Col md="12" lg="12">
        <div
          style={{
            padding: '10rem',
          }}
        >
          <div className="error__content">
            <HashLoader color={`#007bff`} size={50} />
          </div>
        </div>
      </Col>
    </Row>
  )
}
