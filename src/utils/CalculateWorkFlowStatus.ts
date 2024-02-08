const getStatusColor = (isApproved: boolean, isRejected: boolean) => {
    if (isRejected) {
        return '#d9534f';
    } else if (isApproved) {
        return '#5cb85c';
    } else {
        return '#f0ad4e';
    }
};

export const calculateWorkFlowStatus = (workFlow: any[]): string => {
    if (!workFlow || workFlow.length === 0) {
        return '#f0ad4e';
    }
    const totalItems = workFlow.length;
    const rejectedItem = workFlow.find(item => item.isRejected);

    if (rejectedItem) {
        // If any item is rejected, set the whole status to red
        return '#d9534f';
    }

    const statusColors = workFlow.map((item, index) => {
        const isApproved = item.state;
        const isRejected = item?.isRejected!;

        // Calculate the percentage for each color based on its position
        let percentage;
        if (index === totalItems - 1) {
            percentage = 33.33;
        } else {
            percentage = (index + 1) * (100 / totalItems);
        }

        // Return the color for each item based on approval status
        return `${getStatusColor(isApproved, (isRejected || false))} ${percentage}%`;
    });
    // Combine the colors for each item
    return `linear-gradient(90deg, ${statusColors.join(', ')})`;
};