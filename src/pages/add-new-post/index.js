import React from 'react'
import { Container, Row, Col } from 'shards-react'

import PageTitle from '../../components/common/PageTitle'
import Editor from '../../components/add-new-post/Editor'

const AddNewPost = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Add New Post"
        subtitle="List Posts"
        className="text-sm-left"
      />
    </Row>
    <Row>
      <Col lg="12" md="12">
        <Editor />
      </Col>
    </Row>
  </Container>
)

export default AddNewPost
