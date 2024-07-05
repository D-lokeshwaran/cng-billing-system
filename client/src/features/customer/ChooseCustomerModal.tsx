import React, { useEffect } from 'react';
import { Button, FormControl, Modal, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import customerSlice, { Customer } from './customerSlice';
import { useTableAdapter } from 'src/hooks/useTableAdapter'
import SearchBoxInput from 'src/components/common/SearchBoxInput';
import Pagination from 'src/components/table/Pagination';
import { ArrowLeft01Icon, ArrowRight01Icon, PencilEdit01Icon } from 'hugeicons-react';
import classNames from 'classnames';
import FlexBox from 'src/components/common/FlexBox';

interface ChooseCustomerModelProps {
    show: boolean;
    handleSelect: (customerId: number) => void;
    onClose: () => void;
}

const DEFAULT_PAGE_SIZE = 5;

const ChooseCustomerModal: React.FC<ChooseCustomerModelProps> = ({
    show,
    handleSelect,
    onClose
}) => {

    const table = useTableAdapter({
        name: customerSlice.name,
        columns: customerSlice.columns,
        params: customerSlice.params,
        _mock: customerSlice._mock
    })
    useEffect(() => {
        table.setPageSize(DEFAULT_PAGE_SIZE);
    }, [])
    const renderCustomer = <ListGroup aria-details=''>
        {table.getRowModel().rows.map((row) => {
            const customer = row.original as Customer;
            return (
                <ListGroupItem key={row.id} action className='text-dark'>
                    <Row className='align-items-center'>
                        <Col style={{fontSize: "0.8rem"}}>
                            <div className="fs-6">#{customer.accountNumber} . John Deep </div> 
                            <div className='text-secondary'>{customer.emailAddress || "demouser@gmail.com"}</div>
                            <div className='text-secondary'>{"99415787856"}</div>
                        </Col>
                        <Col sm="auto">
                            <Row className="g-1">
                                <Col as={PencilEdit01Icon}/>
                                <Col as={ArrowLeft01Icon}/>
                            </Row>
                        </Col>
                    </Row>
                </ListGroupItem>
            )}
        )}
    </ListGroup>

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header className='d-block'>
                <Row className="g-0 justify-content-between">
                    <Col sm={7} md={9}>
                        <SearchBoxInput 
                            value={table.getState().globalFilter ?? ''}
                            onChange={(value) => table.setGlobalFilter(String(value))}
                            debounce={200}
                            placeholder='Search customers...'
                        />
                    </Col>
                    <Col sm={3} className="p-0 d-flex align-items-center justify-content-end">
                        <span className='me-3'>{DEFAULT_PAGE_SIZE} - {table.getState().pagination.pageIndex}</span>
                        <ArrowLeft01Icon
                            className={classNames("cursor-pointer", {
                                'text-secondary': !table.getCanPreviousPage()
                            })}
                            onClick={() => {
                                if (table.getCanPreviousPage())
                                    table.previousPage()
                            }}
                        />
                        <ArrowRight01Icon
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