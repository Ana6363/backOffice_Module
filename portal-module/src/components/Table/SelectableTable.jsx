import React, { useState } from 'react';
import './SelectableTable.css'; 

const SelectableTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          <tr
            onClick={() => handleRowClick(1)}
            className={selectedRow === 1 ? 'selected' : ''}
          >
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <tr
            onClick={() => handleRowClick(2)}
            className={selectedRow === 2 ? 'selected' : 'hover'}
          >
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr
            onClick={() => handleRowClick(3)}
            className={selectedRow === 3 ? 'selected' : ''}
          >
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SelectableTable;
