import DatePickerInput from "components/UI/FormInputs/DatePickerInput";
import OptionsSelectOne from "components/UI/FormInputs/OptionsSelectOne";
import TextInput from "components/UI/FormInputs/TextInput";
import { useEffect, useState } from "react";
import { Installments } from "types/Installments";

interface Props {
  onChange: (term: string, value: any) => void;
  total: number;
  initialInstallments: Installments[];
  initialPaymentType: string;
}

const PoInstallmentsSection = ({ total, onChange, initialInstallments, initialPaymentType }: Props) => {
  const [paymentType, setPaymentType] = useState<string>(initialPaymentType);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [secondInitialized, setSecondInitialized] = useState<boolean>(false);
  const [installments, setInstallments] = useState<Installments[]>([...initialInstallments]);
  const [initialTotal, setInitialTotal] = useState<number>(0);

  let paymentTypeOptions = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Credit",
      value: "credit",
    },
  ];

  useEffect(
    () => {
      if (!initialized) {
        setInitialTotal(Number(total));
        setPaymentType(initialPaymentType);
        setInstallments(initialInstallments);
        setInitialized(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialized, initialInstallments, total],
  );

  useEffect(
    () => {
      // Reset only percentage and value properties when total changes
      if (initialized && !secondInitialized) setSecondInitialized(true);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialized],
  );

  useEffect(
    () => {
      // Reset only percentage and value properties when total changes
      if (initialized && secondInitialized && Number(total) !== Number(initialTotal)) {
        setInstallments((prevInstallments) => {
          return prevInstallments.map((installment) => ({
            ...installment,
            percentage: 0,
            value: 0,
          }));
        });
        setPaymentType(initialPaymentType);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [total],
  );

  useEffect(() => {
    onChange("payment_type", paymentType);
  }, [paymentType, onChange]);

  useEffect(() => {
    onChange("installments", installments);
  }, [installments, onChange]);

  // PaymentType
  const handlePaymentTypeChange = (value: any) => {
    setPaymentType(value);
  };

  const handleAddInstallment = () => {
    setInstallments((prevItems) => [...prevItems, { name: "", percentage: 0, value: 0, details: "", date: "" }]);
  };

  const handleRemoveInstallment = (index: number) => {
    setInstallments((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handlePercentageChange = (value: string, index: number) => {
    const updatedItems = [...installments];
    let newPercentage = parseFloat(value);
    if (isNaN(newPercentage)) newPercentage = 0;

    // Calculate the sum of all other percentages except the current one
    const otherPercentagesSum = updatedItems
      .filter((_, i) => i !== index)
      .reduce((acc, installment) => acc + installment.percentage, 0);

    // Calculate the available percentage for the current installment
    const availablePercentage = 100 - otherPercentagesSum;

    if (newPercentage > availablePercentage) {
      newPercentage = availablePercentage;
    }

    // Update the current installment's percentage and value
    updatedItems[index] = {
      ...updatedItems[index],
      percentage: newPercentage,
      value: parseFloat(((newPercentage / 100) * total).toFixed(2)),
    };

    // Update the state with the updated installments
    setInstallments((prevItems) => {
      const returnedItem = [...prevItems];
      returnedItem[index] = { ...updatedItems[index] };
      return returnedItem;
    });
  };

  const handleAmountToPayChange = (value: any, index: number) => {
    const updatedItems = [...installments];
    let newAmountToPay = parseFloat(value);
    if (isNaN(newAmountToPay)) newAmountToPay = 0;

    // Calculate the sum of all other values except the current one
    const otherValuesSum = updatedItems
      .filter((_, i) => i !== index)
      .reduce((acc, installment) => acc + installment.value, 0);

    // Calculate the available value for the current installment
    const availableValue = total - otherValuesSum;

    if (newAmountToPay > availableValue) {
      newAmountToPay = availableValue;
    }

    // Update the current installment's value and percentage
    updatedItems[index] = {
      ...updatedItems[index],
      value: newAmountToPay,
      percentage: parseFloat(((newAmountToPay / total) * 100).toFixed(2)),
    };

    // Update the state with the updated installments
    setInstallments((prevItems) => {
      const returnedItem = [...prevItems];
      returnedItem[index] = { ...updatedItems[index] };
      return returnedItem;
    });
  };
  console.log({ installments });

  const handleInstallmentChange = (index: number, prop: keyof Installments, value: string | number) => {
    if (prop === "percentage" || prop === "value") return;
    const updatedItems = [...installments];
    // Update the current installment's value and percentage
    updatedItems[index] = {
      ...updatedItems[index],
      [prop]: value,
    };

    // Update the state with the updated installments
    setInstallments((prevItems) => {
      const returnedItem = [...prevItems];
      returnedItem[index] = { ...updatedItems[index] };
      return returnedItem;
    });
  };

  if (!initialized) return <></>;
  return (
    <div className="card mt-2">
      <div className="card-header">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <button
              type="button"
              style={{ padding: "8px 12px", marginTop: "6px" }}
              className="btn btn-success text-white mb-2"
              onClick={() => handleAddInstallment()}
            >
              Installments
              <i className="icofont-plus-circle fs-6 ps-2" />
            </button>
            <OptionsSelectOne
              onChange={(value: string) => handlePaymentTypeChange(value)}
              value={paymentType}
              label={"Payment type"}
              // required={true}
              options={paymentTypeOptions}
            />
          </div>
        </div>
      </div>
      <hr className="mt-0 mb-3" />
      <div className="card-body">
        {installments.map((installment, index) => (
          <div key={index} className="row justify-content-center align-items-center row g-3 mb-3">
            <div className="col-lg-11">
              <div className="container">
                <div className="row justify-content-center align-items-center row">
                  <div className="col-lg-2 p-lg-0 pe-lg-1 pb-2">
                    <div className="d-flex align-items-center">
                      <span className="badge bg-success p-2 m-2">{index + 1}</span>
                      <div className="w-100">
                        <TextInput
                          type="text"
                          label="NAME"
                          value={installment.name}
                          onChange={(value: string) => handleInstallmentChange(index, "name", value)}
                        />
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-lg-2 col-6 p-lg-0 pe-lg-1 pb-2">
                    <TextInput
                      type="text"
                      label="PERCENTAGE"
                      value={installment.percentage}
                      onChange={(value: string) => handlePercentageChange(value, index)}
                    />
                  </div>
                  <div className="col-lg-2 col-6 p-lg-0 pe-lg-1 pb-2">
                    <TextInput
                      type="number"
                      label="VALUE"
                      value={installment.value}
                      onChange={(value: string) => handleAmountToPayChange(value, index)}
                    />
                  </div>
                  <div className="col-lg-4 col-6 p-lg-0 pe-lg-1 pb-2">
                    <TextInput
                      type="text"
                      label="PAYMENT DETAILS"
                      value={installment.details}
                      onChange={(value: string) => handleInstallmentChange(index, "details", value)}
                    />
                  </div>
                  <div className="col-lg-2 col-6 p-lg-0 d-flex justify-content-center align-items-center flex-column">
                    <div className="w-100">
                      <DatePickerInput
                        placeholder="DATE"
                        value={installment.date}
                        onChange={(value: string) => handleInstallmentChange(index, "date", value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* btns */}
            <div className="col-lg-1 col-6 p-lg-0 d-flex justify-content-evenly align-items-center">
              <button
                type="button"
                className="btn btn-danger text-white"
                onClick={() => handleRemoveInstallment(index)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoInstallmentsSection;
