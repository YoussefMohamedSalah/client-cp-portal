import PageHeader from "components/Common/PageHeader";
import { useState } from "react";
import Loading from "components/UI/Loading";
import useApp from "hooks/useApp";
import { useProjectDetailsQuery } from "api/Projects/getProjectDetails";
import { Project } from "types/Project";
import { DailyReportKeys } from "models/DailyReport";
import { DailyReport } from "types/Daily_report";
import FormInputs from "components/UI/FormInputs/FormInputs";
import { IField } from "types/Forms/formFields";
import { FileType } from "types/FileType";
import OldFiles from "components/Common/OldFiles";
import NewFiles from "components/Common/NewFiles";
import DailyReportDragAnDropContainer from "components/DailyReport/DailyReportDragAnDropContainer";

interface Props {
  id?: string;
}

const DailyReportFormPage = ({ id }: Props) => {
  const [preview, setPreview] = useState<string>("");
  const [modelData, setModelData] = useState<DailyReport>({} as DailyReport);

  // ------
  const [files, setFiles] = useState<File[]>([]);
  const [filesNameSet, setFilesNameSet] = useState<string[]>([]);
  const [oldFiles, setOldFiles] = useState<FileType[]>([]);
  const [removedFilesNameSet, setRemovedFilesNameSet] = useState<string[]>([]);
  // ------
  const { push } = useApp();

  const { data: projectData, error: projectError, isLoading: projectIsLoading } = useProjectDetailsQuery({ id });
  if (id && projectIsLoading) return <Loading />;
  if (id && projectError) return null;
  let project: Project = projectData?.project.data! || ({} as Project);

  let managers = project?.managers! || [];
  let managersOptions = managers?.map((manager) => {
    return {
      label: manager?.name,
      value: manager.id,
    };
  });

  const handleModelData = (key: string, value: any) => {
    if (key === DailyReportKeys.FILES) {
      setFilesNameSet([...filesNameSet, value.name]);
      let newFilesArray: File[] = [...files, value];
      value = newFilesArray;
      setFiles(newFilesArray);
    }

    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  // Modal Inputs Data
  const formFields: IField[] = [
    {
      label: "Date",
      type: "date",
      width: "col-md-4",
      key: DailyReportKeys.DATE,
      value: modelData?.date,
      onChange: (value: any) => handleModelData(DailyReportKeys.DATE, value),
      placeholder: "",
      required: true,
    },
    {
      label: "Working area",
      type: "text",
      width: "col-md-4",
      key: DailyReportKeys.WORKING_AREA,
      value: modelData?.working_area,
      onChange: (value: string) => handleModelData(DailyReportKeys.WORKING_AREA, value),
      placeholder: "Enter Working area",
      required: true,
    },
    {
      label: "Today's working spot",
      type: "text",
      width: "col-md-4",
      key: DailyReportKeys.TODAYS_WORKING_SPOT,
      value: modelData?.today_working_spot,
      onChange: (value: string) => handleModelData(DailyReportKeys.TODAYS_WORKING_SPOT, value),
      placeholder: "Enter Today's working spot",
      required: true,
    },
    {
      label: "Supervisor",
      type: "text",
      width: "col-md-4",
      key: DailyReportKeys.SUPERVISOR_NAME,
      value: modelData?.supervisor,
      onChange: (value: string) => handleModelData(DailyReportKeys.SUPERVISOR_NAME, value),
      placeholder: "Enter Supervisor",
      required: true,
    },

    {
      label: "Engineer name",
      type: "text",
      width: "col-md-4",
      key: DailyReportKeys.ENGINEER_NAME,
      value: modelData?.supervisor,
      onChange: (value: string) => handleModelData(DailyReportKeys.ENGINEER_NAME, value),
      placeholder: "Enter Engineer name",
      required: true,
    },
    {
      label: "Total employees count",
      type: "number",
      width: "col-md-4",
      key: DailyReportKeys.TOTAL_EMPLOYEES,
      value: modelData?.supervisor,
      onChange: (value: string) => handleModelData(DailyReportKeys.TOTAL_EMPLOYEES, value),
      placeholder: "Enter Total employees count",
      required: true,
    },
    // {
    // 	label: "Delivery Date",
    // 	type: "date",
    // 	width: "col-md-4",
    // 	key: DailyReportKeys.DELIVERY_DATE,
    // 	value: modelData?.delivery_date,
    // 	onChange: (value: any) => handleModelData(DailyReportKeys.DELIVERY_DATE, value),
    // 	placeholder: "",
    // 	required: true,
    // },
    {
      label: "Notes",
      type: "textarea",
      width: "col-md-12",
      key: DailyReportKeys.NOTES,
      value: modelData?.notes,
      onChange: (value: string) => handleModelData(DailyReportKeys.NOTES, value),
      placeholder: "Enter Notes",
      default: ``,
      required: true,
    },
    {
      label: "Files To Upload",
      type: "file",
      width: "col-md-12",
      key: DailyReportKeys.FILES,
      value: modelData?.files,
      onChange: (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          let file: File = e.target?.files[0]!;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (url) => {
            handleModelData(DailyReportKeys.FILES, file);
          };
        }
      },
    },
  ];

  const handleRemoveOldFile = (file: FileType) => {
    if (file.state === undefined || file.state === false) {
      const selectedFile: FileType | undefined = oldFiles.find(
        (selectedFileToAdd: FileType) => selectedFileToAdd.name === file.name,
      );
      if (selectedFile) {
        const updatedFiles = oldFiles.map((oldFile: FileType) =>
          oldFile.name === file.name ? { ...oldFile, state: true } : oldFile,
        );
        setOldFiles(updatedFiles);
        setRemovedFilesNameSet((prevSet) => prevSet.filter((selectedFile) => selectedFile !== file.name));
      }
    } else {
      const filteredFilesArr: FileType[] = oldFiles.filter((selectedFile: FileType) => selectedFile.name !== file.name);
      setOldFiles([...filteredFilesArr, { ...file, state: false }]);
      setRemovedFilesNameSet((prevSet) => (prevSet.includes(file.name) ? prevSet : [...prevSet, file.name]));
    }
  };

  const handleRemoveNewFile = (file: File) => {
    setFilesNameSet(filesNameSet.filter((selectedFile) => selectedFile !== file.name));
    let newFilesArray: File[] = files.filter((selectedFile: File) => selectedFile.name !== file.name);
    setFiles(newFilesArray);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Daily Reports"}
          isBtnShow={false}
          btnText={"Create Daily Report"}
          onClickBtn={() => { }}
        />
        {/* table data */}
        <div className="row clearfix g-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <FormInputs formFields={formFields} grid={true} block={true} />
                <div className="d-flex flex-row justify-content-start align-items-start overflow-x-scroll pb-1">
                  <OldFiles files={oldFiles} onRemove={handleRemoveOldFile} />
                  <NewFiles files={files} onRemove={handleRemoveNewFile} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DailyReportDragAnDropContainer project={project} />
      </div>
    </>
  );
};

export default DailyReportFormPage;
