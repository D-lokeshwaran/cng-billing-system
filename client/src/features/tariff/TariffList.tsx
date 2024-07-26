import { FC, useState, useEffect } from 'react';
import tariffSlice from './tariffSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button, Card } from 'react-bootstrap';
import { useToggle } from 'src/hooks';
import TariffDetailModal from './TariffDetailModal';
import { useTableAdapter } from 'src/hooks';
import { coreApi } from "src/utils/api";
import TanStackTable from "src/components/table/TanStackTable";
import Pagination from "src/components/table/Pagination";

const TariffList: FC = () => {

    const [ showTariffModal, toggleTariffModal ] = useToggle();
    const [ refresh, refreshTable ] = useToggle();
    const [ tariff, setTariff ] = useState();
    const { table, setData } = useTableAdapter({
        ...tariffSlice,
    });

    useEffect(() => {
        refreshTariffs();
    }, [refresh])

    const refreshTariffs = async () => {
        const result = await coreApi.get("/cng/tariffs");
        const tariffs = result.data.tariffs || result.data._embedded.tariffs;
        setData(tariffs);
    }

    const handleAddTariff = () => {
        setTariff(undefined);
        toggleTariffModal();
    }

    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                const tariff = row.original;
                setTariff(tariff);
                toggleTariffModal();
            }
        }
    }

    const handleCloseModal = () => {
        toggleTariffModal();
        refreshTable();
    }

    return (
        <div>
            <Button 
                variant="success"
                onClick={handleAddTariff}
            >
                + Tariff
            </Button>
            <TariffDetailModal show={showTariffModal} onHide={handleCloseModal} tariff={tariff}/>
            <TanStackTable table={table} rowProps={getRowProps} />
            <Pagination table={table} />
        </div>
    );

}
export default TariffList
