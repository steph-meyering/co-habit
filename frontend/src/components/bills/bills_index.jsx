import React from "react";
import BillItem from "./bill_item";
import BillFormContainer from "./bill_form_container";
import PieChart from "react-minimal-pie-chart";
import Fade from "react-reveal/Fade";

class BillsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.pieChart = this.pieChart.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchBills()
      .then(() =>
        this.props
          .getAcceptedUsers(this.props.currentUser.household)
          .then(() => this.calcPieData())
      );
  }

  
  isMyBill(bill) {
    // check if current user is bill author
    if (this.props.currentUser.id === bill.user) return bill;
  }

  calcPieData() {

    // create an object with the id's and names of all housemates in current household
    let names = {};
    for (const user in this.props.housemates) {
      names[this.props.housemates[user]._id] = this.props.housemates[user].name;
    }

    // default colors assigned to represent each housemate in the pie chart 
    const colors = [
      "#88C9C9",
      "#7AD3B7",
      "#297373",
      "#506C84",
      "#afe0ce",
      "#edffff",
      "#849ca5",
      "#904e55",
      "#031a6b"
    ];

    // sum the amount each housemate has logged
    let paidEach = {};

    for (const bill of this.props.bills) {
      if (paidEach[bill.user]) {
        paidEach[bill.user] += bill.amount;
      } else {
        paidEach[bill.user] = bill.amount;
      }
    }

    // shape pieData into PieChart format and add color for each house mate
    let pieData = [];
    for (const name in names) {
      pieData.push({
        title: names[name],
        value: paidEach[name] || 0,
        color: colors.shift(),
        userId: name
      });
    }
    this.props.updatePieChart(pieData);    
  }

  pieChart() {
    if (this.props.pieChart instanceof Array) {
      return (
        <PieChart
          className="pie-chart"
          data={this.props.pieChart}
          radius={45}
          onMouseOver={(e, propsData, dataIndex) => {
            const data = propsData.map((entry, i) => {
              if (i === dataIndex) {
                return {
                  ...entry,
                  // onMouseOver event: save original color + title, then over-write them.
                  ogColor: entry.color,
                  ogTitle: entry.title,
                  color: "#afe0ce",
                  title: `${entry.value}$`,
                  style: {
                    ...entry.style,
                    strokeWidth: 10,
                    WebkitTransition: "all 0.7s"
                  }
                };
              } else {
                return entry;
              }
            });
            this.props.updatePieChart(data);
          }}
          onMouseOut={(e, propsData, dataIndex) => {
            const data = propsData.map((entry, i) => {
              if (i === dataIndex) {
                return {
                  ...entry,
                  // onMouseOut event: revert color and title to saved originals
                  color: entry.ogColor,
                  title: entry.ogTitle,
                  style: {
                    ...entry.style,
                    strokeWidth: 7
                  }
                };
              } else {
                return entry;
              }
            });
            this.props.updatePieChart(data);
          }}
          animate
          animationDuration={700}
          startAngle={0}
          animationEasing="ease-out"
          lineWidth={15}
          label={props => {
            return `${props.data[props.dataIndex].title}`;
          }}
          paddingAngle={5}
          labelPosition={75}
          labelStyle={{
            fill: "#121212",
            fontSize: "5px"
          }}
        />
      );
    }
  }

  render() {
    if (!this.props.housemates) {
      return null;
    }
    if (this.props.bills.length < 1) {
      return (
        <div>
          <div>No Bills Yet</div>
          <BillFormContainer />
        </div>
      );
    }

    if (Object.keys(this.props.housemates).length === 0) {
      return <div>...loading housemates</div>;
    }

    // if (this.props.loading) {
    //     return <div>...loading</div>;
    // }
    let billItems = this.props.bills.map(bill => {
      return (
        <BillItem
          bill={bill}
          key={bill._id}
          isMine={this.isMyBill(bill) ? true : false}
          deleteBill={this.props.deleteBill}
          updateBill={this.props.updateBill}
          owner={this.props.housemates[bill.user].name}
        />
      ); 
    });

    return (
      <Fade>
        <div className="bills-container">
          {/* <h3>All household bills: </h3> */}
          <ul className="bills-index">{billItems}</ul>
          <div className="chart-and-form">
            {this.pieChart()}
            <BillFormContainer />
          </div>
        </div>
      </Fade>
    );
  }
}

export default BillsIndex;
