import { useSingleEmployeeQuery } from "api/employee/getSingleEmployee";
import ClientTaskCard from "components/Account/ClientTaskCard";
import EmployeeProfileCard from "components/Account/EmployeeProfileCard";
import PageHeader from "components/Common/PageHeader";
import React from "react";

// this is personal profile page will be only available for
// the employee him self,

// ANY MUTUAL COMPONENTS WOULD BE AT COMPONENTS/ACCOUNT
// mutual components will be shared with deferent Props

const PersonalProfile = () => {
  const { isLoading: employeeLoading, error: EmployeeError, data: employeeRes } = useSingleEmployeeQuery({});
console.log('PersonalProfile' ,employeeRes);

let employeeData: any = employeeRes?.employee?.data || {};

  return  (
  <>
  <div className="container-xxl">
    <PageHeader headerTitle="Personal Profile" />
    <div className="row align-item-center row-deck g-3 mb-3">
          <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-12">
            <EmployeeProfileCard user={employeeData} personal={true} />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-12">
            <ClientTaskCard />
          </div>
    </div>   
   </div>
    </>
    )
    
};

export default PersonalProfile;
