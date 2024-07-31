import { AlertCircleIcon } from "hugeicons-react";
import { FC } from "react";

interface ErrorMessageProps {
    errorMessage: string | undefined;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage, ...props }) => {
    return errorMessage && 
        <div style={{fontSize: ".80rem", display: "flex", alignItems: "center"}} className="mt-1" {...props}>
            <AlertCircleIcon 
                size={14} 
                color="#dc3545"
                strokeWidth='2.5'    
            />
            <span className='ps-1 text-secondary'>{`${errorMessage}`}</span>
        </div>
}

export default ErrorMessage;