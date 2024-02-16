import { STATUS } from "enums/enums";
import React from "react";
import { WorkFlow } from "types/Workflow";
import { getImageUrl } from "utils/Helpers";

interface Props {
  work_flow: WorkFlow[];
  documentStatus: STATUS;
}

const DocumentSigns = ({ work_flow, documentStatus }: Props) => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-start gap-4 flex-wrap">
      {work_flow.map((flow, index: number) => {
        let isApproved = flow.state && !flow.isRejected && documentStatus !== STATUS.REJECTED;
        return (
          <div key={index} className="d-flex flex-column gap-1" style={{ maxWidth: "10rem" }}>
            <p className="align-self-center">{flow.name}</p>
            {flow.sign && isApproved ? (
              <img
                className="mb-2"
                style={{ width: "100%", height: "100%", objectFit: "inherit" }}
                src={getImageUrl(flow.sign! || "")}
                alt=""
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default DocumentSigns;
