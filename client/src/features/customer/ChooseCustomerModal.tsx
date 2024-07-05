import React, { useEffect, useState } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { coreApi } from 'src/utils/api';
import customerSlice, { Customer } from './customerSlice';
import { useTableAdapter } from 'src/hooks/useTableAdapter'
import { flexRender } from '@tanstack/react-table';

interface ChooseCustomerModelProps {
    show: boolean;
    handleSelect: (customerId: number) => void;
    onClose: () => void;
}

const ChooseCustomerModal: React.FC<ChooseCustomerModelProps> = ({
    show,
    handleSelect,
    onClose
}) => {

    const table = useTableAdapter({
        name: customerSlice.name,
        columns: customerSlice.columns,
        params: customerSlice.params
    })
    const renderCustomer = table.getRowModel().rows.map(row => (
        <div key={row.id}>
            
        </div>
    ))

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <FormControl
                    type="search"
                    placeholder='Search a customer...'
                    autoFocus
                />
            </Modal.Header>
            <Modal.Body>
                {renderCustomer}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' size='sm' onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ChooseCustomerModal