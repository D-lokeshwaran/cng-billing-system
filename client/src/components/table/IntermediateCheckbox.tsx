import React, { HTMLProps } from 'react';
import { FormCheck, FormCheckProps } from 'react-bootstrap';

// To connect intermdate checkbox to group checkbox
function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }: { indeterminate?: boolean } & FormCheckProps) {
    const ref = React.useRef<HTMLInputElement>(null!)
  
    React.useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate])
  
    return (
      <FormCheck
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }
export default IndeterminateCheckbox;
