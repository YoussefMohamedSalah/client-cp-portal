import { Customer } from "types/Customer";
import { getImageUrl } from "utils/Helpers";


interface Props {
  user: Customer;
}


const UserDetailsCard: React.FC<Props> = ({ user }) => {






  return (
    <>
      <div className="card teacher-card mb-3">
       
        <div className="card-body d-flex teacher-fullDetail">
          <div className="profile-teacher pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w280">
            <a href="#!">
              <img
                src={getImageUrl(user?.avatar!)}
                alt=""
                className="avatar xl rounded-circle img-thumbnail shadow-sm"
              />
            </a>
            <div className="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
            <span className="mb-1 text-muted small fw-bold">CUSTOMER TYPE : <span className="text-secondary">{user.customer_type}</span></span>
              <span className="mb-1 text-muted small fw-bold">USER ID : <span className="text-secondary">{user.code}</span></span>
              
            </div>
          </div>
          <div className="teacher-info border-start ps-xl-4 ps-md-4 ps-sm-4 ps-4 w-100 d-flex flex-column justify-content-evenly">
            <div>
              <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{user.name}</h6>
             
            
              <div className="row g-2 pt-2">
              <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-flag" />
                    <span className="ms-2 small text-muted fw-bold">Country : <span className="fw-normal text-black">{user.country ? user.country: "undefined"}</span></span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-building" />
                    <span className="ms-2 small text-muted fw-bold">City : <span className="fw-normal text-black">{user.city ? user.city : "undefined"}</span></span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-briefcase" />
                    <span className="ms-2 small text-muted fw-bold">Company Name : <span className="fw-normal text-black">{user.company_name? user.company_name : "undefined"}</span> </span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                  <i className="icofont-building" />
                    <span className="ms-2 small text-muted fw-bold">Building Number : <span  className="fw-normal text-black" >{user.building_number? user.building_number : "undefined"} </span> </span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                  <i className="icofont-building" />
                    <span className="ms-2 small text-muted fw-bold">Area : <span className="fw-normal text-black">{user.area? user.area : "undefined"}</span></span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-road" />
                    <span className="ms-2 small text-muted fw-bold">Street : <span className="fw-normal text-black">{user.street? user.street : "undefined"}</span></span>
                  </div>
                </div>
          
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                  <i className="icofont-ui-touch-phone" />
                    <span className="ms-2 small text-muted fw-bold">Phone Number : <span className="fw-normal text-black">{user.phone_number ? user.phone_number : "Add Phone Number"}</span></span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                  <i className="icofont-ui-calendar" />
                    <span className="ms-2 small text-muted fw-bold">Created Date : <span className="fw-normal text-black">{user.createdAt? new Date(user.createdAt).toLocaleDateString() : "undefined"}</span> </span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-ui-calendar" />
                    <span className="ms-2 small text-muted fw-bold">Updated Date : <span className="fw-normal text-black">{user.updatedAt? new Date(user.updatedAt).toLocaleDateString() : "undefined"}</span> </span>
                  </div>
                </div>
              
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-email" />
                    <span className="ms-2 small text-muted fw-bold">User Email : <span className="fw-normal text-black">{user.email ? user.email : "No Email"}</span></span>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="d-flex align-items-center">
                    <i className="icofont-address-book" />
                    <span className="ms-2 small text-muted fw-bold">Vat On :<span className="fw-normal text-black">{user.vat_on ? user.vat_on : "vat on"}</span> </span>
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsCard;
