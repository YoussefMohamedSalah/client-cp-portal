import React from 'react'

interface Props {
    id: string;
}

const DailyReportDetails = ({ id }: Props) => {
    return (
        <div>
            {id}
        </div>
    )
}

export default DailyReportDetails
