import React from "react";
import BillItem from './bill_item';

class BillsIndex extends React.Component {
    
    componentDidMount(){
        this.props.fetchBills()
    }

    render(){
        if (this.props.bills.length === 0) return null;
        debugger
        let billItems = this.props.bills.map((bill) => <BillItem 
            bill = {bill}
        />)
        debugger;
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