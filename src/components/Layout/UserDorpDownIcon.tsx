import { useLogout } from "api/Auth/Logout";
import { useAuth } from "contexts/AuthContext";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { Dropdown } from "react-bootstrap";
import { Session } from "types/Session";
import { handleServerError } from "utils/HandlingServerError";
import { getImageUrl } from "utils/Helpers";
import { removeClientSession } from "utils/Session";

interface Props {
  session: Session;
};

const UserDorpDownIcon = ({ session }: Props) => {
  const { mutateAsync: logoutMutation } = useLogout();
  const { setSession, changeView, view, isSuperUser } = useAuth();
  const { showError } = useUI();
  const { push } = useApp();

  const handleLogout = async () => {
    try {
      const result = await logoutMutation(session?.user?.id!);
      if (result) {
        setSession(null);
        removeClientSession();
      }
      push('/login');
    } catch (err: any) {
      console.log(err.response?.data?.msg!)
      showError(handleServerError(err.response));
    }
  };

  return (
    <Dropdown className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center">
      <div className="u-info me-2">
        <p className="mb-0 text-end line-height-sm">
          <span className="font-weight-bold">
            {session?.user?.name || "admin"}
          </span>
        </p>
        <small>
          {view === "admin" ? "Admin Profile" : "User Profile"}
        </small>
      </div>
      <Dropdown.Toggle
        as="a"
        className="nav-link dropdown-toggle pulse p-0"
      >
        <img
          className="avatar lg rounded-circle img-thumbnail"
          src={getImageUrl(session?.user?.avatar!)}
          alt="profile"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
        <div className="card border-0 w280">
          <div className="card-body pb-0">
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                push('/profile')
              }}>
              <div className="d-flex py-1">
                <img
                  className="avatar rounded-circle"
                  src={getImageUrl(session?.user?.avatar!)}
                  alt="profile"
                />
                <div className="flex-fill ms-3">
                  <p className="mb-0">
                    <span className="font-weight-bold">
                      {session?.user?.name || "admin"}
                    </span>
                  </p>
                  <small className="">
                    {session?.user?.email || "admin@example.com"}
                  </small>
                </div>
              </div>
            </div>

            <div>
              <hr className="dropdown-divider border-dark" />
            </div>
          </div>
          <div className="list-group m-2 ">
            <div style={{ cursor: 'pointer' }}
              onClick={() => changeView()}
              className="list-group-item list-group-item-action border-0 "
            >
              <i className="icofont-tasks fs-5 me-3" />{view === "admin" ? "User Profile" : "Admin Profile"}
            </div>
            <div style={{ cursor: 'pointer' }}
              onClick={() => {
                push('/profile')
              }}
              className="list-group-item list-group-item-action border-0 "
            >
              <i className="icofont-ui-user-group fs-6 me-3" />profile
            </div >
            <div>
              <hr className="dropdown-divider border-dark" />
            </div>
            <span
              onClick={handleLogout}
              className="list-group-item list-group-item-action border-0 pointer"
            >
              <i className="icofont-logout fs-6 me-3" />Sign out
            </span>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserDorpDownIcon
