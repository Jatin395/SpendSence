import React, { useState } from 'react';
import { Button, Input, Table } from 'antd';
import { unparse } from 'papaparse';

function TransitionsTable({ showtran }) {

    const [input, setinput] = useState("");

    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "amount",
            title: "Amount",
            dataIndex: "amount",
        },
        {
            key: "type",
            title: "Type",
            dataIndex: "type",
        },
    ];

    const downloadCSV = () => {
        const csv = unparse({
            fields: ["name", "amount", "type"],
            data: showtran,
        });

        const data = new Blob([csv], { type: 'text/csv' });
        const csvURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'transactions.csv');
        tempLink.click();
    };

    const filteredTransitions = showtran.filter((transition) => {
        return transition.name.toLowerCase().includes(input.toLowerCase());
    });

    return (
        <>
            <div className="sm:m-4">
                <div className="p-2 m-2 flex justify-between items-center">
                    <Input
                        value={input}
                        className='w-96 rounded-sm'
                        onChange={(e) => { setinput(e.target.value); }}
                        placeholder="Search by name"
                    />
                    <Button onClick={downloadCSV}>Download CSV</Button>
                </div>
                <Table className='cursor-pointer'
                    dataSource={filteredTransitions}
                    columns={columns}
                    rowKey={(record) => `${record.name}-${record.date_time}`}
                />

            </div>
        </>
    );
}

export default TransitionsTable;
