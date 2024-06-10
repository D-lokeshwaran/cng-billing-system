import classNames from 'classnames';
import React, { Children } from 'react';

interface FlexBoxProps {
    as?: string,
    className?: string,
    inline: boolean,
    chilren: React.ReactNode,
}

const FlexBox: React.FC<FlexBoxProps> = ({
    className,
    inline,
    chilren,
    constrains,
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
            {chilren}
        </div>
    )
}