import React, { useState } from 'react';
import './SelectableTable.css';

interface RowData {
  id: number;
  name: string;
  job: string;
  favoriteColor: string;
}

interface SelectableTableProps {
  data: RowData[]; // Array of row data passed as a prop
}

const SelectableTable: React.FC<SelectableTableProps> = ({ data }) => {
  const [rows, setRows] = useState<RowData[]>(data);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number) => {
    setSelectedRow(rowIndex);
  };

  const handleEdit = (id: number, key: keyof RowData, value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              className={selectedRow === row.id ? 'selected' : 'hover'}
            >
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleEdit(row.id, 'name', e.target.value)}
                  className="input input-bordered"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.job}
                  onChange={(e) => handleEdit(row.id, 'job', e.target.value)}
                  className="input input-bordered"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.favoriteColor}
                  onChange={(e) =>
                    handleEdit(row.id, 'favoriteColor', e.target.value)
                  }
                  className="input input-bordered"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectableTable;
