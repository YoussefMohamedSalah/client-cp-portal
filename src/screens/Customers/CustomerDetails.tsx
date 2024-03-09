import { useCustomerDetailsQuery } from "api/Customers/getCustomerDetails";
import PageHeader from "components/Common/PageHeader";
import UserDetailsCard from "components/Common/UserDetailsCard";
import Loading from "components/UI/Loading";

interface Props {
  id?: string;
}

const CustomerDetails = ({ id }: Props) => {
  const { isLoading: customerLoading, error: customerError, data: customerData } = useCustomerDetailsQuery({ id });
  let customer: any = customerData?.customer.data || {};
  if (customerLoading) return <Loading />;
  if (customerError) return null;
  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Customer Profile" isBackBtn={true} />
      <div className="row g-3 py-1 pt-4">
        <UserDetailsCard user={customer} />
      </div>
    </div>
  );
};

export default CustomerDetails;