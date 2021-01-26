import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'shards-react'
import { userLoggedIn } from '../../utils/helpers'
import DataChart from './data-chart'

export default function UserDetail({ data, dataChart, showChart }) {
  return (
    <React.Fragment>
      {data && (
        <Card small className="mb-4 pt-3">
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={userLoggedIn().avatar_url}
                alt={data.username}
                width="110"
              />
            </div>
            <h4 className="mb-0">{data.username}</h4>
            <span className="text-muted d-block mb-2">{data.email}</span>
          </CardHeader>
          <CardBody>
            {showChart && (
              <ListGroup flush>
                <h6 className="text-center mt-1">Diagram all posts</h6>
                <ListGroupItem className="px-4">
                  <DataChart chartData={dataChart} />
                </ListGroupItem>
              </ListGroup>
            )}
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}
