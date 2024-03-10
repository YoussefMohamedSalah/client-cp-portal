import { useEffect, useState } from "react";
import { Project } from "types/Project";
import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import { getShortString, isAdminView } from "utils/Helpers";
import { PAGES } from "constants/pages";
import useApp from "hooks/useApp";
import SmallCard from "components/UI/SmallCard";
import { useManagerProjectsQuery } from "api/Projects/getManagerProjects";

const DailyReports = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data, error, isLoading } = useManagerProjectsQuery({});
  const { push } = useApp();

  useEffect(() => {
    if (!isAdminView()) {
      push("/");
    }
    if (data && data.projects && data.projects.data) {
      setProjects(data.projects.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (selectedProject) push("/" + PAGES.DAILY_REPORT + "/" + selectedProject.id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  if (isLoading) return <Loading />;
  if (error) return null;

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Daily Reports"}
          isBtnShow={false}
          isBackBtn={true}
          btnText={"Create Daily Report"}
          onClickBtn={() => push("/" + PAGES.DAILY_REPORT)}
        />
        {/* table data */}
        <div className="row clearfix g-3">
          <div className="col-sm-12">
            {!selectedProject && (
              <div className="d-flex align-items-center justify-content-center p-2">
                <h3>Please Select Project</h3>
              </div>
            )}
            {/*  */}
            <div className="row g-3">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="row g-3 mb-3">
                  {projects.map((project, index: number) => {
                    let managersNamesArr: string[] = project.managers.map((manager) => manager.name) || [];
                    let subManagersNamesArr: string[] = managersNamesArr?.slice(1)! || [];
                    let stringManagersNames: string = subManagersNamesArr?.join(", ")!;
                    return (
                      <div className={`col-md-6`} key={index}>
                        <SmallCard
                          title={`${project.name}`}
                          value={`PM : ${getShortString(project.manager?.name!, 42)}`}
                          text={`Assistants : ${stringManagersNames}`}
                          iconClass={"icofont-briefcase fs-2"}
                          onClick={() => setSelectedProject(project)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyReports;
