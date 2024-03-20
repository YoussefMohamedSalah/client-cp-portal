import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import { getTimeDifference } from "utils/DateUtils";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/inputValidator";
import { useUpdateNotificationStatus } from "api/Notifications/setNotificationStatus";
import { useNotificationsQuery } from "api/Notifications/getAllNotifications";
import useApp from "hooks/useApp";
import { NotificationType } from "types/Notification";
import NoTableData from "components/Common/NoTableData";

const Notifications = () => {
  const { isLoading, error, data } = useNotificationsQuery({});
  const { mutateAsync: updateMutation } = useUpdateNotificationStatus();
  const { showError } = useUI();
  const { push } = useApp();

  if (isLoading) return null;
  if (error) return <Loading />;

  const notifications: NotificationType = data?.notifications?.data! || ([] as NotificationType[]);

  const handleNotificationStatus = async (notification: any) => {
    if (notification.is_read) return;
    try {
      await updateMutation(notification.id);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleClick = (notification: any) => {
    handleNotificationStatus(notification);
    push(notification.url);
  };

  const notificationListStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "7px",
    background: "#fff",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.06)",
  };

  const notificationListDetailStyle = {
    marginBottom: "0",
    lineHeight: "1",
  };

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Notifications" isBackBtn={true} />
      <div>
        {Array.isArray(notifications) &&
          notifications.length > 0 &&
          notifications.map((notification: NotificationType) => (
            <>
              <div className={`pointer`} onClick={() => handleClick(notification)}>
                <div
                  className=""
                  style={{
                    ...notificationListStyle,
                    borderLeft: `${notification.is_read ? "" : "2px solid #224189"}`,
                  }}>
                  <div className="d-flex">
                    <div className="notification-list_detail" style={notificationListDetailStyle}>
                      <p>
                        <b>{notification?.title!}</b>
                      </p>
                      <p className="text-muted">{notification?.content!}</p>
                      <p className="text-muted">
                        <small>{getTimeDifference(notification?.receivedAt!)} ago</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <a href="#!" className="dark-link">
                  Load more Notifications
                </a>
              </div>
            </>
          ))}
        {Array.isArray(notifications) && notifications.length === 0 && (
          <>
            <NoTableData text={"No notifications exists"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
