import { PrintMainInfoSec } from "types/Print";

interface Props {
	mainInfo: PrintMainInfoSec[];
};

const DocumentMainInfoSec = ({ mainInfo }: Props) => {
	return (
		<div className="row mb-4">
			<div>
				{mainInfo && mainInfo.map((info, index: number) => {
					return (
						<div className={`pb-2 ${!info.key || !info.value ? "d-none" : ""}`} key={index}>
							<strong>
								{info.key}:
							</strong>
							&nbsp;&nbsp; {info.value || ''}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default DocumentMainInfoSec;
