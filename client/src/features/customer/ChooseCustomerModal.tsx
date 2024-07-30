import React, { useEffect } from 'react';
import { Button, FormControl, Modal, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import customerSlice, { Customer } from './customerSlice';
import { useTableAdapter } from 'src/hooks/useTableAdapter'
import SearchBoxInput from 'src/components/common/SearchBoxInput';
import IconButton from 'src/components/common/IconButton';
import Pagination from 'src/components/table/Pagination';
import { ArrowLeft01Icon, ArrowRight01Icon, PencilEdit01Icon, ArrowMoveDownLeftIcon } from 'hugeicons-react';
import classNames from 'classnames';
import FlexBox from 'src/components/common/FlexBox';

interface ChooseCustomerModelProps {
    show: boolean;
    handleSelect: (customer: Customer) => void;
    onClose: () => void;
}

const DEFAULT_PAGE_SIZE = 5;

const ChooseCustomerModal: React.FC<ChooseCustomerModelProps> = ({
    show,
    handleSelect,
    onClose
}) => {

    const { table } = useTableAdapter({
        name: customerSlice.name,
        columns: customerSlice.columns,
        params: customerSlice.params,
    })

    useEffect(() => {
        table.setPageSize(DEFAULT_PAGE_SIZE);
    }, [])

    const renderCustomer = <ListGroup aria-details='' as="ul">
        {table.getRowModel().rows.map((row) => {
            const customer = row.original as Customer;
            return (
                <ListGroupItem
                    key={row.id}
                    as="li"
                    action
                    className='text-dark btn-reveal-trigger cursor-pointer'
                    onClick={() => {
                        handleSelect(customer)
                        onClose()
                    }}
                >
                    <Row className='align-items-center'>
                        <Col style={{fontSize: "0.8rem"}}>
                            <div className="fs-6">#{customer.accountNumber} . {customer.fullName} </div>
                            <div className='text-secondary'>{customer.emailAddress || "demouser@gmail.com"}</div>
                            <div className='text-secondary'>{"99415787856"}</div>
                        </Col>
                        <Col sm="auto">
                            <IconButton icon={ArrowMoveDownLeftIcon} className="btn-reveal"/>
                        </Col>
                    </Row>
                </ListGroupItem>
            )}
        )}
    </ListGroup>

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header className='d-block'>
                <Row className="g-0 justify-content-between">
                    <Col sm={7} md={9}>
                        <SearchBoxInput 
                            value={table.getState().globalFilter ?? ''}
                            onChange={(value) => table.setGlobalFilter(String(value))}
                            debounce={200}
                            placeholder='Search customers...'
                            autoFocus
                        />
                    </Col>
                    <Col sm={3} className="p-0 d-flex align-items-center justify-content-end">
                        <span className='me-3'>{DEFAULT_PAGE_SIZE} - {table.getState().pagination.pageIndex}</span>
                        <IconButton
                            icon={ArrowLeft01Icon}
                            className={classNames("me-1", {
                                'text-secondary': !table.getCanPreviousPage()
                            })}
                            onClick={() => {
                                if (table.getCanPreviousPage())
                                    table.previousPage()
                            }}
                        />
                        <IconButton
                            icon={ArrowRight01Icon}
                            className={classNames("cursor-pointer", {
                                'text-secondary': !table.getCanNextPage()
                            })}
                            onClick={() => {
                                if (table.getCanNextPage())
                                    table.nextPage()
                            }}
                        />
                    </Col>
                </Row>
            </Modal.Header>
            <Modal.Body className='p-0'>
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