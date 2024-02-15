import PageHeader from 'components/Common/PageHeader';
import Button from 'components/UI/Button';
import FormInputs from 'components/UI/FormInputs/FormInputs';
import Loading from 'components/UI/Loading';
import { PAGES } from 'constants/pages';
import { useUI } from 'contexts/UIContext';
import useApp from 'hooks/useApp';
import { ProjectKeys, ProjectNumKeys, ProjectStrKeys, ProjectRequiredKeys } from 'models/Project';
import { useEffect, useState } from 'react';
import { inputsValidationType } from 'types/Error';
import { IField } from 'types/Forms/formFields';
import { Project } from 'types/Project';
import { handleServerError, validateInputs } from 'utils/HandlingServerError';
import { projectInput, useCreateProject } from 'api/Projects/createProject';
import { projectUpdateInput, useUpdateProject } from 'api/Projects/updateProject';
import { useDeleteProject } from 'api/Projects/deleteProject';
import { useProjectDetailsQuery } from 'api/Projects/getProjectDetails';
import DeleteModal from 'components/Modals/DeleteModal';
import { getFormattedTodayDate } from 'utils/DateUtils';
import { useCustomersQuery } from 'api/Customers/getAllCustomers';
import { useEmployeesQuery } from 'api/Employees/getAllEmployees';
import { Customer } from 'types/Customer';
import { getOptions } from 'utils/GetOptions';
import { Employee } from 'types/Employee';

interface Props {
    id?: string;
};

const ProjectFormPage = ({ id }: Props) => {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
    // -----
    const [modelData, setModelData] = useState<Project>({} as Project);
    const [isModal, setIsModal] = useState<boolean>(false);
    // -----
    const { mutateAsync: createMutation } = useCreateProject();
    const { mutateAsync: updateMutation } = useUpdateProject();
    const { mutateAsync: deleteMutation } = useDeleteProject();
    // -----
    const { showError, showSuccess } = useUI();
    const { push } = useApp();

    const {
        data: projectData,
        error: projectError,
        isLoading: projectIsLoading
    } = useProjectDetailsQuery({ id });

    const {
        data: customersData,
        error: customersError,
        isLoading: customersIsLoading
    } = useCustomersQuery({});

    const {
        data: employeesData,
        error: employeesError,
        isLoading: employeesIsLoading
    } = useEmployeesQuery({});

    // !Check if this is CREATE OR EDIT Modal
    useEffect(() => {
        if (!initialized) {
            if (id) setIsEdit(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // !Assuming this is CREATE Modal
    useEffect(() => {
        if (!isEdit) {
            setInitialized(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // !Assuming this is EDIT Modal
    useEffect(() => {
        if (!initialized && projectData) {
            let project: Project = projectData?.project?.data!
            setModelData({ ...project })
            setInitialized(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectData]);

    if ((id && projectIsLoading) || (!id && customersIsLoading) || (!id && employeesIsLoading)) return <Loading />;
    if ((id && projectError) || (!id && customersError) || (!id && employeesError)) return null;

    let customers: Customer[] = customersData?.customers?.data || [];
    let employees: Employee[] = employeesData?.employees?.data || [];

    let customersOptions = getOptions(customers, "Select Customer");
    let employeesOptions = getOptions(employees, "Select");


    const handleModelData = (key: string, value: any) => {
        setModelData({
            ...modelData,
            [key]: value,
        })
    };

    const handleReset = () => {
        // setModelData({
        //     ...modelData,
        //     company_name: '',
        //     vat_on: 0,
        //     name: "",
        //     phone_number: "",
        //     email: "",
        //     country: "",
        //     city: "",
        //     area: "",
        //     street: "",
        //     building_number: "",
        //     postal_code: null,
        // })
    };

    const formFields: IField[] = [
        {
            label: "Project Name",
            type: "text",
            width: "col-md-4",
            key: ProjectKeys.NAME,
            value: modelData?.name,
            onChange: (value: string) => handleModelData(ProjectKeys.NAME, value),
            placeholder: "Enter Project Name",
            required: true,
        },
        {
            label: "Customer Name",
            type: "select",
            width: "col-md-4",
            key: ProjectKeys.CUSTOMER,
            value: modelData?.customer?.name!,
            onChange: (value: string) => handleModelData(ProjectKeys.CUSTOMER, value),
            options: customersOptions,
            placeholder: "Select Customer",
            required: !isEdit ? true : false,
            disabled: isEdit ? true : false
        },
        {
            label: "Project Manager",
            type: "select",
            width: "col-md-4",
            key: ProjectKeys.MANAGER,
            value: modelData?.manager?.name,
            onChange: (value: string) => handleModelData(ProjectKeys.MANAGER, value),
            options: employeesOptions,
            placeholder: "Select Manager",
        },

        {
            label: "Assign Assistants",
            type: "multiSelect",
            width: "col-md-6 mt-0 ",
            placeholder: "Assign Assistants",
            key: ProjectKeys.ASSISTANTS,
            value: modelData.assistants! || [],
            onChange: (value: string) =>
                handleModelData(ProjectKeys.ASSISTANTS, value),
            options: employeesOptions,
            required: false,
        },
        {
            label: "LATITUDE",
            width: "col-md-3",
            type: "text",
            key: ProjectKeys.LATITUDE,
            value: modelData?.latitude,
            onChange: (value: string) => handleModelData(ProjectKeys.LATITUDE, value),
            placeholder: ""
        },
        {
            label: "LONGITUDE",
            width: "col-md-3",
            type: "text",
            key: ProjectKeys.LONGITUDE,
            value: modelData?.longitude,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.LONGITUDE, value),
            placeholder: ""
        },
        {
            type: "textarea",
            label: "Project Description",
            key: ProjectKeys.DESCRIPTION,
            value: modelData?.description,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.DESCRIPTION, value),
            placeholder: "Enter Description"
        },
        {
            label: "Bid Value",
            width: "col-md-4",
            type: "number",
            key: ProjectKeys.BID_VALUE,
            value: modelData?.bid_value,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.BID_VALUE, value),
            placeholder: "0",
            required: true,
        },
        {
            label: "Total Budget",
            width: "col-md-4",
            type: "number",
            key: ProjectKeys.TOTAL_BUDGET,
            value: modelData?.total_budget,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.TOTAL_BUDGET, value),
            placeholder: "0",
            required: true,
        },
        {
            label: "PO Budget",
            width: "col-md-4",
            type: "number",
            info: `${modelData.po_expenses ? modelData.po_expenses : 0}`,
            key: ProjectKeys.PO_BUDGET,
            value: modelData?.po_budget,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.PO_BUDGET, value),
            placeholder: "0",
            required: true,
        },
        {
            label: "PC Budget",
            width: "col-md-4",
            type: "number",
            info: `${modelData.pc_expenses ? modelData.pc_expenses : 0}`,
            key: ProjectKeys.PC_BUDGET,
            value: modelData?.pc_budget,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.PC_BUDGET, value),
            placeholder: "0",
            required: true,
        },
        {
            label: "Staff Budget",
            width: "col-md-4",
            type: "number",
            info: `${modelData.staff_expenses ? modelData.staff_expenses : 0
                }`,
            key: ProjectKeys.STAFF_BUDGET,
            value: modelData?.staff_budget,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.STAFF_BUDGET, value),
            placeholder: "0",
            required: true,
        },
        {
            label: "Subcontractor Budget",
            width: "col-md-4",
            type: "number",
            info: `${modelData.subcontractor_expenses ? modelData.subcontractor_expenses : 0}`,
            key: ProjectKeys.SUBCONTRACTOR_BUDGET,
            value: modelData?.subcontractor_budget,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.SUBCONTRACTOR_BUDGET, value),
            placeholder: "0",
            required: true,
        },
        {
            label: "Contract Number",
            width: "col-md-4",
            type: "text",
            key: ProjectKeys.CONTRACT_NUMBER,
            value: modelData?.contract_number,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.CONTRACT_NUMBER, value),
            placeholder: "Contract Number",
            required: true,
        },
        {
            label: "Contract Date",
            width: "col-md-4",
            type: "date",
            default: `${getFormattedTodayDate()}`,
            key: ProjectKeys.CONTRACT_DATE,
            value: modelData?.contract_date,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.CONTRACT_DATE, value),
            placeholder: "Enter Contract Date",
            required: true,
        },
        {
            label: "Due Date",
            width: "col-md-4",
            type: "date",
            default: `${getFormattedTodayDate()}`,
            key: ProjectKeys.DELIVERY_DATE,
            value: modelData?.delivery_date,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.DELIVERY_DATE, value),
            placeholder: "Enter Delivery Date",
            required: true,
        },
        {
            label: "Sites Count",
            width: "col-md-3",
            type: "number",
            key: ProjectKeys.SITES_COUNT,
            value: modelData?.sites_count,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.SITES_COUNT, value),
            placeholder: "0"
        },
        {
            label: "Buildings Count",
            width: "col-md-3",
            type: "number",
            key: ProjectKeys.BUILDINGS_COUNT,
            value: modelData?.buildings_count,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.BUILDINGS_COUNT, value),
            placeholder: "0"
        },
        {
            label: "Floors Count",
            width: "col-md-3",
            type: "number",
            key: ProjectKeys.FLOORS_COUNT,
            value: modelData?.floors_count,
            onChange: (value: string) =>
                handleModelData(ProjectKeys.FLOORS_COUNT, value),
            placeholder: "0"
        },
        {
            label: "Project thumbnail",
            width: "col-md-3",
            type: "file",
            key: ProjectKeys.THUMBNAIL,
            value: modelData?.thumbnail,
            onChange: (e: any) => {
                let thumbnail: File = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(thumbnail);
                reader.onload = (url) => {
                    handleModelData(ProjectKeys.THUMBNAIL, thumbnail);
                };
            },
            placeholder: "Enter Thumbnail"
        },
    ];

    // MAIN ACTIONS
    const handleCreate = async () => {
        let numbersToValidate = ProjectNumKeys;
        let stringsToValidate = ProjectStrKeys;
        let requiredToValidate = ProjectRequiredKeys;

        const validationData: inputsValidationType = {
            requiredToValidate,
            numbersToValidate,
            stringsToValidate,
            inputs: modelData
        };

        let errors = validateInputs(validationData)
        if (errors.length > 0) return showError(errors);

        try {
            let createInput = projectInput(modelData);
            await createMutation(createInput);
            push('/' + PAGES.PROJECTS)
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    const handleEdit = async () => {
        let numbersToValidate = ProjectNumKeys;
        let stringsToValidate = ProjectStrKeys;
        let requiredToValidate: string[] = [];

        const validationData: inputsValidationType = {
            requiredToValidate,
            numbersToValidate,
            stringsToValidate,
            inputs: modelData
        };

        let errors = validateInputs(validationData)
        if (errors.length > 0) return showError(errors);

        try {
            let createInput = projectUpdateInput(modelData);
            await updateMutation({
                id: modelData.id,
                data: createInput,
            });
            showSuccess();
            push('/' + PAGES.PROJECTS)
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMutation(modelData.id!);
            showSuccess();
            push('/' + PAGES.PROJECTS)
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    if (!initialized) return <></>
    return (
        <div className="container-xxl">
            <PageHeader
                headerTitle={""}
                isBtnShow={false}
                btnText={""}
                isBackBtn={true}
            />
            <div className="row g-3 pb-3 pb-xl-0">
                <div>
                    <FormInputs formFields={formFields} grid={true} block={true} />
                </div>
                <div className="col-sm d-flex align-items-center justify-content-center gap-2">
                    {isEdit ? (<>
                        <Button className='lift' content='Cancel' onClick={() => push('/' + PAGES.PROJECTS)} variant='secondary' />
                    </>) : (<>
                        <Button className='lift' content='Reset' onClick={handleReset} variant='secondary' />
                    </>)}
                    {isEdit ? (<>
                        <Button className='lift' content='Edit' onClick={handleEdit} />
                    </>
                    ) : (<>
                        <Button className='lift' content='Create' onClick={handleCreate} />
                    </>
                    )}
                    <Button className='lift' content='details' onClick={() => push('/' + PAGES.PROJECT_INFO + '/' + modelData.id)} />
                </div>
            </div>
            <DeleteModal
                show={isModal}
                onClose={() => setIsModal(false)}
                onDelete={handleDelete}
                message={`Are you sure you want to delete ${modelData.name}?`}
                modalHeader={`Delete ${modelData.name}`}
            />
        </div>
    )
}

export default ProjectFormPage
