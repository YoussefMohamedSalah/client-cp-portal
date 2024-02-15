import { Session } from "types/Session";
import UserDorpDownIcon from "./UserDorpDownIcon";
import NotificationsDropDownIcon from "./NotificationsDropDownIcon";
import AttendanceModalIcon from "./AttendanceModalIcon";
import ThemeSwitcher from "components/UI/ThemeSwitcher";
import ToggleSideBarIcon from "./ToggleSideBarIcon";
import { useNotificationsQuery } from "api/Common/getAllNotifications";
import { Notification } from "types/Notification";

interface Props {
	session: Session;
};

const Header = ({ session }: Props) => {
	const { isLoading, error, data } = useNotificationsQuery({});
	const notifications: Notification[] = data?.notifications?.data! || [] as Notification[];

	return (
		<div className="header">
			<nav className="navbar pt-2 pb-2">
				<div className="container-xxl">
					{/* search */}
					<p></p>
					<div className='d-flex justify-self-end justify-content-end col-lg-6 col-md-6 col-12'>
						<div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1 p-2 p-xl-0">
							<AttendanceModalIcon user={session.user} />
							<ThemeSwitcher />
							{!isLoading && !error && (
								<NotificationsDropDownIcon Notifications={notifications} />
							)}
							<UserDorpDownIcon session={session} />
						</div>
						<ToggleSideBarIcon />
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
