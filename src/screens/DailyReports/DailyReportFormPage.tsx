import React from 'react'

interface Props {
    id?: string;
}

const DailyReportFormPage = ({ id }: Props) => {
    return (
        <div>
            DR form page {id}
        </div>
    )
}

export default DailyReportFormPage
