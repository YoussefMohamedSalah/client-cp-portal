// import { TimeAttendanceData } from "components/Data/AppData";
// import AttendanceCard from "components/Employees/AttendanceCard";
// import React, { lazy } from "react";
// import { Dropdown, Modal } from "react-bootstrap";
// const PageHeader = lazy(() => import("../../components/common/PageHeader"));

// interface Props { }
// interface State {
//   isModal: boolean;
// }

// const INITIAlIZE_DATA: State = {
//   isModal: false,
// };

// const Attendance: React.FC<Props> = () => {
//   const [state, setState] = React.useState<State>(INITIAlIZE_DATA);

//   return (
//     <>
//       <div className="container-xxl">
//         <PageHeader
//           headerTitle="Attendance (Admin)"
//           renderRight={() => {
//             return (
//               <div className="col-auto d-flex w-sm-100">
//                 <button
//                   type="button"
//                   className="btn btn-primary w-sm-100 me-2"
//                   onClick={() => {
//                     setState({ ...state, isModal: true });
//                   }}
//                 >
//                   <i className="icofont-edit me-2 fs-6" /> Edit Attendance
//                 </button>
//                 <Dropdown>
//                   <Dropdown.Toggle as="button" className="btn btn-primary">
//                     Filter
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu as="ul" className="dropdown-menu-end">
//                     <li>
//                       <a className="dropdown-item" href="#!">
//                         All
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" href="#!">
//                         Today Absent
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item" href="#!">
//                         Week Absent
//                       </a>
//                     </li>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </div>
//             );
//           }}
//         />
//         <div className="row clearfix g-3">
//           <div className="col-sm-12">
//             <AttendanceCard data={TimeAttendanceData} />
//             {/* data table example */}
//           </div>
//         </div>

//         <Modal
//           centered
//           show={state.isModal}
//           onHide={() => {
//             setState({ ...state, isModal: false });
//           }}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title className="fw-bold">Edit Attendance</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="mb-3">
//               <label className="form-label">Select Person</label>
//               <select className="form-select">
//                 <option>Joan Dyer</option>
//                 <option value="1">Ryan Randall</option>
//                 <option value="2">Phil Glover</option>
//                 <option value="3">Victor Rampling</option>
//                 <option value="4">Sally Graham</option>
//                 <option value="5">Robert Anderson</option>
//                 <option value="6">Ryan Stewart</option>
//               </select>
//             </div>
//             <div className="deadline-form">
//               <form>
//                 <div className="row g-3 mb-3">
//                   <div className="col-sm-12">
//                     <label htmlFor="datepickerdedass" className="form-label">
//                       Select Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="datepickerdedass"
//                     />
//                   </div>
//                   <div className="col-sm-12">
//                     <label className="form-label">Attendance Type</label>
//                     <select className="form-select">
//                       <option>Full Day Present</option>
//                       <option value="1">Half Day Present</option>
//                       <option value="2">Full Day Absence</option>
//                     </select>
//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className="mb-3">
//               <label
//                 htmlFor="exampleFormControlTextarea78d"
//                 className="form-label"
//               >
//                 Edit Reason
//               </label>
//               <textarea
//                 className="form-control"
//                 id="exampleFormControlTextarea78d"
//                 rows={3}
//               ></textarea>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => {
//                 setState({ ...state, isModal: false });
//               }}
//             >
//               Done
//             </button>
//             <button type="button" className="btn btn-primary">
//               Save
//             </button>
//           </Modal.Footer>
//         </Modal>
//       </div>

//     </>
//   );
// };

// export default Attendance;

const Attendance = () => {
  return <div />;
};

export default Attendance;
