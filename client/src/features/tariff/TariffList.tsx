import { FC } from 'react';
import tariffSlice from './tariffSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button } from 'react-bootstrap';
import { useToggle } from 'src/hooks';
import TariffDetailModal from './TariffDetailModal';

const TariffList: FC = () => {

    const [ showTariffModal, toggleTariffModal ] = useToggle();
    
    const handleAddTariff = () => {
        toggleTariffModal();
    }

    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                const tariffId = row.original.id;
                toggleTariffModal();
            }
        }
    }

    return (
        <div>
            <Button 
                variant="success"
                onClick={handleAddTariff}
            >
                + Tariff
            </Button>
            <TariffDetailModal show={showTariffModal} onHide={toggleTariffModal}/>
            <ReadyMadeTable slice={tariffSlice} rowProps={getRowProps}/>
        </div>
    );

}
export default TariffList
