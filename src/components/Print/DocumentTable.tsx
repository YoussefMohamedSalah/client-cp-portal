import { ReactNode } from 'react';

interface Props<T> {
    tableData: T[];
    renderRow: (rowData: T, index: number) => ReactNode;
};

function DocumentTable<T>({ tableData, renderRow }: Props<T>) {
    return (
        <table className="table table-striped m-0">
            <tbody>
                {tableData.map((rowData, index) => (
                    <tr key={index}>{renderRow(rowData, index)}</tr>
                ))}
            </tbody>
        </table>
    )
}

export default DocumentTable;
