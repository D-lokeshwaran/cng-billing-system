import Chart from "react-apexcharts";
import { Card, Dropdown, FormSelect } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";

const Overview = ({ data }) => {

  const options = {
    chart: {
      id: "overview"
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
    }
  }

  const series = [
    {
      name: "Sales",
      data: [14, 23, 14, 34, 26, 70, 20, 23]
    },
    {
      name: "Revenue",
      data: [80, 76, 86, 80, 73, 93, 30, 61]
    }
  ]

return (
  <Card>
    <Card.Header>
      <FlexBox justify="between">
        <div>Overview</div>
        <div>
          <FormSelect size="sm">
            <option>Yearly</option>
            <option>Monthly</option>
            <option>Weekly</option>
          </FormSelect>
        </div>
      </FlexBox>
    </Card.Header>
    <Chart
      type="bar"
      series={series}
      options={options}
      width={400}
      height={364}
    />
  </Card>
)
}
export default Overview;