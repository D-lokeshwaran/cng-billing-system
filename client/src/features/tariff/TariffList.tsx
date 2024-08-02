import { FC, useState, useEffect } from 'react';
import tariffSlice from './tariffSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button, Card } from 'react-bootstrap';
import { useToggle, useRouter } from 'src/hooks';
import TariffDetails from './TariffDetails';
import { useTableAdapter } from 'src/hooks';
import { coreApi } from "src/utils/api";
import TanStackTable from "src/components/table/TanStackTable";
import Pagination from "src/components/table/Pagination";

const TariffList: FC = () => {

    const [ showTariffModal, toggleTariffModal ] = useToggle();
    const [ refresh, refreshTable ] = useToggle();
    const router = useRouter();
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
            <Button 
                variant="success"
                onClick={() => router.push(`/tariffs/new`)}
            >
                + Tariff
            </Button>
            <TanStackTable table={table} rowProps={getRowProps} />
            <Pagination table={table} />
        </div>
    );

}
export default TariffList
