import React from 'react'
import Chart from '../../utils/chart'

class DataChart extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const chartConfig = {
      type: 'pie',
      data: this.props.chartData,
      options: {
        ...{
          legend: {
            position: 'bottom',
            labels: {
              padding: 25,
              boxWidth: 20,
            },
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: 'index',
            position: 'nearest',
          },
        },
        ...this.props.chartOptions,
      },
    }

    new Chart(this.canvasRef.current, chartConfig)
  }

  render() {
    return (
      <canvas
        height="220"
        ref={this.canvasRef}
        className="blog-users-by-device m-auto"
      />
    )
  }
}

export default DataChart
