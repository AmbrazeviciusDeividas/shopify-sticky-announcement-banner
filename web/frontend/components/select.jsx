import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export function SelectStatus({ value }) {
    const [selected, setSelected] = useState('active');

    const handleSelectChange = useCallback((value) => {
        setSelected(value)
    }, []);

    const options = [
        {label: 'Active', value: 'active'},
        {label: 'Inactive', value: 'inactive'}
    ];

    return (
        <Select
            label="Status"
            options={options}
            onChange={handleSelectChange}
            value={selected}
            name="status"
        />
    );
}
