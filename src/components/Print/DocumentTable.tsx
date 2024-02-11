import { ReactNode } from 'react';

interface Props<T> {
    tableData: T[];
    tableHead: string[];
    renderRow: (rowData: T, index: number) => ReactNode;
};

function DocumentTable<T>({ tableHead, tableData, renderRow }: Props<T>) {
    return (
        <table className="table-responsive-sm w-100 mb-3" style={{ border: '1px solid black' }}>
            <thead>
                <tr className="border-bottom border-black">
                    {tableHead.map((headData, index) => (
                        <th className="text-start p-2" key={index}>
                            {headData}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((rowData, index) => (
                    <tr key={index}>{renderRow(rowData, index)}</tr>
                ))}
            </tbody>
        </table>
    )
}

export default DocumentTable;
