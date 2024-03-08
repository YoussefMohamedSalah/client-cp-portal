
import { useSupplierDetailsQuery } from "api/Suppliers/getSupplierDetails";
import PageHeader from "components/Common/PageHeader";
import UserDetailsCard from "components/Common/UserDetailsCard";
import Loading from "components/UI/Loading";

interface Props {
  id?: string;
}

const SupplierDetails = ({ id }: Props) => {
  const { isLoading: supplierLoading, error: supplierError, data: supplierData } = useSupplierDetailsQuery({ id });
  let supplier: any = supplierData?.supplier.data || {};
  if (supplierLoading) return <Loading />;
  if (supplierError) return null;
  return (
    <div>
      <div className="container-xxl">
        <PageHeader headerTitle="Supplier Details" />
        <div className="row align-item-center row-deck g-3 mb-3">
          <div >
            <UserDetailsCard user={supplier} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
