import { useEffect, useState } from "react";

import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
// import { useUpdateRequestDefaultConditions } from "api/requests/updateDefaultConditions";

interface Props {
    tabKey: string;
    defaultConditions: string[];
};

const SettingsDefaultConditionsTab = ({ tabKey, defaultConditions }: Props) => {
    const [conditions, setConditions] = useState<string[]>([""]);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        if (!isInitialized) {
            setConditions([...defaultConditions])
            setIsInitialized(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultConditions])

    // const { mutateAsync: updateMutation } = useUpdateRequestDefaultConditions();
    const { showError, showSuccess } = useUI();

    // CONDITIONS SECTION
    const handleConditionChange = (index: number, value: string) => {
        setConditions((prevConditions) => {
            const updatedConditions = [...prevConditions];
            updatedConditions[index] = value;
            return updatedConditions;
        });
    };

    const handleAddCondition = () => {
        setConditions((prevConditions) => [...prevConditions, ""]);
    };

    const handleRemoveCondition = (index: number) => {
        setConditions((prevConditions) => {
            const updatedConditions = [...prevConditions];
            updatedConditions.splice(index, 1);
            return updatedConditions;
        });
    };

    const handleUpdateDefaultConditions = async () => {
        try {
            let stringConditions = JSON.stringify(conditions);
            // await updateMutation({ type: tabKey, conditions: stringConditions });
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    }

    if (!isInitialized) return <></>
    return (
        <div className=" d-flex flex-column pt-2">
            <div className="card-header py-3 d-flex justify-content-between border-top border-2">
                <div className="w-100  p-2 mb-1 ">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <button
                            type="button"
                            className="btn btn-success text-white mb-2"
                            onClick={() => handleAddCondition()}
                        >
                            Conditions
                            <i className="icofont-plus-circle fs-6 ps-2" />
                        </button>
                    </div>
                    {conditions.map((condition, index) => (
                        <div
                            className="row justify-content-center align-items-center row g-3 mb-3"
                            key={index}
                        >
                            <div className="col-lg-11 d-flex justify-content-start align-items-center">
                                <span className="badge bg-success p-2 m-2">{index + 1}</span>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows={2}
                                    placeholder="condition"
                                    value={condition}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        handleConditionChange(index, e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-lg-1 col-6 p-lg-0 d-flex justify-content-evenly align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveCondition(index)}
                                >
                                    <i className="fa fa-trash  text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="align-self-center mt-1">
                <button
                    type="button"
                    className="btn btn-sm btn-primary text-end h-75 m-1 "
                    data-bs-toggle="modal"
                    data-bs-target="#dremovetask"
                    onClick={handleUpdateDefaultConditions}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default SettingsDefaultConditionsTab
