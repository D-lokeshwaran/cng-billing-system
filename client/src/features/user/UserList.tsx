import React, { useEffect, useState } from "react";
import FeatureHeader from "src/components/structure/FeatureHeader";
import TanStackTable from "src/components/table/TanStackTable";
import Pagination from "src/components/table/Pagination";
import SearchBoxInput from "src/components/common/SearchBoxInput";
import ExportData from "src/components/common/ExportData";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useRouter, useTableAdapter } from "src/hooks";
import userSlice, { User } from "./userSlice";
import { supportApi } from "src/utils/api";

const UserList = () => {

    const router = useRouter();
    const { table, setData } = useTableAdapter(userSlice)

    useEffect(() => {
        retrieveAllUsers();
    }, [])

    const retrieveAllUsers = async () => {
        await supportApi.get("/user")
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }

    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                const userEmailAddress = row.original.emailAddress;
                router.push(`/users/${userEmailAddress}`)
            }
        }
    }

    return (
        <div>
            <FeatureHeader title="Users" className="justify-content-between">
                <Button
                    variant="success"
                    disabled
                    onClick={() => router.push(`/users/new`)}
                >
                    + Add User
                </Button>
            </FeatureHeader>
            <Card className="mt-3">
                <Card.Header>
                    <Row className="justify-content-between">
                        <Col lg="4">
                            <SearchBoxInput
                                value={table.getState().globalFilter ?? ''}
                                onChange={(value) => table.setGlobalFilter(String(value))}
                                debounce={200}
                            />
                        </Col>
                        <Col sm="auto" lg="auto" xs className="d-flex">
                            <Button className="me-3">
                                Filter
                            </Button>
                            <ExportData table={table}/>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <TanStackTable table={table} rowProps={getRowProps}/>
                </Card.Body>
                <Card.Footer>
                    <Pagination table={table}/>
                </Card.Footer>
            </Card>
        </div>
    )

}

export default UserList;