import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

interface IconButtonProps {
    children: ReactNode;
    icon: ReactNode;
    className: string;
    [int:string]: any;
}

const IconButton: React.FC<IconButtonProps> = ({
    children,
    icon,
    className,
    ...props
}) => {
    const HugIcon = icon;
    return (
        <Button
            variant="icon-button"
            className={`cursor-pointer ${className}`}
            size="sm"
            {...props}
        >
            <div className="d-flex align-items-center justify-content-center">
                {children || <HugIcon size="22"/>}
            </div>
        </Button>
    )
}

export default IconButton;