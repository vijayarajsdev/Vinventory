import { getService, postService } from "./apiservice";

export const CustomerService = () => {
  const customerdata = getService("/customers");
  return customerdata;
};
export const AddCustomerService = (data) => {
  const customerdata = postService("/customers/addcustomer", data);
  return customerdata;
};
