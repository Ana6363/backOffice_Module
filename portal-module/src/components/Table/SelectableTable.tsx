import React, { useState, useEffect } from 'react';
import './SelectableTable.css';

// Generic Row Data type
interface SelectableTableProps<T> {
    data: T[];
    headers: { key: keyof T; label: string }[];
    onRowSelect: (selectedRow: T | null) => void;
}

const SelectableTable = <T extends {}>({ data, headers, onRowSelect }: SelectableTableProps<T>) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Get first selected row and send it back to the parent component
        if (selectedRows.size > 0) {
            const selectedRow = data.find((row, index) => selectedRows.has(index)) || null;
            onRowSelect(selectedRow);
        } else {
            onRowSelect(null); // no row selected
        }
    }, [selectedRows, data, onRowSelect]);

    // Handle checkbox selection
    const handleCheckboxChange = (index: number, isChecked: boolean) => {
        const updatedSelectedRows = new Set(selectedRows);
        if (isChecked) {
            updatedSelectedRows.add(index);
        } else {
            updatedSelectedRows.delete(index);
        }
        setSelectedRows(updatedSelectedRows);
    };

    // Handle filter change
    const handleFilterChange = (key: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    // Filter data based on the filters applied
    const filteredData = data.filter((row) => {
        return headers.every((header) => {
            const filterValue = filters[String(header.key)]?.toLowerCase() || '';
            const cellValue = String(row[header.key] ?? '').toLowerCase();
            return cellValue.includes(filterValue);
        });
    });

    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className="px-2 py-1">Select</th>
                        {headers.map((header) => (
                            <th key={String(header.key)} className="px-2 py-1">
                                {header.label}
                                <input
                                    type="text"
                                    value={filters[String(header.key)] || ''}
                                    onChange={(e) => handleFilterChange(String(header.key), e.target.value)}
                                    placeholder={`Filter by ${header.label}`}
                                    className="ml-2 px-1 border rounded"
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className="hover cursor-pointer">
                            <td className="px-2 py-1">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.has(index)}
                                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                />
                            </td>
                            {headers.map((header) => (
                                <td key={String(header.key)} className="px-2 py-1">
                                    {/* Dynamically access the key */}
                                    {String(row[header.key] ?? '--')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SelectableTable;
