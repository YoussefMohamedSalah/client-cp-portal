import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

interface Props {
    defaultConditions: string[];
    onChange: (updatedConditions: string[]) => void;
};

const DefaultConditionsCard: React.FC<Props> = ({ defaultConditions, onChange }) => {
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [conditions, setConditions] = useState<string[]>([''])

    useEffect(() => {
        if (!isInitialized) {
            setConditions(defaultConditions);
            setIsInitialized(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isInitialized) {
            onChange(conditions)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    const handleConditionChange = (index: number, value: string) => {
        setConditions((prevConditions) => {
            const updatedConditions = [...prevConditions];
            updatedConditions[index] = value;
            return updatedConditions;
        });
    };

    return (
        <>
            <Accordion defaultActiveKey={null} className="py-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        Default Conditions
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className=" d-flex flex-column">
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
                                            rows={1}
                                            placeholder="condition"
                                            value={condition}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                                handleConditionChange(index, e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default DefaultConditionsCard;