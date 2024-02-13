import { Dashboard } from "types/Dashboard";

/* eslint-disable jsx-a11y/heading-has-content */
interface Props {
  data: Dashboard;
}

interface InformationItem {
  icon: React.ReactNode;
  title: string;
  textMutedVariable: number;
}
// Availability
const EmployeesAttendence: React.FC<Props> = ({ data }) => {
  const { employee_count, present, absent, late_count } = data;
  console.log(data);

  const information: InformationItem[] = [
    {
      icon: <i className="icofont-users-alt-1 fs-3" />,
      title: "Total Employees",
      textMutedVariable: employee_count,
    },
    {
      icon: <h6 className="icofont-checked fs-3" />,
      title: "Attendance",
      textMutedVariable: present,
    },
    {
      icon: <i className="icofont-ban fs-3" />,
      title: "Absent",
      textMutedVariable: absent,
    },
    {
      icon: <i className="icofont-clock-time fs-3" />,
      title: "Late",
      textMutedVariable: late_count,
    },
  ];
  return (
    <div className="card">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h6 className="mb-0 fw-bold ">Employees Availability</h6>
      </div>
      <div className="card-body">
        <div className="row g-2 row-deck">
          {information.map((info, index) => {
            return (
              <div className="col-md-6 col-sm-6" key={index}>
                <div className="card">
                  <div className="card-body ">
                    {info.icon}
                    <h6 className="mt-3 mb-0 fw-bold small-14">{info.title}</h6>
                    <span className="text-muted">
                      {info.textMutedVariable ? info.textMutedVariable : 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeesAttendence;
