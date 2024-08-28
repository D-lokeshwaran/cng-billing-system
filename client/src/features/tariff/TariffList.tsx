import { FC, useState, useEffect } from 'react';
import tariffSlice, { Tariff } from './tariffSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button, Card, FormControl, Dropdown } from 'react-bootstrap';
import { useToggle, useRouter } from 'src/hooks';
import TariffDetails from './TariffDetails';
import { useTableAdapter } from 'src/hooks';
import { coreApi } from "src/utils/api";
import { formatServerDate } from "src/utils/date";
import { trackPromise } from 'react-promise-tracker';
import TanStackTable from "src/components/table/TanStackTable";
import FeatureHeader from "src/components/structure/FeatureHeader";
import Pagination from "src/components/table/Pagination";
import ExportData from 'src/components/common/ExportData';
import FlexBox from 'src/components/common/FlexBox';
import HookForm from "src/components/form/HookForm";
import DatePickerInput from "src/components/form/DatePickerInput";
import { ToDateWithValidation } from "./TariffDetails";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FilterIcon } from "hugeicons-react";
import { dateBetweenFilter } from "src/components/common/table/filters";

const dateBetweenFromAndToFilter = (row, id, filterValue) => {
    const rowFromDate = new Date(row.getValue('fromDate'));
    const rowToDate = new Date(row.getValue('toDate'));
    const [ startDate, endDate ] = filterValue;

    const isDateInRange = (date) =>
      moment(date).isSame(rowFromDate, 'days') ||
      moment(date).isSame(rowToDate, 'days') ||
      moment(date).isBetween(rowFromDate, rowToDate);

    if (!startDate || !endDate) {
        return true;
    }
    return (
        isDateInRange(startDate)  || isDateInRange(endDate)
    )
}

const TariffList: FC = () => {

    const [ showTariffModal, toggleTariffModal ] = useToggle();
    const [ refresh, refreshTable ] = useToggle();
    const [ dateRange, setDateRange ] = useState([null, null]);
    const [ startDate, endDate ] = dateRange;
    const router = useRouter();
    const { table } = useTableAdapter({
        ...tariffSlice,
        filterFns: {
            dateBetween: dateBetweenFromAndToFilter // if u used in many places change this filter in adapter itself
        }
    });

    const handleAddTariff = () => {
        router.push(`/tariffs/new`);
    }

    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                const tariff = row.original;
                router.push(`/tariffs/${tariff.id}`);
            }
        }
    }

    return (
        <div>
            <FeatureHeader
                title="Tariffs"
                className="justify-content-between"
                breadcrumbs={[
                    { title: "Tariff", path: "/tariffs"},
                    { title: "List", disabled: true}
                ]}
            >
                <Button
                    variant="success"
                    onClick={() => router.push(`/tariffs/new`)}
                >
                    + Tariff
                </Button>
            </FeatureHeader>
            <Card>
                <Card.Header as={FlexBox} justify="between">
                    <DatePicker
                        placeholderText="Search by date..."
                        className="form-control form-control-sm"
                        isClearable={true}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update)
                            table.setColumnFilters([{
                                id: 'fromDate',
                                value: update
                            }])
                        }}
                    />
                    <ExportData table={table} />
                </Card.Header>
                <Card.Body className="p-0">
                    <TanStackTable table={table} rowProps={getRowProps} />
                </Card.Body>
                <Card.Footer>
                    <Pagination table={table} />
                </Card.Footer>
            </Card>
        </div>
    );

}
export default TariffList
