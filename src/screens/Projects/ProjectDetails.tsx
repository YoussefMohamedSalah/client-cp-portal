import React from 'react'

interface Props {
    id?: string;
};

const ProjectDetails = ({ id }: Props) => {
    return (
        <div>
            details page {id}
        </div>
    )
}

export default ProjectDetails
