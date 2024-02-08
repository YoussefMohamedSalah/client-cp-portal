interface Props {
	text?: string;
};

const NoTableData: React.FC<Props> = ({ text }) => {
	return (
		<div
			className="d-flex align-items-center justify-content-center"
			style={{ height: "70vh" }}
		>
			<div className="col-xs-1 center-block">
				<h5 className="text-center">
					{text ? text : "No Table data Exists..."}
				</h5>
			</div>
		</div>
	);
};

export default NoTableData;