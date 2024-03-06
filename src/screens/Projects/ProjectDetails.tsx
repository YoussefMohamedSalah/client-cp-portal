import { useProjectDetailsQuery } from "api/Projects/getProjectDetails";
import PageHeader from "components/Common/PageHeader";
import Loading from "components/UI/Loading";
import SmallCard from "components/UI/SmallCard";
import { PAGES } from "constants/pages";
import useApp from "hooks/useApp";
import React from "react";
import { Project } from "types/Project";
import { getShortString } from "utils/Helpers";
import { totalProjectExpenses } from "utils/ProjectsUtils";

interface Props {
  id: string;
}

const ProjectDetails = ({ id }: Props) => {
  const { push } = useApp();

  const { data: projectData, error: projectError, isLoading: projectIsLoading } = useProjectDetailsQuery({ id });
  if ((id && projectIsLoading)) return <Loading />;
  if ((id && projectError)) return null;
  let project: Project = projectData?.project.data! || {} as Project;


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



                  <div className={`col-md-3`}>
                    <SmallCard
                      title={"PO Expenses"}
                      value={`${Number(project.po_expenses)!.toFixed(2)} SAR`}
                      bgColor={""}
                      iconClass={"icofont-riyal fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>
                  <div className={`col-md-3`}>
                    <SmallCard
                      title={"PC Expenses"}
                      value={`${Number(project.pc_expenses)!.toFixed(2)} SAR`}
                      bgColor={""}
                      iconClass={"icofont-riyal fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>
                  <div className={`col-md-3`}>
                    <SmallCard
                      title={"Subcontractors Expenses"}
                      value={`${Number(project.subcontractor_expenses)!.toFixed(2)} SAR`}
                      bgColor={""}
                      iconClass={"icofont-riyal fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>
                  <div className={`col-md-3`}>
                    <SmallCard
                      title={"Staff Expenses"}
                      value={`${Number(project.staff_expenses)!.toFixed(2)} SAR`}
                      bgColor={""}
                      iconClass={"icofont-riyal fs-2"}
                      onClick={() => console.log("")}
                    />
                  </div>


                  {/* <div
                    className={`col-md-4`}>
                    <SmallCard
                  title={card.title}
                  bgColor={card.color}
                  value={card.value}
                  iconClass={card.iconClass}
                  onClick={card.onClick}
                />
                <StatusCard
                  progress=""
                  details={`${invoices.length ? invoices.length : 0}`}
                  iconClass="icofont-price fs-4"
                  iconbg="bg-lightgreen"
                  title="Invoices"
                />
                  </div> */}
                </div>
                <div className="row g-3 mb-3">
                  <div className="">
                    {/* <ContractToPrint contract={contract} contractFinances={contractFinances} /> */}
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12">
                <div className="col-lg-12 col-md-12">
                  <div className='d-flex justify-content-center align-items-center gap-2'>
                    {/* {allowRejectOrApproveActionBtn(contract) && (
                  <button type="button" style={{ minWidth: '7rem' }} className="btn btn-success text-white m-2 p-2" onClick={handleOpenApproveModal}>
                    Approve
                  </button>
                )}
                {allowRejectOrApproveActionBtn(contract) && (
                  <button type="button" style={{ minWidth: '7rem' }} className="btn btn-danger text-white m-2 p-2" onClick={handleOpenRejectModal}>
                    Reject
                  </button>
                )} */}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  {/* <ContractFilesCard data={contract.files} /> */}
                </div>
                <div className="col-lg-12 col-md-12">
                  {/* <ContractInvoicesCard data={contract.invoices} /> */}
                </div>
                {/* <div>
            <ContractComments />
          </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
