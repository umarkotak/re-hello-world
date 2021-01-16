import React from 'react'
import { Card, CardBody, Form, FormTextarea } from 'shards-react'

const Editor = () => (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormTextarea size="lg" className="mb-3" placeholder="Caption" />
      </Form>
    </CardBody>
  </Card>
)

export default Editor
