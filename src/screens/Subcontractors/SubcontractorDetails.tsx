import { useSubcontractorDetailsQuery } from "api/Subcontractors/getSubcontractor";
import PageHeader from "components/Common/PageHeader";
import UserDetailsCard from "components/Common/UserDetailsCard";
import Loading from "components/UI/Loading";
import React from "react";

interface Props {
  id?: string;
}

const SubcontractorDetails = ({ id }: Props) => {
  
  const { isLoading: subcontractorLoading, error: subcontractorError, data: subcontractorRes } = useSubcontractorDetailsQuery({id});
  let subcontractorData: any = subcontractorRes?.subcontractor.data || {};
if(subcontractorLoading)return<Loading />;
if(subcontractorError)return null;
  return <div>
   <div className="container-xxl">
        <PageHeader headerTitle="Subcontractor Details" />
        <div className="row align-item-center row-deck g-3 mb-3">
          <div >
            <UserDetailsCard user={subcontractorData} />
          </div>
          </div>
          </div>
  </div>;
};

export default SubcontractorDetails;

