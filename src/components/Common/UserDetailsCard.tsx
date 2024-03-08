import { Customer } from "types/Customer";
import { getImageUrl } from "utils/Helpers";

interface Props {
  user: Customer;
}

interface DataArrayType {
  iconClass: string;
  label: string;
  value: any;
}


const UserDetailsCard: React.FC<Props> = ({ user }) => {
  const { avatar, customer_type, code, country, city, company_name, building_number, phone_number, createdAt, area, street, email, vat_on } = user

  const dataArr: DataArrayType[] = [
    { iconClass: "icofont-briefcase", label: "Company name:", value: company_name },
    { iconClass: "icofont-flag", label: "Country:", value: country },
    { iconClass: "icofont-building", label: "City:", value: city },
    { iconClass: "icofont-road", label: "Street:", value: street },
    { iconClass: "icofont-building", label: "Area:", value: area },
    { iconClass: "icofont-building", label: "Building number:", value: building_number },
    { iconClass: "icofont-ui-touch-phone", label: "Phone number:", value: phone_number },
    { iconClass: "icofont-email", label: "Email:", value: email },
    { iconClass: "icofont-address-book", label: "Vat:", value: `${vat_on} %` },
    { iconClass: "icofont-ui-calendar", label: "Join date:", value: new Date(createdAt).toLocaleDateString() },
  ]
  return (
    <>
      <div className="card teacher-card mb-3">
        <div className="card-body d-flex teacher-fullDetail">
          <div className="profile-teacher pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w280">
            <a href="#!">
              <img
                src={getImageUrl(avatar!)}
                alt={`${company_name}-logo`}
                className="avatar xl rounded-circle img-thumbnail shadow-sm"
              />
            </a>
            <div className="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
              <span className="mb-1 small fw-bold text-secondary">{customer_type}</span>
              <span className="mb-1 text-muted small fw-bold">USER ID : <span className="text-secondary">{code}</span></span>
            </div>
          </div>
          <div className="teacher-info border-start ps-xl-4 ps-md-4 ps-sm-4 ps-4 w-100 d-flex flex-column justify-content-evenly">
            <div>
              <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{user.name}</h6>
              <div className="row g-2 pt-2">
                {dataArr.map((term, index: number) => {
                  return (
                    <div key={index} className="col-xl-5">
                      <div className="d-flex align-items-center">
                        <i className={`${term.iconClass}`} />
                        <span className="ms-2 small text-muted fw-bold">{term.label} : <span className="text-secondary">{term.value}</span></span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsCard;
