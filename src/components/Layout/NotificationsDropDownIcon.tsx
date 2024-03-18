import { useUpdateNotificationStatus } from "api/Common/updateNotificationStatus";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { Badge, Dropdown } from "react-bootstrap";
import { getTimeDifference } from "utils/DateUtils";
import { handleServerError } from "utils/HandlingServerError";
import { NotificationType } from "types/Notification";

interface Props {
  Notifications: NotificationType[];
}

const NotificationsDropDownIcon = ({ Notifications }: Props) => {
  const { mutateAsync } = useUpdateNotificationStatus();
  const { showError } = useUI();
  const { push } = useApp();

  const handleNotificationStatus = async (notification: any) => {
    if (notification.is_read) return;
    try {
      await mutateAsync(notification.id);
      push(notification.url);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  let pendingNotifications: NotificationType[] = [];
  if (Notifications && Array.isArray(Notifications)) {
    pendingNotifications = Notifications?.filter((notification) => notification.is_read === false) || [];
  }

  return (
    <Dropdown className="notifications">
      <Dropdown.Toggle as="a" className="nav-link dropdown-toggle pulse pe-4 pointer">
        <div className="">
          <i className="icofont-alarm fs-5 position-relative">
            {pendingNotifications?.length! > 0 && (
              <Badge
                pill
                bg="primary"
                className="position-absolute"
                style={{
                  top: "-14px",
                  right: "-14px",
                }}>
                {pendingNotifications?.length!}
              </Badge>
            )}
          </i>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className=" rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0">
        {Notifications && (
          <div className="card border-0 w380">
            <div className="card-header border-0 p-3">
              <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                <span>Notifications</span>
                {pendingNotifications?.length! > 0 && (
                  <span className="badge text-white">{pendingNotifications?.length!}</span>
                )}
              </h5>
            </div>
            <div className="tab-content card-body">
              <div className="tab-pane fade show active">
                <ul className="list-unstyled list mb-0">
                  {Array.isArray(Notifications) &&
                    Notifications.length > 0 &&
                    Notifications.map((notification: any, index: number) => (
                      <li key={index} className={`${notification.is_read ? "" : "bg-light"} py-2 mb-1 border-bottom`}>
                        <a href="#!" onClick={() => handleNotificationStatus(notification)} className="d-flex">
                          <div className="flex-fill ms-2">
                            <p className="d-flex justify-content-between mb-0 ">
                              <span className="font-weight-bold">{notification?.title}</span>{" "}
                              <small>{getTimeDifference(notification.receivedAt)}</small>
                            </p>
                            <span className="">{notification?.content}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div
              role="button"
              className="card-footer text-center border-top-0"
              onClick={() => push("/" + PAGES.NOTIFICATIONS)}>
              View all notifications
            </div>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationsDropDownIcon;
