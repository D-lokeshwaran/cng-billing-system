import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

interface IconButtonProps {
    children: ReactNode;
    icon: ReactNode;
    className: string;
    label: string;
    [int:string]: any;
}

const IconButton: React.FC<IconButtonProps> = ({
    children,
    icon,
    className,
    label,
    ...props
}) => {
    const HugeIcon = icon;
    return (
        <Button
            variant={props.variant || "icon-button"}
            className={`cursor-pointer ${className}`}
            size="sm"
            {...props}
        >
            <div className="d-flex align-items-center justify-content-center">
                {icon && <HugeIcon size="20"/>}
                {label && <span className="ms-1">{label}</span>}
            </div>
        </Button>
    )
}

export default IconButton;