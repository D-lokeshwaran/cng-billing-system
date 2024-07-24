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
    }
  }

  const series = [
    {
      name: "Revenue",
      data: data
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