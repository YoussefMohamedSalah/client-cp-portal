import React, { useState } from "react";
import { sumDaysLeftFromToDay } from "utils/Convert";
import useApp from "hooks/useApp";
import { styled } from "@mui/material/styles";

import { projectStatusBg } from "utils/ProjectsUtils";
import { isAdminView } from "utils/Helpers";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Tender } from "types/Tender";
import { PAGES } from "constants/pages";
import { Button, Typography, IconButton, Zoom } from "@mui/material";
import DeleteModal from "components/Modals/DeleteModal";
import {
  InfoOutlinedIcon,
  GroupsOutlinedIcon,
  DeleteIcon,
  AccessTimeOutlinedIcon,
  EditOutlinedIcon,
} from "components/Icons/MuiIcons";

interface Props {
  tender: Tender;
  onDelete: (id: string) => void;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    maxWidth: 500,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
const TenderCard = ({ tender, onDelete }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { push } = useApp();

  return (
    <div className="grey-bg container-fluid">
      <section id="tenders">
        <div className="card p-1">
          <div className="card-content">
            <div className="card-body d-flex flex-column">
              <div className="media row">
                <div className="col-xl-5 col-12">
                  <div
                    className="d-flex gap-3 align-items-center pointer"
                    onClick={() => push("/" + PAGES.TENDER_INFO + "/" + tender.id)}>
                    <h3 className="primary">{tender.code}</h3>
                    <span className={`small ${projectStatusBg(tender?.status!)} py-1 px-2 rounded align-self-start`}>
                      {tender?.status! || ""}
                    </span>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      size="small"
                      variant="contained"
                      className="bg-primary text-white"
                      startIcon={<GroupsOutlinedIcon />}>
                      User : {tender?.user.name!}
                    </Button>
                    <HtmlTooltip
                      placement="top"
                      TransitionComponent={Zoom}
                      title={
                        <React.Fragment>
                          <Typography color="inherit">{tender?.code!}</Typography>
                          <b className="border-top-0">{tender.description}</b>
                        </React.Fragment>
                      }>
                      <Button
                        size="small"
                        variant="contained"
                        className="bg-warning text-white"
                        startIcon={<InfoOutlinedIcon />}>
                        About
                      </Button>
                    </HtmlTooltip>
                    <Button
                      size="small"
                      variant="contained"
                      className="bg-success text-white"
                      startIcon={<AccessTimeOutlinedIcon />}>
                      {sumDaysLeftFromToDay(tender?.hand_over!)} Days Left
                    </Button>
                  </div>
                </div>

                <div className="col-xl-1 col-12 text-end">
                  {isAdminView() ? (
                    <div>
                      <IconButton aria-label="delete" size="medium" color="error" onClick={() => setIsModal(true)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        size="medium"
                        color="primary"
                        onClick={() => push("/" + PAGES.TENDER_INFO + "/" + tender.id)}>
                        <EditOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={() => onDelete(tender.id)}
        message={`Are you sure you want to delete ${tender.code} ?`}
        modalHeader={`Delete ${tender.code}`}
      />
    </div>
  );
};

export default TenderCard;
