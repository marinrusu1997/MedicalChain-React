import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export class RecordsBySpecialitiesChart extends React.Component {

   constructor(props) {
      super(props)
      this.barChartOptions = {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
            xAxes: [
               {
                  barPercentage: 1,
                  gridLines: {
                     display: true,
                     color: "rgba(0, 0, 0, 0.3)"
                  }
               }
            ],
            yAxes: [
               {
                  gridLines: {
                     display: true,
                     color: "rgba(0, 0, 0, 0.3)"
                  },
                  ticks: {
                     beginAtZero: true
                  }
               }
            ]
         }
      }
   }

   render() {
      return (
         <MDBContainer>
            <i><b><h3 className="mt-5">Electronic Health Records Per Specialty</h3></b></i>
            <Bar
               data={{
                  labels: this.props.labels,
                  datasets: [{
                     label: "No of records",
                     data: this.props.data,
                     backgroundColor: "rgba(245, 74, 85, 0.5)",
                     borderWidth: 1
                  }]
               }}
               options={this.barChartOptions} />
         </MDBContainer>
      );
   }
}