import React from 'react'
import { Container, Row, Col } from 'shards-react'
import { ProfileMe } from '../../api'
import { randomColor } from '../../utils/helpers'
import PageTitle from '../../components/common/PageTitle'
import UserDetail from './user-detail'
import PostDetail from './post-detail'
import LoadingComponent from './loading-component'

export default function Me() {
  const [data, setData] = React.useState()
  const [dataChart, setdataChart] = React.useState()
  const [showChart, setShowChart] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ProfileMe().then(res => {
      let chart_data = {
        datasets: [
          {
            hoverBorderColor: '#ffffff',
            data: [],
            backgroundColor: [],
          },
        ],
        labels: [],
      }
      const { data, isLoading, isError } = res
      if (!isError) {
        if (data && data.categories.length) {
          chart_data.datasets[0].data = data.categories.map(
            item => item.contents.length,
          )
          chart_data.datasets[0].backgroundColor = randomColor(
            data.categories.length,
          )
          chart_data.labels = data.categories.map(item => item.title)
          setShowChart(true)
          setdataChart(chart_data)
        } else {
          setShowChart(false)
          setdataChart(chart_data)
        }
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
                <UserDetail
                  data={data}
                  dataChart={dataChart}
                  showChart={showChart}
                />
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
