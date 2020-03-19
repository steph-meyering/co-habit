import React from "react";
import BillItem from './bill_item';

class BillsIndex extends React.Component {
    
    componentDidMount(){
        this.props.fetchBills()
    }

    render(){
        if (this.props.bills.length === 0) {
            return <div>No Bills Yet</div>;
        }

        let billItems = this.props.bills.map(bill => <BillItem 
            bill = {bill}
            key = {bill._id}
        />
        )

        return(
            <div>
                <ul>
                    {billItems}
                </ul>
            </div>
        )
    }
}

export default BillsIndex;