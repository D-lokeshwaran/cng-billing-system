import classNames from 'classnames';
import React from 'react';

interface FlexBoxProps {
    as?: string,
    className?: string,
    inline?: boolean,
    justify?: string,
    alignItems?: "center" | "start" | "end" | "between" | "around" | "evenly",
    children: any,
}

const FlexBox: React.FC<FlexBoxProps> = ({
    className,
    justify,
    alignItems="center",
    inline=false,
    children,
    ...rest
}) => {
    return (
        <div className={classNames(
            {
                'd-flex': !inline,
                'd-inline-flex': inline,
                [`justify-content-${justify}`]: justify,
                [`align-items-${alignItems}`]: alignItems,

            }, className
        )}
        {...rest}
        >
            {children}
        </div>
    )
}

export default FlexBox;