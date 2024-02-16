<<<<<<< HEAD
=======
import React from "react";

>>>>>>> develop
// this will contain the employee profile page
// to be showing for any other employee.

// ANY MUTUAL COMPONENTS WOULD BE AT COMPONENTS/ACCOUNT
// mutual components will be shared with deferent Props

<<<<<<< HEAD
import DataTable from "react-data-table-component";
import { TimeAttendanceData } from "components/Data/AppData";
import { EmployeesYearlyStatusData } from "components/Data/ChartData";
import GeneralChartCard from "components/Account/TodayTimeUtilisation";
import { useSingleEmployeeQuery } from "api/employee/getSingleEmployee";
import { useUI } from "contexts/UIContext";

import { useAuth } from "contexts/AuthContext";
import React, { lazy, useRef, useState } from "react";
import { handleServerError } from "utils/inputValidator";
import { useUpdateUserSign, userSignInput } from "api/user/updateUserSign";
import ImageCard from "components/Settings/ImageCard";

const ClientTaskCard = lazy(() => import("components/Account/ClientTaskCard"));
const PageHeader = lazy(() => import("components/Common/PageHeader"));

const EmployeeProfileCard = lazy(
  () => import("components/Account/EmployeeProfileCard")
);
const Loading = lazy(() => import("../../components/UI/Loading"));

interface Props {
  id?: string;
}

const EmployeeProfileDetails: React.FC<Props> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // user sign
  const [signFile, setSIgnFile] = useState<File | null>(null);

  const { session, setSession } = useAuth();
  const { showError, showSuccess } = useUI();
  const { mutateAsync: updateUserSignMutation } = useUpdateUserSign();

  const {
    isLoading: employeeLoading,
    error: EmployeeError,
    data: employeeRes,
  } = useSingleEmployeeQuery({});

  // let attendanceData: any = attendanceRes?.attendance.data || {};
  let employeeData: any = employeeRes?.employee.data || {};

  // const { status, shift_start, shift_end, total_Shift_Hours, enter_time, leave_time, over_time } = attendanceData;
  if (employeeLoading) return <Loading />;
  if (EmployeeError) return null;

  const handleUpdateSign = async () => {
    try {
      let updateInput = userSignInput({ sign: signFile });
      let userRes = await updateUserSignMutation(updateInput);
      showSuccess();
      setSession({
        ...session,
        user: {
          ...session?.user!,
          sign: userRes?.data.sign || "",
        },
      });

      localStorage.setItem(
        "session",
        JSON.stringify({
          ...session,
          user: {
            ...session?.user!,
            sign: userRes?.data?.sign || "",
          },
        })
      );
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response?.data?.msg!));
    }
  };

  return (
    <>
      <div className="container-xxl">
        <PageHeader headerTitle="Profile" />
        <div className="row align-item-center row-deck g-3 mb-3">
          <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-12">
            <EmployeeProfileCard user={employeeData} />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-12">
            <ClientTaskCard />
          </div>

          <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12">
            {/* User Sign Card */}
            <ImageCard
              title={"Sign"}
              defaultUrl={employeeData?.sign!}
              onSave={handleUpdateSign}
            />
          </div>

          <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-12">
            <GeneralChartCard
              Title="Employees Yearly Status"
              identity="Employessyearlystatus"
              data={EmployeesYearlyStatusData}
              TitleRight={undefined}
              extraDivBody={undefined}
              footerBody={undefined}
            />
          </div>
        </div>
        <div className="row clearfix g-3">
          <div className="col-sm-12">
            <DataTable
              title={TimeAttendanceData.title}
              columns={TimeAttendanceData.columns}
              data={TimeAttendanceData.rows}
              defaultSortFieldId={1}
              pagination
              selectableRows={false}
              className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
              highlightOnHover={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

=======
const EmployeeProfileDetails = () => {
  return <div></div>;
};

>>>>>>> develop
export default EmployeeProfileDetails;
