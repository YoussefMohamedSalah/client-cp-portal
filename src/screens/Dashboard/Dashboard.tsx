// import EmployeesAvailability from 'components/Dashboard/EmployeesAvailability';
// import GeneralChartCard from 'components/Charts/GeneralChartCard';
// import { EmployeeInfoChartData, TopHiringSourcesChartData, TotalEmployeesChartData } from 'components/Data/DashboardData';
// import Loading from 'components/UI/Loading';
// import { useAdminDashboardQuery } from 'api/Dashboard/Dashboard';
// import { Dashboard as DashboardType } from "types/Dashboard";

const Dashboard: React.FC = () => {
    // const { isLoading, error, data } = useAdminDashboardQuery({});
    // if (error) return null;
    // if (isLoading) return <Loading />;

    // let dashboard: DashboardType = data?.dashboard?.data! || {} as DashboardType;
    // const { employee_count, male_count, female_count } = dashboard;
    // const chartSeries = [male_count, female_count];
    // const chartOptions = ["Man", "Women"];
    // let chartData = TotalEmployeesChartData;
    // chartData.options.labels = chartOptions;
    // chartData.options.series = chartSeries;
    return (
        <>
            {/* {data ? (
                <div className="container-xxl">
                    <div className="row clearfix g-3">
                        <div className="col-xl-8 col-lg-12 col-md-12 flex-column">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <GeneralChartCard
                                        Title="Employees Info"
                                        data={EmployeeInfoChartData}
                                    />
                                </div>
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-12">
                                    <GeneralChartCard
                                        Title="Top Hiring Sources"
                                        data={TopHiringSourcesChartData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12">
                            <div className="row g-3">
                                <div className="col-md-6 col-lg-6 col-xl-12">
                                    <EmployeesAvailability data={dashboard} />
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-12">
                                    <GeneralChartCard
                                        Title="Total Employees"
                                        data={chartData}
                                        TitleRight={employee_count}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )} */}
        </>
    )
}

export default Dashboard
