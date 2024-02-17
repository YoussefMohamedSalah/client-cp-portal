import React from "react";
import Loading from "components/UI/Loading";
import { calculateWorkingPercentage } from "utils/Convert";
import { useAttendanceQuery } from "api/Attendance/getUserTodayAttendance";
import { useCreateStartAttendance } from "api/Attendance/createStartAttendance";
import { useCreateEndAttendance } from "api/Attendance/createEndAttendance";
import { Link } from "react-router-dom";
import { useUI } from "contexts/UIContext";
import { useAuth } from "contexts/AuthContext";
import { DEPARTMENTS } from "enums/enums";
import { handleServerError } from "utils/HandlingServerError";
import GeneralChartCard from "components/Charts/GeneralChartCard";

interface Props {
  latitude: number | null;
  longitude: number | null;
}

const AttendanceUtilization: React.FC<Props> = ({ latitude, longitude }) => {
  const { isLoading, error, data } = useAttendanceQuery({});
  const { mutateAsync: createStartMutation } = useCreateStartAttendance();
  const { mutateAsync: createEndMutation } = useCreateEndAttendance();
  const { showError, showSuccess } = useUI();
  const { session } = useAuth();

  let attendanceData: any = data?.attendance.data || {};

  const { status, shift_start, shift_end, total_Shift_Hours, enter_time, leave_time, over_time } = attendanceData;
  if (isLoading) return <Loading />;
  if (error) return null;

  let todayTimeData = {
    options: {
      chart: {
        height: 250,
        type: "radialBar",
      },
      colors: ["#f44336", "#e91e63", "#9c27b0"],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      series: [status ? calculateWorkingPercentage(shift_start, shift_end, total_Shift_Hours) : 0],
      labels: [`${status ? `${shift_end ? "Ended" : "Working"}` : "Start Work"}`],
    },
  };

  const handleStartWork = async () => {
    try {
      if (
        session &&
        session?.user?.department_info! &&
        session?.user?.department_info?.name! !== DEPARTMENTS.PROJECTS
      ) {
        const createInput = {
          latitude: "",
          longitude: "",
          lateReason: "",
        };
        await createStartMutation(createInput);
      } else {
        if (!latitude || !longitude) return console.log("Missing Data");
        const createInput = {
          latitude,
          longitude,
          lateReason: "",
        };
        await createStartMutation(createInput);
      }

      showSuccess();
      window.location.reload();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleEndWork = async () => {
    try {
      await createEndMutation({});
      showSuccess();
      window.location.reload();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  // No Attendance Shifts Exists For This User
  if (attendanceData.msg)
    return (
      <div className="container-xxl d-flex align-items-center justify-content-center" style={{ minHeight: " 70vh" }}>
        <div className="text-center row">
          <div className=" col-md-12 mt-5">
            <p className="fs-3">
              {" "}
              <span className="text-danger">Oops! </span>
              {attendanceData.msg}
            </p>
            {/* Chat With Hr */}
            <p className="fs-5">You Can Inform The HR About That Issue.</p>
            <div className="d-flex col align-items-center justify-content-center gap-3">
              <Link to="/dashboard/chat" className="btn btn-primary">
                <i className="icofont-chat fs-5 me-2" />
                Talk To HR
              </Link>
              <Link to="/" className="btn btn-primary">
                <i className="icofont-home fs-5 me-2" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        {status ? (
          <GeneralChartCard
            Title="Today's working chart"
            extraDivBody={() => (
              <div className="timesheet-info d-flex align-items-center justify-content-between flex-wrap">
                <div className="intime d-flex align-items-center mt-2">
                  <i className="icofont-finger-print fs-4 color-light-success" />
                  <span className="fw-bold ms-1">Started At: {enter_time.slice(0, 5)}</span>
                </div>
                {leave_time && (
                  <div className="intime d-flex align-items-center mt-2">
                    <i className="icofont-finger-print fs-4 color-light-success" />
                    <span className="fw-bold ms-1">Left At: {leave_time.slice(0, 5)}</span>
                  </div>
                )}
              </div>
            )}
            data={todayTimeData}
            footerBody={
              <>
                {!leave_time && (
                  <div className="d-flex justify-content-center pb-2" onClick={() => handleEndWork()}>
                    <div className="outtime mt-2 w-sm-100">
                      <button type="button" className="btn btn-primary w-sm-100">
                        <i className="icofont-foot-print me-2" />
                        Leave
                      </button>
                    </div>
                  </div>
                )}
                {leave_time && (
                  <div className="timesheet-info d-flex align-items-center justify-content-around flex-wrap">
                    <div className="intime d-flex align-items-center">
                      <i className="icofont-ui-timer fs-4 color-light-success" />
                      <span className="fw-bold ms-1">Overtime: {over_time.slice(0, 5)} Hr</span>
                    </div>
                  </div>
                )}
              </>
            }
            TitleRight={undefined}
          />
        ) : (
          <GeneralChartCard
            Title="Today's working chart"
            extraDivBody={() => (
              <div className="timesheet-info d-flex align-items-center justify-content-between flex-wrap">
                <div className="intime d-flex align-items-center mt-2">
                  <i className="icofont-finger-print fs-4 color-light-success" />
                  <span className="fw-bold ms-1">Shift Start: {shift_start.slice(0, 5)}</span>
                </div>
                <div className="intime d-flex align-items-center mt-2">
                  <i className="icofont-finger-print fs-4 color-light-success" />
                  <span className="fw-bold ms-1">Shift End: {shift_end.slice(0, 5)}</span>
                </div>
              </div>
            )}
            data={todayTimeData}
            footerBody={
              <div className="d-flex justify-content-center" onClick={() => handleStartWork()}>
                <div className="outtime mt-2 w-sm-100">
                  <button type="button" className="btn btn-primary w-sm-100">
                    <i className="icofont-foot-print me-2" />
                    Start Work
                  </button>
                </div>
              </div>
            }
            TitleRight={undefined}
          />
        )}
      </div>
    );
};

export default AttendanceUtilization;
