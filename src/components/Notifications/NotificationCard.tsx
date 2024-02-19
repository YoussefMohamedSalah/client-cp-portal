import { useUI } from "contexts/UIContext";
import { useUpdateNotificationStatus } from "api/Common/updateNotificationStatus";
import useApp from "hooks/useApp";
import { getTimeDifference } from "utils/DateUtils";
import { handleServerError } from "utils/HandlingServerError";
import { Notification } from "types/Notification";

interface Props {
  notification: Notification;
}

const NotificationCard: React.FC<Props> = ({ notification }) => {
  const { mutateAsync } = useUpdateNotificationStatus();
  const { showError } = useUI();
  const { push } = useApp();

  const handleNotificationStatus = async (notification: any) => {
    if (notification.is_read) return;
    try {
      await mutateAsync(notification.id);
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
    <div className={`pointer`} onClick={() => handleClick(notification)}>
      <div
        className=""
        style={{
          ...notificationListStyle,
          borderLeft: `${notification.is_read ? "" : "2px solid #224189"}`,
        }}
      >
        <div className="d-flex">
          <div
            className="notification-list_detail"
            style={notificationListDetailStyle}
          >
            <p>
              <b>{notification?.title}</b>
            </p>
            <p className="text-muted">{notification?.content}</p>
            <p className="text-muted">
              <small>
                {getTimeDifference(String(notification.receivedAt))} ago
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
