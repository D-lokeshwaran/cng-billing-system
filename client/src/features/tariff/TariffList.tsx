import { FC, useState } from 'react';
import tariffSlice from './tariffSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button } from 'react-bootstrap';
import { useToggle } from 'src/hooks';
import TariffDetailModal from './TariffDetailModal';

const TariffList: FC = () => {

    const [ showTariffModal, toggleTariffModal ] = useToggle();
    const [ tariff, setTariff ] = useState();
    
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
        toggleTariffModal()
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
            <ReadyMadeTable slice={tariffSlice} rowProps={getRowProps} />
        </div>
    );

}
export default TariffList
