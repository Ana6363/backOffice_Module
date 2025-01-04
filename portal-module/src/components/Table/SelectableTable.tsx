import React, { useState, useEffect } from 'react';
import './SelectableTable.css';

interface SelectableTableProps<T> {
    data: T[];
    headers: { key: keyof T; label: string }[];
    onRowSelect?: (selectedRow: T | null) => void; // Optional callback
    disableRowSelection?: boolean; // New prop to control row selection
}

const SelectableTable = <T extends {}>({
    data,
    headers,
    onRowSelect,
    disableRowSelection = false, // Default to false (row selection enabled)
}: SelectableTableProps<T>) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!disableRowSelection) {
            // Get the first selected row and send it back to the parent component
            if (selectedRows.size > 0) {
                const selectedRow = data.find((row, index) => selectedRows.has(index)) || null;
                onRowSelect?.(selectedRow);
            } else {
                onRowSelect?.(null); // No row selected
            }
        }
    }, [selectedRows, data, onRowSelect, disableRowSelection]);

    const handleCheckboxChange = (index: number, isChecked: boolean) => {
        if (disableRowSelection) return; // Do nothing if row selection is disabled

        const updatedSelectedRows = new Set(selectedRows);
        if (isChecked) {
            updatedSelectedRows.add(index);
        } else {
            updatedSelectedRows.delete(index);
        }
        setSelectedRows(updatedSelectedRows);
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

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
                        {!disableRowSelection && <th className="px-2 py-1">Select</th>}
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
                            {!disableRowSelection && (
                                <td className="px-2 py-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.has(index)}
                                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                        title="Select row"
                                    />
                                </td>
                            )}
                            {headers.map((header) => (
                                <td key={String(header.key)} className="px-2 py-1">
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
