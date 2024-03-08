import { useCustomerDetailsQuery } from "api/Customers/getCustomerDetails";
import PageHeader from "components/Common/PageHeader";
import UserDetailsCard from "components/Common/UserDetailsCard";
import Loading from "components/UI/Loading";
import React from "react";

interface Props {
  id?: string;
}

const CustomerDetails = ({ id }: Props) => {
  
  const { isLoading: customerLoading, error: customerError, data: customerRes } = useCustomerDetailsQuery({id});
  let customerData: any = customerRes?.customer.data || {};
if(customerLoading)return<Loading />;
if(customerError)return null;
  return <div>
   <div className="container-xxl">
        <PageHeader headerTitle="Customer Details" />
        <div className="row align-item-center row-deck g-3 mb-3">
          <div >
            <UserDetailsCard user={customerData} />
          </div>
          </div>
          </div>
  </div>;
};

export default CustomerDetails;
