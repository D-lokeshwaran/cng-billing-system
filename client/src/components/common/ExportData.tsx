import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

interface ExportDataProps {
    data: any,
    filename: string
}

const ExportData: React.FC<ExportDataProps> = ({
    data,
    filename
}) => {
    return (
        <div>
            <CSVLink {...{
                data,
                filename
            }}/>
        </div>
    )
}

export default ExportData;