import React from 'react'
import { Card, CardBody } from 'shards-react'

export default function UserDetail({ data }) {
  return (
    <React.Fragment>
      {data && (
        <Card small className="mb-4 pt-3">
          <CardBody className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={data.avatar_url}
                alt={data.username}
                width="110"
              />
            </div>
            <h4 className="mb-0">{data.username}</h4>
            <span className="text-muted d-block mb-2">{data.email}</span>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}
