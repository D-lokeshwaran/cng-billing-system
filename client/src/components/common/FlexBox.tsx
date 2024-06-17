import classNames from 'classnames';
import React from 'react';

interface FlexBoxProps {
    as?: string,
    className?: string,
    inline?: boolean,
    children: any,
}

const FlexBox: React.FC<FlexBoxProps> = ({
    className,
    inline=false,
    children,
    ...rest
}) => {
    return (
        <div className={classNames(
            {
                'd-flex': !inline,
                'd-inline-flex': inline,
            }, className
        )}
        {...rest}
        >
            {children}
        </div>
    )
}

export default FlexBox;