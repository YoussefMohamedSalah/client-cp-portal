import { useEffect, useState } from "react";
import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { Project } from "types/Project";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useDeleteProject } from "api/Projects/deleteProject";
import { useProjectsQuery } from "api/Projects/getAllProjects";
import ProjectCard from "components/Projects/ProjectCard";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { mutateAsync: deleteMutation } = useDeleteProject();
  const { data, error, isLoading } = useProjectsQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  useEffect(() => {
    if (data && data.projects && data.projects.data) {
      setProjects(data.projects.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return null;

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Projects"}
          isBtnShow={true}
          btnText={"Create Project"}
          onClickBtn={() => push("/" + PAGES.PROJECT)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          {projects.map((project: Project) => (
            <div key={project.id}>
              <ProjectCard project={project} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
