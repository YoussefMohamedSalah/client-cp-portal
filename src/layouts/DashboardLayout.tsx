import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Session } from "types/Session";
import Loading from "components/UI/Loading";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { PagesRender, PagesRenderProps } from "utils/PagesRender";
import SideBar from "components/Layout/SideBar";
import Header from "components/Layout/Header";

interface Props {
	session: Session
};

const DashboardLayout = ({ session }: Props) => {
	const [initialized, setInitialized] = useState<boolean>(false);

	let { slug, id } = useParams<{ slug: string, id: string }>();
	const { push } = useApp();

	useEffect(() => {
		if (session && !initialized) {
			setInitialized(true);
		} else if (!session) {
			push(PAGES.LOGIN)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session]);

	let paramsObj: PagesRenderProps = {
		slug: slug ? slug : null,
		id: id ? id : null,
	};

	if (!initialized) return <Loading />;

	return (
		<>
			<SideBar session={session} />
			<div className="main px-lg-4 px-md-4">
				<Header session={session} />
				<div className="body d-flex py-lg-3 py-md-2">
					{PagesRender(paramsObj)}
				</div>
			</div>
		</>
	)
}

export default DashboardLayout
