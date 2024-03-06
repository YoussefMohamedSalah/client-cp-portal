import React, { useState } from "react";
import { Project } from "types/Project";
import { calculateProjectPercentage, sumDaysLeftFromToDay } from "utils/Convert";
import { ProgressBar } from "react-bootstrap";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import Zoom from "@mui/material/Zoom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteModal from "components/Modals/DeleteModal";
import {
  InfoOutlinedIcon,
  TaskOutlinedIcon,
  GroupsOutlinedIcon,
  DeleteIcon,
  AccessTimeOutlinedIcon,
  EditOutlinedIcon,
} from "components/Icons/MuiIcons";
import { projectStatusBg, projectStatusVariant } from "utils/ProjectsUtils";

interface Props {
  project: Project;
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

const ProjectCard = ({ project, onDelete }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { push } = useApp();
  return (
    <div className="grey-bg container-fluid">
      <section id="projects">
        <div className="row ">
          <div className="col-xl-12 col-sm-6 col-12">
            <div className="card">
              <div className="card-content">
                {/*  */}
                <div className="card-body d-flex flex-column">
                  <div className="media row">
                    <div className="col-xl-5 col-12">
                      <div
                        className="d-flex gap-3 align-items-center pointer"
                        onClick={() => push("/" + PAGES.PROJECT_INFO + "/" + project.id)}>
                        <h3 className="primary">{project.name}</h3>
                        <span className={`small ${projectStatusBg(project?.project_status!)} py-1 px-2 rounded align-self-start`}>
                          {project?.project_status! || ""}
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
                          Members: {project?.members_count!}
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          className="bg-secondary text-white"
                          startIcon={<TaskOutlinedIcon />}>
                          Tasks: {project?.members_count!}
                        </Button>
                        <HtmlTooltip
                          placement="top"
                          TransitionComponent={Zoom}
                          title={
                            <React.Fragment>
                              <Typography color="inherit">{project?.name!}</Typography>
                              <b className="border-top-0">{project.description}</b>
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
                          {sumDaysLeftFromToDay(project?.delivery_date!)} Days Left
                        </Button>
                      </div>
                    </div>
                    <div className="col-xl-1 col-12 text-end">
                      <IconButton aria-label="delete" size="medium" color="error" onClick={() => setIsModal(true)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        size="medium"
                        color="primary"
                        onClick={() => push("/" + PAGES.PROJECT + "/" + project.id)}>
                        <EditOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                  <div>
                    <span className="pb-1">progress</span>
                    <ProgressBar style={{ height: "7px", marginTop: "3px" }}>
                      <ProgressBar
                        variant={projectStatusVariant(project?.project_status!)}
                        now={15}
                        style={{
                          width: `${calculateProjectPercentage(project?.contract_date!, project?.delivery_date!)}%`,
                        }}
                      />
                    </ProgressBar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={() => {
          setIsModal(false);
          onDelete(project.id);
        }}
        message={`Are you sure you want to delete ${project.name} ?`}
        modalHeader={`Delete ${project.name}`}
      />
    </div>
  );
};

export default ProjectCard;
