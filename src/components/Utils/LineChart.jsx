import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


export class LineChart extends React.Component {

   render() {
      const dataLines = {
         labels: this.props.labels,
         datasets: [
            {
               label: this.props.datasets.first.label,
               fill: true,
               lineTension: 0.1,
               backgroundColor: "rgba(245, 74, 85, 0.3)",
               borderColor: "rgba(245, 74, 85,1)",
               borderCapStyle: "butt",
               borderDash: [],
               borderDashOffset: 0.0,
               borderJoinStyle: "miter",
               pointBorderColor: "rgba(245, 74, 85,1)",
               pointBackgroundColor: "#fff",
               pointBorderWidth: 1,
               pointHoverRadius: 5,
               pointHoverBackgroundColor: "rgba(245, 74, 85,1)",
               pointHoverBorderColor: "rgba(220,220,220,1)",
               pointHoverBorderWidth: 2,
               pointRadius: 1,
               pointHitRadius: 10,
               data: this.props.datasets.first.data
            },
            {
               label: this.props.datasets.second.label,
               fill: true,
               lineTension: 0.1,
               backgroundColor: "rgba(90, 173, 246, 0.3)",
               borderColor: "rgba(90, 173, 246,1)",
               borderCapStyle: "butt",
               borderDash: [],
               borderDashOffset: 0.0,
               borderJoinStyle: "miter",
               pointBorderColor: "rgba(90, 173, 246,1)",
               pointBackgroundColor: "#fff",
               pointBorderWidth: 1,
               pointHoverRadius: 5,
               pointHoverBackgroundColor: "rgba(90, 173, 246,1)",
               pointHoverBorderColor: "rgba(220,220,220,1)",
               pointHoverBorderWidth: 2,
               pointRadius: 1,
               pointHitRadius: 10,
               data: this.props.datasets.second.data
            }
         ]
      }
      return (
         <MDBContainer>
            <h3 className="mt-5">{this.props.chartName}</h3>
            <Line data={dataLines} options={{ responsive: true }} />
         </MDBContainer>
      );
   }
}