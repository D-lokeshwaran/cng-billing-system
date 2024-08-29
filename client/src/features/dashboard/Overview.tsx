import Chart from "react-apexcharts";
import { Card, Dropdown, FormSelect } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { useState, useMemo } from "react";

const Overview = ({ data }) => {
  const [ filter, setFilter ] = useState("monthly")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weeks = ["week1", "week2", "week3", "week4", "week5"];
  const getWeek = function(date) {
      var janOne = new Date(2024, 0, 1);
      var dayOfYear = ((date - janOne + 86400000) / 86400000);
      return Math.ceil(dayOfYear / 7);
  }
  const today = new Date();
  const firstWeekOfMonth = getWeek(new Date(today.getFullYear(), today.getMonth(), 1));
  const lastWeekOfMonth = getWeek(new Date(today.getFullYear(), today.getMonth() +1, 0));
  var weekValues = [];
  for (var i = firstWeekOfMonth; i <= lastWeekOfMonth; i++)
    weekValues.push(i);

  const calculatedData = useMemo(() => {
    const dateBasedOnFilter = data[filter];
    let calculatedData = [];
    if (filter === "monthly") {
      months.forEach((month, index) => {
        let val = 0;
        dateBasedOnFilter?.forEach(monthData => {
          if (monthData.month -1 === index) {
            val = monthData.revenue;
          }
        });
        calculatedData.push(val);
      })
    } else {
      weekValues.forEach(week => {
        let val = 0;
        dateBasedOnFilter?.forEach(weekData => {
          if (weekData.week == week) {
            val = weekData.revenue;
          }
        })
        calculatedData.push(val);
      });
    }
    return calculatedData;
  }, [data, filter])

  const options = {
    chart: {
      id: "overview",
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: filter == "monthly" ? months : weeks
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
    }
  }

  const series = [
    {
      name: "revenue",
      data: calculatedData
    }
  ]

return (
  <Card>
    <Card.Header className="border-0">
      <FlexBox justify="between">
        <div>Overview</div>
        <div>
          <FormSelect size="sm" onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </FormSelect>
        </div>
      </FlexBox>
    </Card.Header>
    <Chart
      type="bar"
      series={series}
      options={options}
      height={340}
    />
  </Card>
)
}
export default Overview;