import axios from "axios";

export const createBill = bill => axios.post('api/bills', bill);

export const getBills = () => axios.get("api/bills");