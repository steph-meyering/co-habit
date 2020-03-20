import axios from "axios";

export const createBill = bill => {
    return axios.post('/api/bills/', bill);
}    

export const getBills = () => {
    return axios.get("/api/bills");
}

export const deleteBill = (bill) => {
    return axios.delete(`/api/bills/${bill._id}`)
}

export const updateBill = bill => {
  return axios.patch(`/api/bills/${bill._id}`, bill);
};
