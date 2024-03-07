import { useProjectDetailsQuery } from "api/Projects/getProjectDetails";
import PageHeader from "components/Common/PageHeader";
import ProjectCharts from "components/Projects/ProjectCharts";
import Loading from "components/UI/Loading";
import SmallCard from "components/UI/SmallCard";
import { PAGES } from "constants/pages";
import useApp from "hooks/useApp";
import { Project } from "types/Project";
import { getShortString } from "utils/Helpers";
import { getProjectProgressOptions, totalProjectExpenses } from "utils/ProjectsUtils";
import { IOption } from "types/Option";

interface Props {
  id: string;
}

const ProjectDetails = ({ id }: Props) => {
  const { push } = useApp();

  const { data: projectData, error: projectError, isLoading: projectIsLoading } = useProjectDetailsQuery({ id });
  if (id && projectIsLoading) return <Loading />;
  if (id && projectError) return null;
  let project: Project = projectData?.project.data! || ({} as Project);

  const data: IOption[] = [
    { label: "PO", value: Number(project.po_expenses) },
    { label: "PC", value: Number(project.pc_expenses) },
    { label: "Subcontractors", value: Number(project.subcontractor_expenses) },
    { label: "Staff", value: Number(project.staff_expenses) },
  ];

  const projectProgress = getProjectProgressOptions(project?.progress! || []);

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={`${project.name!} Details`}
          isBtnShow={true}
          isBackBtn={true}
          btnText={"Edit"}
          onClickBtn={() => push("/" + PAGES.PROJECT + "/" + project.id)}
        />
        {/* Project Details */}
        <div className="row clearfix g-3">
          <div className="col-sm-12">
            {/*  */}
            <div className="row g-3">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="row g-3 mb-3">
                  <div className={`col-md-4`}>
                    <SmallCard
                      title={"Customer"}
                      value={getShortString(project.customer_details?.name!, 42)}
                      bgColor={""}
                      iconClass={"icofont-user-alt-1 fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>
                  <div className={`col-md-4`}>
                    <SmallCard
                      title={"Manager"}
                      value={getShortString(project.manager?.name!, 42)}
                      bgColor={""}
                      iconClass={"icofont-user-alt-1 fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>
                  <div className={`col-md-4`}>
                    <SmallCard
                      title={"Total Expenses"}
                      value={`${totalProjectExpenses(project).toFixed(2)} SAR`}
                      bgColor={""}
                      iconClass={"icofont-riyal fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>
                  {data.map((item, index: number) => {
                    return (
                      <div className={`col-md-3`} key={index}>
                        <SmallCard
                          title={`${item.label} Expenses`}
                          value={`${Number(item.value).toFixed(2)} SAR`}
                          bgColor={""}
                          iconClass={"icofont-riyal fs-2"}
                          onClick={() => console.log("")}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectCharts
          projectName={project.name!}
          projectExpensesData={data}
          totalExpenses={`${totalProjectExpenses(project).toFixed(2)} SAR`}
          projectProgressData={projectProgress}
          totalProgress={`${project.total_progress_percentage} %`}
        />
      </div>
    </>
  );
};

export default ProjectDetails;
