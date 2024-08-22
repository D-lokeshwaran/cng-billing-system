import { FC, useState, useEffect } from 'react';
import tariffSlice from './tariffSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button, Card } from 'react-bootstrap';
import { useToggle, useRouter } from 'src/hooks';
import TariffDetails from './TariffDetails';
import { useTableAdapter } from 'src/hooks';
import { coreApi } from "src/utils/api";
import { trackPromise } from 'react-promise-tracker';
import TanStackTable from "src/components/table/TanStackTable";
import FeatureHeader from "src/components/structure/FeatureHeader";
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
        const result = await trackPromise(coreApi.get("/cng/tariffs"));
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
                <Card.Header>

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
