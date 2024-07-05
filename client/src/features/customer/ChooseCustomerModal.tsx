import React, { useEffect, useState } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { coreApi } from 'src/utils/api';
import customerSlice, { Customer } from './customerSlice';

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

    const [customers, setCustomers] = useState<Customer[]>();

    useEffect(() => {
        retrieveAllCustomers();
    }, [])

    const retrieveAllCustomers = async () => {
        const customersData = await coreApi.get(customerSlice.params?.url || '/cng/customers');        
        if (customersData.data.length > 0) {
            setCustomers(customersData.data);
        } else {
            alert("No customer ui and add button")
        }
    }

    const renderCustomerList = customers?.forEach(customer => (
        <div onClick={() => handleSelect(customer.id)}>
            {customer.accountNumber}
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
                <>{renderCustomerList}</>
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