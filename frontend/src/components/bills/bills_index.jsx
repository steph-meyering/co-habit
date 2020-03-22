import React from "react";
import BillItem from './bill_item';
import BillFormContainer from "./bill_form_container";
import PieChart from "react-minimal-pie-chart";

class BillsIndex extends React.Component {
    constructor(props){
      super(props);
      this.pieChart = this.pieChart.bind(this);
    }
    
    componentDidMount(){
        this.props.fetchBills()
        .then(() => this.props.getAcceptedUsers(this.props.currentUser.household)
        .then(() => this.calcPieData()))
    }

    isMyBill(bill){
        if (this.props.currentUser.id === bill.user) return bill
    }

    calcPieData(){
      let names = {};
      for (const user in this.props.housemates) {
        names[this.props.housemates[user]._id] = this.props.housemates[
          user
        ].name;
      }

      let colors = ["#F4976C", "#FBE8A6", "#303C6C", "#B4DFE5", "#D2FDFF"];

      // sum the amount each housemate has logged
      let paidEach = {};

      for (const bill of this.props.bills) {
        if (paidEach[bill.user]) {
          paidEach[bill.user] += bill.amount;
        } else {
          paidEach[bill.user] = bill.amount;
        }
      }

      // shape pieData into PieChart format and add color
      let pieData = [];
      for (const name in names) {
        pieData.push({
          title: names[name],
          value: paidEach[name] || 0,
          color: colors.shift(),
          userId: name
        });
      }
      this.props.updatePieChart(pieData)
      this.setState({pieData: pieData})
    }


    
    pieChart(){
      if (this.props.pieChart instanceof Array) {
        return (
          <PieChart
            data={this.props.pieChart}
            onMouseOver={(e, propsData, dataIndex) => {
              const data = propsData.map((entry, i) => {
                if (i === dataIndex) {
                  return { ...entry, ogColor: entry.color, color: "#000000" };
                } else {
                  return entry;
                }
              });
              this.props.updatePieChart(data);
              debugger
            }}
            onMouseOut={(e, propsData, dataIndex) => {
              const data = propsData.map((entry, i) => {
                if (i === dataIndex) {
                  return { ...entry, color: entry.ogColor };
                } else {
                  return entry;
                }
              });
              this.props.updatePieChart(data);
            }}
            animate
            animationDuration={500}
            startAngle={0}
            animationEasing="ease-out"
            lineWidth={15}
            label={props => {
              return `${props.data[props.dataIndex].title} ${
                props.data[props.dataIndex].value
              }$`;
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
    
    render(){
        if (this.props.bills.length < 2) {
            return (
              <div>
                <div>No Bills Yet</div>
                <BillFormContainer/>
              </div>
            );
        }

        if (Object.keys(this.props.housemates).length === 0){
          return(
            <div>
              ...loading housemates
            </div>
          )
        }

        if (this.props.loading) {
            return <div>...loading</div>;
        }
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
            );});

        return (
          <>
            <h3>All household bills: </h3>
            {this.pieChart()}
            <ul>{billItems}</ul>
            <BillFormContainer />
          </>
        );
    }
}

export default BillsIndex;
