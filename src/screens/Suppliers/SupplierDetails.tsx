
import { useSupplierDetailsQuery } from "api/Suppliers/getSupplierDetails";
import PageHeader from "components/Common/PageHeader";
import UserDetailsCard from "components/Common/UserDetailsCard";
import Loading from "components/UI/Loading";
import React from "react";

interface Props {
  id?: string;
}

const SupplierDetails = ({ id }: Props) => {
  
  const { isLoading: supplierLoading, error: supplierError, data: supplierRes } = useSupplierDetailsQuery({id});
  let supplierData: any = supplierRes?.supplier.data || {};
if(supplierLoading)return<Loading />;
if(supplierError)return null;
  return <div>
   <div className="container-xxl">
        <PageHeader headerTitle="Supplier Details" />
        <div className="row align-item-center row-deck g-3 mb-3">
          <div >
            <UserDetailsCard user={supplierData} />
          </div>
          </div>
          </div>
  </div>;
};

export default SupplierDetails;
