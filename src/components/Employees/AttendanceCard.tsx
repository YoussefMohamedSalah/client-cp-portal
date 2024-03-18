import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getCurrentMonthDays, getNewCurrentDate } from "utils/DateUtils";
import { profileName } from "utils/profile";

interface Props {
  data: any;
}

const AttendanceCard: React.FC<Props> = ({ data }) => {
  const absentTooltip = (
    <Tooltip id="tooltip">
      Absent.
    </Tooltip>
  );

  const lateTooltip = (
    <Tooltip id="tooltip">
      Late.
    </Tooltip>
  );

  const notCalculatedTooltip = (
    <Tooltip id="tooltip">
      Not Calculated Yet!.
    </Tooltip>
  );

  const noRecordTooltip = (
    <Tooltip id="tooltip">
      No Record!.
    </Tooltip>
  );

  const editedTooltip = (
    <Tooltip id="tooltip">
      Edited Record!.
    </Tooltip>
  );

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="atted-info d-flex mb-3 flex-wrap">
          <div className="full-present me-2">
            <i className="icofont-check-circled text-success me-1"></i>
            <span>Full Day Present</span>
          </div>
          <div className="Half-day me-2">
            <i className="icofont-wall-clock text-warning me-1"></i>
            <span>Present But Late</span>
          </div>
          <div className="absent me-2">
            <i className="icofont-close-circled text-danger me-1"></i>
            <span>Full Day Absence</span>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-hover align-middle mb-0"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Employee</th>
                {getCurrentMonthDays().map((day) => (
                  <th key={day} className="text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <span className="fw-bold small">{profileName(item)}</span>
                    </td>
                    {getCurrentMonthDays().map((day) => {
                      const today: number = new Date().getDate();
                      if (day > today) {
                        return (
                          <th key={day} className="text-center">
                            -
                          </th>
                        );
                      }
                      else {
                        for (let i = 0; i < item?.attendances?.length; i++) {
                          let login_time: string = "";
                          let logout_time: string = "";
                          let isAbsent: boolean = false;
                          let isLate: boolean = false;
                          let attendanceDate = item.attendances[i].date!;
                          /** Get user login time */
                          if (item?.attendances[i]?.enter_time) login_time = item?.attendances[i]?.login_time;
                          /** Get user logout time */
                          if (item?.attendances[i]?.leave_time) logout_time = item?.attendances[i]?.logout_time;
                          /** Get user Absent State */
                          if (item?.attendances[i]?.absent) isAbsent = true;
                          /** Get user Late State */
                          if (item?.attendances[i]?.late) isLate = true;

                          if (attendanceDate !== "" && getNewCurrentDate(attendanceDate) === day) {
                            // is not absent and not late
                            if (item?.attendances[i].edited_state_from_admin && item?.attendances[i].edited_state_from_admin.state === 'Full Day Present') {
                              return (
                                <OverlayTrigger placement="top" overlay={editedTooltip} key={day}>
                                  <th className="text-center">
                                    <div className='d-flex justify-content-center align-items-center' style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'yellow' }}>
                                      <i className="icofont-check-circled text-success" />
                                    </div>
                                  </th>
                                </OverlayTrigger>
                              )
                            } else if (item?.attendances[i].edited_state_from_admin && item?.attendances[i].edited_state_from_admin.state === 'Full Day Absence') {
                              return (
                                <OverlayTrigger placement="top" overlay={editedTooltip} key={day}>
                                  <th className="text-center">
                                    <div className='d-flex justify-content-center align-items-center' style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: 'yellow' }}>
                                      <i className="icofont-close-circled text-danger" />
                                    </div>
                                  </th>
                                </OverlayTrigger>
                              )
                            }
                            else if (login_time !== '' && logout_time !== '' && !isAbsent && !isLate) {
                              return (
                                <th key={day} className="text-center">
                                  <i className="icofont-check-circled text-success"></i>
                                </th>
                              );
                              // is not absent but late
                            } else if (login_time !== '' && logout_time !== '' && !isAbsent && isLate) {
                              return (
                                <OverlayTrigger placement="top" overlay={lateTooltip} key={day}>
                                  <th className="text-center">
                                    <i className="icofont-check-circled text-warning" />
                                  </th>
                                </OverlayTrigger>
                              );
                              // if Absent
                            } else if (isAbsent) {
                              return (
                                <OverlayTrigger placement="top" overlay={absentTooltip} key={day}>
                                  <th className="text-center">
                                    <i className="icofont-close-circled text-danger" />
                                  </th>
                                </OverlayTrigger>
                              );
                              // if not calculated yet!
                            } else if (login_time !== '' && logout_time === '') {
                              return (
                                <OverlayTrigger placement="top" overlay={notCalculatedTooltip} key={day}>
                                  <th className="text-center">
                                    <i className="icofont-check-circled text-warning"></i>
                                  </th>
                                </OverlayTrigger>
                              );
                              // if user has no data
                            } else return (
                              <OverlayTrigger placement="top" overlay={notCalculatedTooltip} key={day}>
                                <th className="text-center">
                                  -
                                </th>
                              </OverlayTrigger>
                            );
                          }
                        }
                        return (
                          <OverlayTrigger placement="top" overlay={noRecordTooltip} key={day}>
                            <th className="text-center">
                              -
                            </th>
                          </OverlayTrigger>
                        );
                      }
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
