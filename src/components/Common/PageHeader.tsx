import { Nav } from "react-bootstrap";

interface TabList {
	title: string;
	href: string;
};

interface Props {
	headerTitle?: string;
	isTabShow?: boolean;
	tabList?: TabList[];
	isBtnShow?: boolean;
	btnText?: string;
	onClickBtn?: () => void;
	renderRight?: () => React.ReactNode;
};

const PageHeader: React.FC<Props> = ({
	headerTitle,
	isTabShow,
	tabList,
	isBtnShow,
	btnText,
	onClickBtn,
	renderRight,
}) => {
	return (
		<div className="row align-items-center">
			<div className="border-0 mb-4">
				<div className="card-header no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
					<h3 className="fw-bold mb-0 py-3 pb-2">{headerTitle}</h3>
					{isTabShow && tabList && tabList.length > 0 ? (
						<div className="col-auto py-2 w-sm-100">
							<Nav
								variant="pills"
								className="nav nav-tabs tab-body-header rounded invoice-set"
							>
								{tabList.map((tab, index: number) => {
									return (
										<div key={index}>
											<Nav.Item>
												<Nav.Link href={tab.href} eventKey={tab.title}>{tab.title}</Nav.Link>
											</Nav.Item>
										</div>
									)
								})}
							</Nav>
						</div>
					) : null}

					{isBtnShow && btnText ? (
						<div className="col-auto d-flex w-sm-100">
							<button className="btn btn-primary btn-set-task w-sm-100" onClick={onClickBtn ? onClickBtn : () => { }}>
								<i className="icofont-plus-circle me-2 fs-6" />{btnText}
							</button>
						</div>
					) : null}

					{renderRight ? renderRight() : null}
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
