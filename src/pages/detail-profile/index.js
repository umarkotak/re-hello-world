import React from 'react'
import { Container, Row, Col } from 'shards-react'
import { ProfileDetail } from '../../api'
import PageTitle from '../../components/common/PageTitle'
import UserDetail from './user-detail'
import PostDetail from './post-detail'
import LoadingComponent from './loading-component'

export default function Me({ match }) {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ProfileDetail(match.params.id).then(res => {
      const { data, isLoading, isError } = res
      if (!isError) {
        setData(data)
        setIsLoading(isLoading)
      } else {
        setIsLoading(isLoading)
      }
    })
  }, [])

  return (
    <Container fluid className="main-content-container px-4">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        data && (
          <React.Fragment>
            <Row noGutters className="page-header py-4">
              <PageTitle
                title="User Profile"
                subtitle="Overview"
                md="12"
                className="ml-sm-auto mr-sm-auto"
              />
            </Row>
            <Row>
              <Col lg="5">
                <UserDetail data={data} />
              </Col>
              <Col lg="7">
                <PostDetail data={data && data.categories} />
              </Col>
            </Row>
          </React.Fragment>
        )
      )}
    </Container>
  )
}
