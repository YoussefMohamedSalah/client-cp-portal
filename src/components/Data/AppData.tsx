import Avatar1 from "../../assets/images/xs/avatar1.jpg";
import Avatar2 from "../../assets/images/xs/avatar1.jpg";
import Avatar3 from "../../assets/images/xs/avatar1.jpg";
import Avatar4 from "../../assets/images/xs/avatar1.jpg";
import Avatar5 from "../../assets/images/xs/avatar1.jpg";
import Avatar6 from "../../assets/images/xs/avatar1.jpg";
import Avatar7 from "../../assets/images/xs/avatar1.jpg";
import Avatar8 from "../../assets/images/xs/avatar1.jpg";

import lgAvatar1 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar2 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar3 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar4 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar5 from "../../assets/images/lg/avatar1.jpg";

import lgAvatar7 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar8 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar10 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar11 from "../../assets/images/lg/avatar1.jpg";
import lgAvatar12 from "../../assets/images/lg/avatar1.jpg";

export const TimesheetListData: any = {
  title: "Timesheet List",
  columns: [
    {
      name: "PROJECT NAME",
      selector: () => {},
      sortable: true,
      cell: () => (
        <select className="form-select">
          <option>Box of Crayons</option>
          <option value="1">Fast Cad</option>
          <option value="2">Box of Crayons</option>
          <option value="3">Gob Geeklords</option>
          <option value="4">Java Dalia</option>
          <option value="5">Practice to Perfect</option>
          <option value="6">Rhinestone</option>
          <option value="7">Social Geek Made</option>
        </select>
      ),
    },
    {
      name: "MON",
      selector: (row: any) => (
        <input type="time" className="form-control" id="timepickerded29" value={row.mon} onChange={() => {}} />
      ),
      sortable: true,
    },
    {
      name: "TUE",
      selector: (row: any) => (
        <input type="time" className="form-control" id="timepickerded29" value={row.tue} onChange={() => {}} />
      ),
      sortable: true,
    },
    {
      name: "WED",
      selector: (row: any) => (
        <input type="time" className="form-control" id="timepickerded29" value={row.wed} onChange={() => {}} />
      ),
      sortable: true,
    },
    {
      name: "THUR",
      selector: (row: any) => (
        <input type="time" className="form-control" id="timepickerded29" value={row.thur} onChange={() => {}} />
      ),
      sortable: true,
    },
    {
      name: "FRI",
      selector: (row: any) => (
        <input type="time" className="form-control" id="timepickerded29" value={row.fri} onChange={() => {}} />
      ),
      sortable: true,
    },
    {
      name: "SAT",
      selector: (row: any) => (
        <input type="time" className="form-control" id="timepickerded29" value={row.sat} onChange={() => {}} />
      ),
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row: any) => row.total,
      sortable: true,
      cell: (row: any) => (
        <button type="button" className="btn light-success-bg">
          {row.total}
        </button>
      ),
    },
    {
      name: "",
      selector: (row: any) => {},
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-secondary">
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      projectname: "Box of Crayons",
      mon: "08:00:00",
      tue: "08:00:00",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "50",
    },
    {
      projectname: "Fast Cad",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "48",
    },
    {
      projectname: "Gob Geeklords",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "56",
    },
    {
      projectname: "Java Dalia",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "56",
    },
    {
      projectname: "Practice to Perfect",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "54.2",
    },
    {
      projectname: "",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "00:00",
    },
    {
      projectname: "",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "00",
    },
    {
      projectname: "Rhinestone",
      mon: "08:00:00PM",
      tue: "08:00:00PM",
      wed: "08:00:00PM",
      thur: "08:00:00PM",
      fri: "08:00:00PM",
      sat: "08:00:00PM",
      total: "56",
    },
  ],
};

export const LeadersListData: any = {
  title: "Leaders List",
  columns: [
    {
      name: "LEADER NAME",
      selector: (row: any) => row.leaderName,
      sortable: true,
      cell: (row: any) => (
        <>
          <img className="avatar rounded-circle" src={row.image} alt="" />{" "}
          <span className="fw-bold ms-1">{row.leaderName}</span>
        </>
      ),
      minWidth: "250px",
    },
    {
      name: "PROJECT",
      selector: (row: any) => row.project,
      sortable: true,
    },
    {
      name: "TOTAL TASK",
      selector: (row: any) => row.totalTasks,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "PROJECT ASSIGNED",
      selector: (row: any) => row.projectAssigned,
      sortable: true,
    },
    {
      name: "ASSIGNED STAFF",
      selector: (row: any) => {},
      sortable: true,
      cell: (row: any) => {
        return (
          <div className="avatar-list avatar-list-stacked px-3">
            {row.assignedStaff.map((data: any, index: number) => (
              <img key={"image" + index} className="avatar rounded-circle sm" src={data} alt="" />
            ))}
            <span className="avatar rounded-circle text-center pointer sm">
              <i className="icofont-ui-add"></i>
            </span>
          </div>
        );
      },
    },
    {
      name: "STATUS",
      selector: (row: any) => {},
      sortable: true,
      cell: (row: any) => <span className="badge bg-success">{row.status}</span>,
    },
    {
      name: "ACTION",
      selector: (row: any) => {},
      sortable: true,
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-secondary">
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      leaderName: "Phil Glover",
      image: Avatar1,
      project: "Gob Geeklords",
      totalTasks: "2 Task",
      email: "PhilGlover@gmail.com",
      projectAssigned: "18/03/21",
      assignedStaff: [Avatar7, Avatar8],
      status: "Working",
    },
    {
      leaderName: "Robert Anderson",
      image: Avatar6,
      project: "Rhinestone",
      totalTasks: "5 Task",
      email: "RobertAnderson@gmail.com",
      projectAssigned: "14/01/21",
      assignedStaff: [Avatar2, Avatar1, Avatar4, Avatar7],
      status: "Working",
    },
    {
      leaderName: "Ryan Randall",
      image: Avatar2,
      project: "Fast Cad",
      totalTasks: "8 Task",
      email: "RyanRandall@gmail.com",
      projectAssigned: "14/01/21",
      assignedStaff: [Avatar2, Avatar1, Avatar7, Avatar8],
      status: "Working",
    },
    {
      leaderName: "Ryan Stewart",
      image: Avatar2,
      project: "Social Geek Made",
      totalTasks: "15 Task",
      email: "RyanStewart@gmail.com",
      projectAssigned: "13/01/21",
      assignedStaff: [Avatar2, Avatar4, Avatar7, Avatar8],
      status: "Working",
    },
    {
      leaderName: "Sally Graham",
      image: Avatar5,
      project: "Practice to Perfect",
      totalTasks: "9 Task",
      email: "SallyGraham@gmail.com",
      projectAssigned: "13/01/21",
      assignedStaff: [Avatar2, Avatar1, Avatar3, Avatar4],
      status: "Working",
    },
    {
      leaderName: "Victor Rampling",
      image: Avatar4,
      project: "Practice to Perfect",
      totalTasks: "7 Task",
      email: "VictorRampling@gmail.com",
      projectAssigned: "18/06/21",
      assignedStaff: [Avatar2, Avatar4, Avatar7, Avatar8],
      status: "Working",
    },
    {
      leaderName: "Joan Dyer",
      image: Avatar1,
      project: "Box of Crayons",
      totalTasks: "5 Task",
      email: "joandyer@gmail.com",
      projectAssigned: "23/02/21",
      assignedStaff: [Avatar2, Avatar7, Avatar8],
      status: "Working",
    },
  ],
};

export const EnquiresViewData: any = {
  title: "Enquires List",
  columns: [
    {
      name: "TICKET ID",
      selector: (row: any) => row.ticketId,
      sortable: true,
      cell: (row: any) => (
        <a href="Enquires-detail" className="fw-bold text-secondary">
          {row.ticketId}
        </a>
      ),
    },
    {
      name: "SUBJECT",
      selector: (row: any) => row.subject,
      sortable: true,
    },
    {
      name: "ASSIGNED",
      selector: (row: any) => row.assigned,
      sortable: true,
      cell: (row: any) => (
        <>
          <img className="avatar rounded-circle" src={row.image} alt="" />{" "}
          <span className="fw-bold ms-1">{row.assigned}</span>
        </>
      ),
      minWidth: "250px",
    },
    {
      name: "CREATD DATE",
      selector: (row: any) => row.createDate,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row: any) => {},
      sortable: true,
      cell: (row: any) => (
        <span className={`badge ${row.status === "Completed" ? "bg-success" : "bg-warning"}`}>{row.status}</span>
      ),
    },
    {
      name: "ACTION",
      selector: (row: any) => {},
      sortable: true,
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-secondary">
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      ticketId: "#Tc-00011",
      image: Avatar4,
      subject: "punching time not proper",
      assigned: "Victore Rampling",
      createDate: "25-02-2021",
      status: "Completed",
    },
    {
      ticketId: "#Tc-0002",
      image: Avatar1,
      subject: "Internet Not Working",
      assigned: "Joan Dyer",
      createDate: "21-03-2021",
      status: "In Progress",
    },
    {
      ticketId: "#Tc-00021",
      image: Avatar5,
      subject: "Internet Not Working",
      assigned: "Sally Grahanm",
      createDate: "16-02-2021",
      status: "Completed",
    },
    {
      ticketId: "#Tc-0004",
      image: Avatar3,
      subject: "Internet Not Working",
      assigned: "Phil Glover",
      createDate: "16-03-2021",
      status: "In Progress",
    },
    {
      ticketId: "#Tc-00041",
      image: Avatar6,
      subject: "Internet Not Working",
      assigned: "Robert Anderson",
      createDate: "18-01-2021",
      status: "Completed",
    },
    {
      ticketId: "#Tc-0006",
      image: Avatar2,
      subject: "Internet Not Working",
      assigned: "Ryan Randall",
      createDate: "12-03-2021",
      status: "In Progress",
    },
  ],
};

export const BugImageAttachedData: any = [
  {
    filename: "Image3.jpg",
    fileIcon: "icofont-bug fs-5",
    bgClass: "light-danger-bg",
  },
  {
    filename: "Image3.jpg",
    fileIcon: "icofont-bug fs-5",
    bgClass: "light-danger-bg",
  },
  {
    filename: "Image3.jpg",
    fileIcon: "icofont-bug fs-5",
    bgClass: "light-danger-bg",
  },
  {
    filename: "Image3.jpg",
    fileIcon: "icofont-bug fs-5",
    bgClass: "light-danger-bg",
  },
  {
    filename: "Image3.jpg",
    fileIcon: "icofont-bug fs-5",
    bgClass: "light-danger-bg",
  },
];

export const BugFileAttachedData: any = [
  {
    filename: "file1.pdf",
    fileIcon: "icofont-file-pdf fs-5",
    bgClass: "bg-lightgreen",
  },
  {
    filename: "file1.pdf",
    fileIcon: "icofont-file-pdf fs-5",
    bgClass: "bg-lightgreen",
  },
  {
    filename: "file1.pdf",
    fileIcon: "icofont-file-pdf fs-5",
    bgClass: "bg-lightgreen",
  },
  {
    filename: "file1.pdf",
    fileIcon: "icofont-file-pdf fs-5",
    bgClass: "bg-lightgreen",
  },
  {
    filename: "file1.pdf",
    fileIcon: "icofont-file-pdf fs-5",
    bgClass: "bg-lightgreen",
  },
];

export const OurClientsData: any = [
  {
    avatar: lgAvatar3,
    post: "CEO",
    name: "Ryan Ogden",
    Companyname: "AgilSoft Tech",
  },
  {
    avatar: lgAvatar2,
    post: "Manager",
    name: "Matt Gibson",
    Companyname: "Macrosoft",
  },
  {
    avatar: lgAvatar2,
    post: "CEO",
    name: "Lauren Reid",
    Companyname: "Google",
  },
  {
    avatar: lgAvatar10,
    post: "CEO",
    name: "Lauren Reid",
    Companyname: "Google",
  },
  {
    avatar: lgAvatar11,
    post: "Manager",
    name: "Lauren Reid",
    Companyname: "Deltasoft Tech",
  },
  {
    avatar: lgAvatar12,
    post: "CEO",
    name: "Paul Grant",
    Companyname: "Design Tech",
  },
  {
    avatar: lgAvatar11,
    post: "Manager",
    name: "Lauren Reid",
    Companyname: "Deltasoft Tech",
  },
  {
    avatar: lgAvatar12,
    post: "CEO",
    name: "Paul Grant",
    Companyname: "Design Tech",
  },
  {
    avatar: lgAvatar7,
    post: "Manager",
    name: "Lauren Reid",
    Companyname: "Deltasoft Tech",
  },
  {
    avatar: lgAvatar7,
    post: "CEO",
    name: "Paul Grant",
    Companyname: "Design Tech",
  },
];

export const clientProfileData: any = [
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar4, Avatar8],
    logo: "icofont-paint",
    logoBg: "light-info-bg",
    title: "Curriculum Development",
    sl: "Social Geek Made",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar4],
    logo: "icofont-vector-path",
    logoBg: "bg-lightgreen",
    title: "Teacher Training",
    sl: "Practice to Perfect",
  },
];

export const MembersData: any = [
  {
    avatar: lgAvatar3,
    post: "",
    name: "UI/UX Designer",
    Companyname: "Luke Short",
  },
  {
    avatar: lgAvatar2,
    post: "",
    name: "Curriculum Development",
    Companyname: "Lillian Powell",
  },
  {
    avatar: lgAvatar2,
    post: "",
    name: "Website Designer",
    Companyname: "Rachel Parsons",
  },
  {
    avatar: lgAvatar10,
    post: "",
    name: "Developer",
    Companyname: "John Hardacre",
  },
  {
    avatar: lgAvatar11,
    post: "",
    name: "QA/QC Engineer",
    Companyname: "Jan Ince",
  },
  {
    avatar: lgAvatar12,
    post: "",
    name: "Mobile developer",
    Companyname: "Steven Butler",
  },
  {
    avatar: lgAvatar11,
    post: "",
    name: "UI/UX Designer",
    Companyname: "Robert Hammer",
  },
  {
    avatar: lgAvatar12,
    post: "",
    name: "Curriculum Development",
    Companyname: "Paul Slater",
  },
  {
    avatar: lgAvatar7,
    post: "",
    name: "Website Designer",
    Companyname: "Rachel Parsons",
  },
  {
    avatar: lgAvatar7,
    post: "",
    name: "Website Designer",
    Companyname: "Rachel Parsons",
  },
];

export const employeeProfileData: any = [
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar4, Avatar8],
    logo: "icofont-paint",
    logoBg: "light-info-bg",
    title: "Curriculum Development",
    sl: "Social Geek Made",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar4],
    logo: "icofont-vector-path",
    logoBg: "bg-lightgreen",
    title: "Teacher Training",
    sl: "Practice to Perfect",
  },
];

export const employeeInformationDetails: any = [
  {
    title: "Personal Informations",
    information: [
      {
        title: "Nationality",
        value: "Indian",
      },
      {
        title: "Religion",
        value: "Hindu",
      },
      {
        title: "Marital Status",
        value: "Married",
      },
      {
        title: "Passport No.",
        value: "5468953210",
      },
      {
        title: "Emergency Contact",
        value: "7468953210",
      },
    ],
  },
  {
    title: "Bank Informations",
    information: [
      {
        title: "Bank Name",
        value: "Kotak",
      },
      {
        title: "Account No.",
        value: "5436874596325486",
      },
      {
        title: "IFSC Code",
        value: "Kotak000021",
      },
      {
        title: "Pan No",
        value: "ACQPF6584L",
      },
      {
        title: "UPI Id",
        value: "454812kotak@upi",
      },
    ],
  },
];

export const HolidaysData: any = {
  title: "Holidays List",
  columns: [
    {
      name: "#",
      selector: (row: any) => <span className={row.txtClass}>{row.ticketId}</span>,
      sortable: true,
    },
    {
      name: "HOLIDAY DAY",
      selector: (row: any) => <span className={row.txtClass}>{row.HolidayDay}</span>,
      sortable: true,
    },
    {
      name: "HOLIDAY DATE",
      selector: (row: any) => <span className={row.txtClass}>{row.holidayDate}</span>,
      sortable: true,
    },
    {
      name: "HOLIDAY NAME",
      selector: (row: any) => <span className={row.txtClass}>{row.holidayName}</span>,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: () => {},
      sortable: true,
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-secondary">
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      ticketId: "01",
      HolidayDay: "Tuesday",
      holidayDate: "January 26, 2021",
      holidayName: "Republic Day",
      txtClass: "text-danger",
    },
    {
      ticketId: "02",
      HolidayDay: "Friday",
      holidayDate: "April 2, 2021",
      holidayName: "Good Friday",
      txtClass: "text-danger",
    },
    {
      ticketId: "03",
      HolidayDay: "Monday",
      holidayDate: "April 30, 2021",
      holidayName: "Memorial Day",
      txtClass: "text-danger",
    },
    {
      ticketId: "04",
      HolidayDay: "Wednesday",
      holidayDate: "August 15, 2021",
      holidayName: "Independence Day",
      txtClass: "text-success",
    },
    {
      ticketId: "05",
      HolidayDay: "Wednesday",
      holidayDate: "August 22, 2021",
      holidayName: "Bakrid",
    },
    {
      ticketId: "06",
      HolidayDay: "Monday",
      holidayDate: "September 30, 2021",
      holidayName: "Janmashtami",
    },
    {
      ticketId: "07",
      HolidayDay: "Tuesday",
      holidayDate: "Octomber 2, 2021",
      holidayName: "Gandhi Jayanti",
    },
    {
      ticketId: "08",
      HolidayDay: "Wednesday",
      holidayDate: "November 7, 2021",
      holidayName: "Diwali",
    },
    {
      ticketId: "09",
      HolidayDay: "Tuesday	",
      holidayDate: "December 25, 2021",
      holidayName: "Christmas Day",
    },
  ],
};

export const LeaveRequestData: any = {
  title: "Leave Request",
  columns: [
    {
      name: "EMPLOYEE ID",
      selector: (row: any) => row.employeeId,
      sortable: true,
      cell: (row: any) => (
        <a href="members-profile" className="fw-bold text-secondary">
          {row.employeeId}
        </a>
      ),
    },
    {
      name: "EMPLOYEE NAME",
      selector: (row: any) => {},
      sortable: true,
      cell: (row: any) => (
        <>
          {" "}
          <img className="avatar rounded-circle" src={row.image} alt=""></img>
          <span className="fw-bold ms-1">{row.employeeName}</span>
        </>
      ),
    },
    {
      name: "LEAVE TYPE",
      selector: (row: any) => row.leavetype,
      sortable: true,
    },
    {
      name: "FROM",
      selector: (row: any) => row.from,
      sortable: true,
    },
    {
      name: "TO",
      selector: (row: any) => row.to,
      sortable: true,
    },
    {
      name: "REASON",
      selector: (row: any) => row.reason,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row: any) => {},
      sortable: true,
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-secondary">
            <i className="icofont-check-circled text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-close-circled text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      employeeId: "#EMP : 00001",
      employeeName: "Joan Dyer",
      image: Avatar1,
      leavetype: "Casual Leave",
      from: "12/03/2021",
      to: "14/03/2021",
      reason: "Going to Holiday",
    },
    {
      employeeId: "#EMP : 00002",
      employeeName: "Sally Graham",
      image: Avatar5,
      leavetype: "Medical Leave",
      from: "01/05/2021",
      to: "06/05/2021",
      reason: "Hospital Admit",
    },
    {
      employeeId: "#EMP : 00005",
      employeeName: "Robert Anderson",
      image: Avatar6,
      leavetype: "Medical Leave",
      from: "03/05/2021",
      to: "06/05/2021",
      reason: "Hospital Admit",
    },
    {
      employeeId: "#EMP : 00007",
      employeeName: "Phil Glover",
      image: Avatar3,
      leavetype: "Medical Leave",
      from: "11/04/2021",
      to: "12/04/2021",
      reason: "Going to Hospital",
    },
    {
      employeeId: "#EMP : 000010",
      employeeName: "Victor Rampling",
      image: Avatar4,
      leavetype: "Medical Leave",
      from: "28/04/2021",
      to: "30/04/2021",
      reason: "Going to Hospital",
    },
    {
      employeeId: "#EMP : 000014",
      employeeName: "Ryan Stewart",
      image: Avatar7,
      leavetype: "Casual Leave",
      from: "10/07/2021",
      to: "18/08/2021",
      reason: "Famaily Holiday",
    },
    {
      employeeId: "#EMP : 000038",
      employeeName: "Ryan Randall",
      image: Avatar2,
      leavetype: "Casual Leave",
      from: "10/04/2021",
      to: "12/04/2021",
      reason: "Going to Holiday",
    },
  ],
};

export const DepartmentsData: any = {
  title: "Departments",
  columns: [
    {
      name: "#",
      selector: (row: any) => row.employeeId,
      sortable: true,
      // cell:row=><a href="#!" className="fw-bold text-secondary">{row.employeeId}</a>
    },
    {
      name: "DEPARTMENT HEAD",
      selector: (row: any) => row.DepartmentHead,
      sortable: true,
      cell: (row: any) => (
        <>
          {" "}
          <img className="avatar rounded-circle" src={row.image} alt=""></img>
          <span className="fw-bold ms-1">{row.DepartmentHead}</span>
        </>
      ),
    },
    {
      name: "DEPARTMENT NAME",
      selector: (row: any) => row.DepartmentName,
      sortable: true,
    },
    {
      name: "EMPLOYEE UNDER WORK",
      selector: (row: any) => row.employeeNo,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row: any) => {},
      sortable: true,
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#depedit">
            <i className="icofont-edit text-success"></i>
          </button>
          <button className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      employeeId: "1",
      DepartmentHead: "Joan Dyer",
      image: Avatar1,
      DepartmentName: "Web Development",
      employeeNo: 40,
    },
    {
      employeeId: "2",
      DepartmentHead: "Sally Graham",
      image: Avatar5,
      DepartmentName: "Accounts",
      employeeNo: 48,
    },
    {
      employeeId: "3",
      DepartmentHead: "Robert Anderson",
      image: Avatar6,
      DepartmentName: "Support",
      employeeNo: 15,
    },
    {
      employeeId: "4",
      DepartmentHead: "Phil Glover",
      image: Avatar3,
      DepartmentName: "App Development",
      employeeNo: 39,
    },
    {
      employeeId: "5",
      DepartmentHead: "Victor Rampling",
      image: Avatar4,
      DepartmentName: "Recruiter",
      employeeNo: 12,
    },
    {
      employeeId: "6",
      DepartmentHead: "Ryan Stewart",
      image: Avatar7,
      DepartmentName: "Admin",
      employeeNo: 8,
    },
  ],
};

export const PaymentsData: any = {
  title: "Payments",
  columns: [
    {
      name: "NO",
      selector: (row: any) => (
        <a href="invoices" className="fw-bold text-secondary">
          {row.no}
        </a>
      ),
      sortable: true,
    },
    {
      name: "PROJECT",
      selector: (row: any) => row.project,
      sortable: true,
    },
    {
      name: "CLIENT NAME",
      selector: (row: any) => row.clientName,
      sortable: true,
    },
    {
      name: "DATE START",
      selector: (row: any) => row.dateStart,
      sortable: true,
    },
    {
      name: "DATE END",
      selector: (row: any) => row.dateEnd,
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: (row: any) => row.amount,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: () => {},
      sortable: true,
      cell: (row: any) => (
        <span
          className={`badge ${
            row.status === "Paid" ? "bg-success" : row.status === "Draf" ? "bg-lavender-purple" : "bg-warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ],
  rows: [
    {
      no: "#00001",
      project: "Social Geek Made",
      clientName: "AgilSoft Tech",
      dateStart: "10-01-2021",
      dateEnd: "10-02-2021",
      amount: "$3250",
      status: "Pending",
    },
    {
      no: "#00002",
      project: "Practice to Perfect",
      clientName: "Microsoft",
      dateStart: "12-02-2021",
      dateEnd: "10-04-2021",
      amount: "$1578",
      status: "Paid",
    },
    {
      no: "#00003",
      project: "Rhinestone",
      clientName: "Google",
      dateStart: "18-02-2021",
      dateEnd: "20-04-2021",
      amount: "$1978",
      status: "Draf",
    },
    {
      no: "#00004",
      project: "Box of Crayons",
      clientName: "Pixelwibes",
      dateStart: "28-02-2021",
      dateEnd: "30-04-2021",
      amount: "$1978",
      status: "Draf",
    },
    {
      no: "#00005",
      project: "Practice to Perfect",
      clientName: "Deltasoft Tech",
      dateStart: "11-02-2021",
      dateEnd: "10-04-2021",
      amount: "$1578",
      status: "Paid",
    },
    {
      no: "#00006",
      project: "Rhinestone",
      clientName: "Google",
      dateStart: "17-02-2021",
      dateEnd: "20-04-2021",
      amount: "$1978",
      status: "Draf",
    },
    {
      no: "#00007",
      project: "Box of Crayons",
      clientName: "Pixelwibes",
      dateStart: "14-02-2021",
      dateEnd: "30-04-2021",
      amount: "$1978",
      status: "Draf",
    },
  ],
};

export const ExpensesData: any = {
  title: "Expenses",
  columns: [
    {
      name: "EXP ID",
      selector: (row: any) => row.expId,
      sortable: true,
    },
    {
      name: "ITEM",
      selector: (row: any) => row.item,
      sortable: true,
    },
    {
      name: "ORDER BY",
      selector: () => {},
      sortable: true,
      cell: (row: any) => (
        <>
          {" "}
          <img className="avatar rounded-circle" src={row.image} alt=""></img>
          <span className="fw-bold ms-1">{row.orderby}</span>
        </>
      ),
    },
    {
      name: "DATE",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "FROM",
      selector: (row: any) => row.from,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: () => {},
      sortable: true,
      cell: (row: any) => (
        <span
          className={`badge ${
            row.status === "Completed" ? "bg-success" : row.status === "Draf" ? "bg-lavender-purple" : "bg-warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "ACTION",
      selector: () => {},
      sortable: true,
      cell: () => (
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#expedit">
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ],
  rows: [
    {
      expId: "#EX-00002",
      item: "Internet Payment",
      orderby: "Joan Dyer",
      image: Avatar1,
      date: "12/03/2021",
      from: "Airtel Portal",
      status: "In Progress",
    },
    {
      expId: "#EX-00004",
      item: "Printer Repairing",
      orderby: "Phil Glover",
      image: Avatar3,
      date: "16/03/2021",
      from: "JustDial",
      status: "In Progress",
    },
    {
      expId: "#EX-00006",
      item: "Keybord Order",
      orderby: "Ryan Randall",
      image: Avatar2,
      date: "12/03/2021",
      from: "Flipkart",
      status: "In Progress",
    },
    {
      expId: "#EX-00011",
      item: "Pen/book Order",
      orderby: "Victor Ramplingl",
      image: Avatar4,
      date: "25/02/2021",
      from: "Flipkart",
      status: "Completed",
    },
    {
      expId: "#EX-00014",
      item: "Decoration Order",
      orderby: "Robert Anderson",
      image: Avatar3,
      date: "18/02/2021",
      from: "Flipkart",
      status: "Completed",
    },
    {
      expId: "#EX-00018",
      item: "Food Order",
      orderby: "Sally Graham",
      image: Avatar5,
      date: "16/02/2021",
      from: "Swiggy",
      status: "Completed",
    },
  ],
};

export const ProjectCardData: any = [
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar4, Avatar8],
    logo: "icofont-paint",
    logoBg: "light-info-bg",
    title: "Curriculum Development",
    sl: "Social Geek Made",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar4],
    logo: "icofont-vector-path",
    logoBg: "bg-lightgreen",
    title: "Teacher Training",
    sl: "Practice to Perfect",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar8, lgAvatar5, lgAvatar5, lgAvatar7],
    logo: "icofont-ui-touch-phone",
    logoBg: "bg-lightyellow",
    title: "Assessment System",
    sl: "Java Dalia",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3],
    logo: "icofont-tick-boxed",
    logoBg: "light-success-bg",
    title: "Curriculum Development",
    sl: "Switch and Swif",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar8, lgAvatar5, lgAvatar5, lgAvatar7],
    logo: "icofont-dashboard-web",
    logoBg: "light-orange-bg",
    title: "Development",
    sl: "Gob Geeklords",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar8, lgAvatar5, lgAvatar5, lgAvatar7],
    logo: "icofont-tasks",
    logoBg: "bg-lightblue",
    title: "Student Records",
    sl: "Fast Cad",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar8],
    logo: "icofont-vector-path",
    logoBg: "bg-lightgreen",
    title: "Teacher Training",
    sl: "Hex Clan",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3],
    logo: "icofont-tick-boxed",
    logoBg: "light-success-bg",
    title: "Curriculum Development",
    sl: "Switch and Swif",
  },
  {
    teamImage: [lgAvatar1, lgAvatar3, lgAvatar1, lgAvatar3, lgAvatar4, lgAvatar8, lgAvatar5, lgAvatar5, lgAvatar7],
    logo: "icofont-dashboard-web",
    logoBg: "light-orange-bg",
    title: "Development",
    sl: "Gob Geeklords",
  },
];

export const InProgressTaskData: any = [
  {
    id: 1,
    images: [Avatar2, Avatar1],
    Data: "MEDI1UM",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-success-bg",
    date: "28 Mar",
    message: 5,
    attachment: 5,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
  {
    id: 2,
    images: [Avatar2],
    Data: "LOW2",
    status: "LOW",
    title: "Teacher Training",
    titleBGClass: "bg-lightgreen",
    date: "12 Feb",
    message: 3,
    attachment: 4,
    ticketInfo: "Practice to Perfect",
    type: "grag",
  },
  {
    id: 3,
    images: [Avatar3, Avatar1],
    Data: "MEDI3UM",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-info-bg",
    date: "03 Apr",
    message: 7,
    attachment: 1,
    ticketInfo: "Social Geek Made",
    type: "grag",
  },
  {
    id: 4,
    images: [Avatar5, Avatar1],
    Data: "MEDI4UM",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-info-bg",
    date: "03 Apr",
    message: 7,
    attachment: 1,
    ticketInfo: "Social Geek Made",
    type: "grag",
  },
  {
    id: 5,
    images: [Avatar4],
    Data: "High5",
    status: "High",
    title: "Quality Ansurance",
    titleBGClass: "light-info-bg",
    date: "25 Mar",
    message: 8,
    attachment: 6,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
];

export const needReviewData: any = [
  {
    id: 1,
    images: [Avatar3, Avatar1],
    Data: "MEDIUM1need",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-info-bg",
    date: "03 Apr",
    message: 7,
    attachment: 1,
    ticketInfo: "Social Geek Made",
    type: "grag",
  },
  {
    id: 2,
    images: [Avatar5, Avatar1],
    Data: "MEDIUM2need",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-info-bg",
    date: "03 Apr",
    message: 7,
    attachment: 1,
    ticketInfo: "Social Geek Made",
    type: "grag",
  },
  {
    id: 3,
    images: [Avatar2, Avatar1],
    Data: "MEDIUM3need",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-success-bg",
    date: "28 Mar",
    message: 5,
    attachment: 5,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
  {
    id: 4,
    images: [Avatar4],
    Data: "High4need",
    status: "High",
    title: "Quality Ansurance",
    titleBGClass: "light-info-bg",
    date: "25 Mar",
    message: 8,
    attachment: 6,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
];

export const CompletedData: any = [
  {
    id: 1,
    images: [Avatar3, Avatar1],
    Data: "MEDIUM1Complete",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-info-bg",
    date: "03 Apr",
    message: 7,
    attachment: 1,
    ticketInfo: "Social Geek Made",
    type: "grag",
  },
  {
    id: 2,
    images: [Avatar5, Avatar1],
    Data: "MEDIUM2Complete",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-info-bg",
    date: "03 Apr",
    message: 7,
    attachment: 1,
    ticketInfo: "Social Geek Made",
    type: "grag",
  },
  {
    id: 3,
    images: [Avatar2, Avatar1],
    Data: "MEDIUM3Complete",
    status: "MEDIUM",
    title: "Curriculum Development",
    titleBGClass: "light-success-bg",
    date: "28 Mar",
    message: 5,
    attachment: 5,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
  {
    id: 4,
    images: [Avatar4],
    Data: "High4Complete",
    status: "High",
    title: "Quality Ansurance",
    titleBGClass: "light-info-bg",
    date: "25 Mar",
    message: 8,
    attachment: 6,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
  {
    id: 5,
    images: [Avatar4],
    Data: "High5Complete",
    status: "High",
    title: "Quality Ansurance",
    titleBGClass: "light-info-bg",
    date: "25 Mar",
    message: 8,
    attachment: 6,
    ticketInfo: "Box of Crayons",
    type: "grag",
  },
];

export const TimeAttendanceData: any = {
  title: "",
  columns: [
    {
      name: "#",
      selector: (row: any) => row.no,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "PUNCHIN TIME",
      selector: (row: any) => row.punchinTime,
      sortable: true,
    },
    {
      name: "PUNCHOU TIME",
      selector: (row: any) => <span className="text-danger">{row.punchoutTime}</span>,
      sortable: true,
    },
    {
      name: "BREACK TIME",
      selector: (row: any) => <span className="text-danger">{row.breackTime}</span>,
      sortable: true,
    },
    {
      name: "HALF DAY",
      selector: (row: any) => (
        <i className={`icofont-close-circled ${row.halfDay ? "text-success" : "text-danger"}`}></i>
      ),
      sortable: true,
    },
    {
      name: "FULL DAY",
      selector: (row: any) => (
        <i className={`icofont-close-circled ${row.fullDay ? "text-success" : "text-danger"}`}></i>
      ),
      sortable: true,
    },
    {
      name: "OVERTIME",
      selector: (row: any) => <span className="text-success">{row.overTime}</span>,
      sortable: true,
    },
    {
      name: "TOTAL PRODUCTION",
      selector: (row: any) => row.total,
    },
  ],
  rows: [
    {
      no: "01",
      date: "June 26, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:39 Hr",
      total: "09:39 Hr",
    },
    {
      no: "02",
      date: "June 25, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:39 Hr",
      total: "09:39 Hr",
    },
    {
      no: "03",
      date: "June 24, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "02:00 PM",
      breackTime: "00:00",
      halfDay: true,
      fullDay: false,
      overTime: "00:00",
      total: "04:00 Hr",
    },
    {
      no: "04",
      date: "June 23, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "03:05 PM",
      breackTime: "00:00",
      halfDay: true,
      fullDay: false,
      overTime: "00:00",
      total: "05:00 Hr",
    },
    {
      no: "05",
      date: "June 22, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:00 Hr",
      total: "09:00 Hr",
    },
    {
      no: "06",
      date: "June 21, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:00 Hr",
      total: "09:00 Hr",
    },
    {
      no: "07",
      date: "June 18, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:00 Hr",
      total: "09:00 Hr",
    },
    {
      no: "08",
      date: "June 17, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:00 Hr",
      total: "09:00 Hr",
    },
    {
      no: "09",
      date: "June 16, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:00 Hr",
      total: "09:00 Hr",
    },
    {
      no: "10",
      date: "June 15, 2021",
      punchinTime: "10:05 AM",
      punchoutTime: "09:05 PM",
      breackTime: "01:12 Hr",
      halfDay: false,
      fullDay: true,
      overTime: "01:00 Hr",
      total: "09:00 Hr",
    },
  ],
};
