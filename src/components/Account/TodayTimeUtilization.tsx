import { useState } from "react";
import Chart from "react-apexcharts";

interface Props {
  identity: any;
  Title: any;
  TitleRight: any;
  extraDivBody: any;
  footerBody: any;
  data: any;
}

type IState = { option: any; series: any };

const TodayTimeUtilization: React.FC<Props> = ({ identity, Title, TitleRight, extraDivBody, footerBody, data }) => {
  const INITIAL_STATE: IState = {
    option: data.options,
    series: data.options.series,
  };
  const [state] = useState<IState>(INITIAL_STATE);
  const { option, series } = state;

  return (
    <div className="card">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h6 className="mb-0 fw-bold ">{Title}</h6>
        {TitleRight ? <h3 className="mb-0 fw-bold">{TitleRight}</h3> : null}
      </div>
      <div className="card-body">
        {extraDivBody ? extraDivBody() : null}
        <Chart
          options={option}
          series={series}
          type={option ? option.chart.type : "bar"}
          height={option ? option.chart.height : 320}
        />
        {footerBody ? footerBody : null}
      </div>
    </div>
  );
};

export default TodayTimeUtilization;
