import React from 'react';
import GeneralChartCard from 'components/Charts/GeneralChartCard';
import { ProjectExpensesChartData, ProjectProgressChartData } from 'components/Data/DashboardData';
import { IOption } from 'types/Option';

interface ChartProps {
    projectName: string;
    projectExpensesData: IOption[];
    totalExpenses: string;
    projectProgressData: IOption[];
    totalProgress: string;
}

const ProjectChart: React.FC<ChartProps> = ({ projectName, projectExpensesData, totalExpenses, projectProgressData, totalProgress }) => {
    let projectExpenses = Object.assign(ProjectExpensesChartData)
    projectExpenses.options.series = projectExpensesData?.map((term) => term.value)
    projectExpenses.options.labels = projectExpensesData?.map((term) => term.label)

    let projectProgress = Object.assign(ProjectProgressChartData)
    projectProgress.options.series[0].data = projectProgressData?.map((term) => term.value)
    // projectProgress.options.xaxis.categories = projectProgressData?.map((term) => term.label)

    console.log(projectProgress)

    return (
        <div className="row clearfix g-3">
            <div className="col-sm-12">
                {/*  */}
                <div className="row g-3">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                        <div className="row g-3 mb-3">
                            <div className={`col-md-6`}>
                                <GeneralChartCard Title={`${projectName} Expenses Chart`} data={projectExpenses} TitleRight={totalExpenses} />
                            </div>
                            <div className={`col-md-6`}>
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        {projectProgress && (
                                            <GeneralChartCard Title={`${projectName} Progress`} data={projectProgress} TitleRight={totalProgress} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectChart;
