import { Nav, Tab } from "react-bootstrap";
import Attachment from "components/Common/Attachment";
import Button from "components/UI/Button";
import {
  employeesCsvAttachmentInput,
  useAddEmployeesByCsvFile,
  useReplaceEmployeesByCsvFile,
  useUpdateEmployeesByCsvFile,
  useDeleteEmployeesByCsvFile,
} from "api/Clx/UploadEmployeesClxFile";
import { useUI } from "contexts/UIContext";
import { handleError, handleServerError } from "utils/HandlingServerError";
import { useState } from "react";
import SimpleSelect from "components/UI/FormInputs/SimpleSelect";

interface TabDataType {
  key: string;
  tabKey: string;
  tabName: string;
}

const DataImportingSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("Select Action Type");
  const { mutateAsync: addCsvFileMutation } = useAddEmployeesByCsvFile();
  const { mutateAsync: replaceCsvFileMutation } = useReplaceEmployeesByCsvFile();
  const { mutateAsync: updateCsvFileMutation } = useUpdateEmployeesByCsvFile();
  const { mutateAsync: deleteCsvFileMutation } = useDeleteEmployeesByCsvFile();

  const { showError, showSuccess } = useUI();

  const tabsData: TabDataType[] = [
    {
      key: "employees",
      tabName: "Employees",
      tabKey: "employees",
    },
  ];

  // const handleDownload = async () => {
  //   try {
  //     const response = await downloadEmployeesCsv({});
  //     // Create a URL for the blob
  //     const url = window.URL.createObjectURL(new Blob([response?.data?.data!]));
  //     // Create a temporary <a> element to initiate the download
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "employees_data.csv"); // Set the filename for download
  //     document.body.appendChild(link);
  //     link.click();
  //     // Clean up
  //     link.parentNode?.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  const handleUpload = async (file: File) => {
    if (!file) return showError(handleError("Please upload file"));
    if (!term) return showError(handleError("Please select term"));
    if (term && term === "Select Action Type") return showError(handleError("Please select term"));

    setIsSubmitting(true);
    try {
      let inputData = employeesCsvAttachmentInput({
        file,
      });
      if (term === "add") {
        await addCsvFileMutation(inputData);
        showSuccess();
        // window.location.reload();
      } else if (term === "replace") {
        await replaceCsvFileMutation(inputData);
        showSuccess();
        // window.location.reload();
      } else if (term === "update") {
        await updateCsvFileMutation(inputData);
        showSuccess();
        // window.location.reload();
      } else if (term === "delete") {
        await deleteCsvFileMutation(inputData);
        showSuccess();
        // window.location.reload();
      } else {
        setIsSubmitting(false);
        return showError(handleError("Please enter valid term"));
      }
      setIsSubmitting(false);
    } catch (err: any) {
      setIsSubmitting(false);
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  let actionTypeOptions = [
    {
      label: "Add Employees",
      value: "add",
    },
    {
      label: "Replace Employees",
      value: "replace",
    },
    {
      label: "Update Employees",
      value: "update",
    },
    {
      label: "Delete Employees",
      value: "delete",
    },
  ];

  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="employee">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            <Nav variant="pills" className="nav nav-tabs tab-body-header rounded invoice-set">
              {tabsData?.map((tab, index: number) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={tab.key}>{tab.tabName}</Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <Tab.Content>
              {tabsData?.map((tab) => {
                return (
                  <Tab.Pane key={tab.key} eventKey={tab.key}>
                    <div className="row g-3 pt-3">
                      <div className="col-md-6 col-lg-6 col-xl-12">
                        <div className="card">
                          <div className="card-body">
                            <div className=" d-flex align-content-center-center justify-content-between flex-wrap">
                              <h5 className="card-title text-primary">
                                <strong>Employees Data</strong>
                              </h5>
                              <div style={{ minWidth: "15rem" }}>
                                <SimpleSelect
                                  onChange={(value: string) => setTerm(value)}
                                  label={"Action Type"}
                                  value={term}
                                  options={actionTypeOptions}
                                />
                              </div>
                              <a href="/empty_employee_data.csv" download="empty_employee_data.csv">
                                <Button className="lift" content="Download Employee Template" onClick={() => {}} />
                              </a>
                            </div>
                            <Attachment onUploadFile={handleUpload} isSubmitting={isSubmitting} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};

export default DataImportingSettings;
