import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import NotificationCard from "components/Notifications/NotificationCard";
import { useNotificationsQuery } from "api/Common/getAllNotifications";
import { Notification } from "types/Notification";

const Notifications = () => {
  const { isLoading, error, data } = useNotificationsQuery({});
  const notifications: Notification[] =
    data?.notifications.data! || ([] as Notification[]);

  if (isLoading) return <Loading />;
  if (error) return null;

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Notifications" />

      <div>
        {Array.isArray(notifications) &&
          notifications?.map((notification, index) => (
            <NotificationCard notification={notification} key={index} />
          ))}

        <div className="text-center">
          <a href="#!" className="dark-link">
            Load more Notifications
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
