import { useSaveEmployeeRequestToArchive } from 'api/Documents/EmployeeRequests/archiveEmployeeRequest';
import { employeeRequestInput, useCreateEmployeeRequest } from 'api/Documents/EmployeeRequests/createEmployeeRequest';
import { employeeEditInput, useEditEmployeeRequest } from 'api/Documents/EmployeeRequests/editEmployeeRequest';
import { useEmployeeRequestDetailsQuery } from 'api/Documents/EmployeeRequests/getEmployeeRequestDetails';
import PageHeader from 'components/Common/PageHeader';
import DocumentPreviewModal from 'components/Modals/DocumentPreviewModal';
import Button from 'components/UI/Button';
import FormInputs from 'components/UI/FormInputs/FormInputs';
import Loading from 'components/UI/Loading';
import { PAGES } from 'constants/pages';
import { useUI } from 'contexts/UIContext';
import { STATUS } from 'enums/enums';
import useApp from 'hooks/useApp';
import { EmployeeRequestKeys, EmployeeRequestNumKeys, EmployeeRequestRequiredKeys, EmployeeRequestStrKeys } from 'models/documents/EmployeeRequest';
import { useEffect, useState } from 'react';
import { EmployeeRequest } from 'types/Employee_request';
import { inputsValidationType } from 'types/Error';
import { IField } from 'types/Forms/formFields';
import { allowEditActionBtn } from 'utils/ActionsGuards';
import { getFormattedTodayDate } from 'utils/DateUtils';
import { handleServerError, validateInputs } from 'utils/HandlingServerError';
interface Props {
    id?: string;
};

const EmployeeRequestFormPage = ({ id }: Props) => {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
    // -----
    const [modelData, setModelData] = useState<EmployeeRequest>({} as EmployeeRequest);
    const [modalHeader, setModalHeader] = useState<string>("");
    const [isPreviewModal, setIsPreviewModal] = useState<boolean>(false);
    // -----
    const { mutateAsync: createMutation } = useCreateEmployeeRequest();
    const { mutateAsync: editMutation } = useEditEmployeeRequest();
    const { mutateAsync: archiveMutation } = useSaveEmployeeRequestToArchive();
    // -----
    const { showError, showSuccess } = useUI();
    const { push } = useApp();

    const {
        data: documentData,
        error: documentError,
        isLoading: documentIsLoading
    } = useEmployeeRequestDetailsQuery({ id });

    useEffect(() => {
        if (!initialized) {
            if (id) setIsEdit(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (!initialized && documentData) {
            const initialModelData: any = {
                ...documentData?.employeeRequestDetails?.data!,
            };
            setModelData({ ...initialModelData })
            setInitialized(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentData])

    if ((id && documentIsLoading)) return <Loading />;
    if ((id && documentError)) return null;

    const handleModelData = (key: string, value: any) => {
        setModelData({
            ...modelData,
            [key]: value,
        })
    };

    // Modals Handling
    const handleOpenPreviewModal = () => {
        setModalHeader("Preview Employee Request")
        setIsPreviewModal(true);
    };

    const handleReset = () => {
        setModelData({
            ...modelData,
            subject: '',
            date: '',
            description: `With reference to the above subject,`,
        })
    };

    const formFields: IField[] = [
        {
            label: "Subject",
            type: "text",
            width: "col-md-6",
            key: EmployeeRequestKeys.SUBJECT,
            value: modelData?.subject,
            onChange: (value: string | any) =>
                handleModelData(EmployeeRequestKeys.SUBJECT, value),
            placeholder: "Enter Request Subject",
            required: true,
        },
        {
            label: "Date",
            type: "date",
            width: "col-md-6",
            key: EmployeeRequestKeys.DATE,
            value: modelData?.date,
            onChange: (value: string | any) =>
                handleModelData(EmployeeRequestKeys.DATE, value),
            placeholder: "",
            required: true,
            default: `${getFormattedTodayDate()}`
        },
        {
            label: "Description",
            type: "textarea",
            width: "col-md-12",
            key: EmployeeRequestKeys.DESCRIPTION,
            value: modelData?.description,
            onChange: (value: string | any) =>
                handleModelData(EmployeeRequestKeys.DESCRIPTION, value),
            placeholder: "Enter Description",
            default: `With reference to the above subject,`
        },
    ];

    // MAIN FUNCTIONS
    const handleCreateRequest = async () => {
        if (!modelData.description) modelData.description = `With reference to the above subject,`
        if (!modelData.date) modelData.date = `${getFormattedTodayDate()}`;

        let numbersToValidate = EmployeeRequestNumKeys;
        let stringsToValidate = EmployeeRequestStrKeys;
        let requiredToValidate = EmployeeRequestRequiredKeys;

        const validationData: inputsValidationType = {
            requiredToValidate,
            numbersToValidate,
            stringsToValidate,
            inputs: modelData
        }

        let errors = validateInputs(validationData);
        if (errors.length > 0) return showError(errors);

        try {
            let createInput = employeeRequestInput(modelData);
            await createMutation({ ...createInput });
            push('/' + PAGES.EMPLOYEE_REQUESTS)
            showSuccess();
        } catch (err: any) {
            console.log(err.response?.data?.msg!)
            showError(handleServerError(err.response));
        }
    };

    const handleEditRequest = async (toArchive = false) => {
        if (toArchive === false) {
            let numbersToValidate = EmployeeRequestNumKeys;
            let stringsToValidate = EmployeeRequestStrKeys;
            let requiredToValidate = EmployeeRequestRequiredKeys;

            const validationData: inputsValidationType = {
                requiredToValidate,
                numbersToValidate,
                stringsToValidate,
                inputs: modelData
            };

            let errors = validateInputs(validationData);
            if (errors.length > 0) return showError(errors);
        }

        try {
            let createInput = employeeEditInput({ ...modelData, is_archived: toArchive === true ? true : false });
            await editMutation({ data: createInput, id });
            push("/" + PAGES.EMPLOYEE_REQUESTS);
            showSuccess();
        } catch (err: any) {
            console.log(err.response?.data?.msg!);
            showError(handleServerError(err.response));
        }
    };

    const handleSaveRequestToArchive = async () => {
        if (!modelData.description) {
            modelData.description = `With reference to the above subject,`;
        }
        if (!modelData.date) {
            modelData.date = `${getFormattedTodayDate()}`;
        }

        try {
            let createInput = employeeRequestInput({ ...modelData });
            await archiveMutation(createInput);
            push("/" + PAGES.EMPLOYEE_REQUESTS);
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    const handleEdit = () => {
        if (modelData.status === STATUS.ARCHIVED) {
            handleEditRequest(true)
        } else {
            handleEditRequest(false)
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
                        <Button className='lift' content='Cancel' onClick={() => push('/' + PAGES.SITE_REQUESTS)} variant='secondary' />
                    </>) : (<>
                        <Button className='lift' content='Reset' onClick={handleReset} variant='secondary' />
                    </>)}
                    {isEdit ? (<>
                        {allowEditActionBtn(documentData?.employeeRequestDetails?.data?.user?.id!, documentData?.employeeRequestDetails?.data!) && (
                            <Button className='lift' content='Edit' onClick={handleEdit} />
                        )}
                    </>
                    ) : (<>
                        <Button className='lift' content='Create' onClick={handleCreateRequest} />
                    </>
                    )
                    }
                    <Button className='lift' content='Preview' onClick={handleOpenPreviewModal} />
                    {isEdit ? (
                        <>{modelData.status === STATUS.ARCHIVED &&
                            <Button className='lift' content='Activate' onClick={() => handleEditRequest(false)} />
                        }</>
                    ) :
                        (<>
                            <Button className='lift' content='Save To Archive' onClick={handleSaveRequestToArchive} />
                        </>)}
                </div>
            </div>
            <DocumentPreviewModal
                onClose={() => setIsPreviewModal(false)}
                isModal={isPreviewModal}
                modalHeader={modalHeader}
                modelData={modelData}
                documentType={'employee'}
            />
        </div>
    )
}

export default EmployeeRequestFormPage
