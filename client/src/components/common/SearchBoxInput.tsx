import { useEffect, useState } from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';

type SearchBoxInputProps = {
    value: string,
    onChange: (value: string | number) => void,
    debounce?: number,
    [int:string]: any
}

const SearchBoxInput = ({ 
    value: initialValue, 
    onChange, 
    debounce = 300, 
    ...rest 
}: SearchBoxInputProps & FormControlProps) => {
    const [ value, setValue ] = useState<string>(initialValue);

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const setOnDelay = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(setOnDelay);
    }, [value])

    return (
        <FormControl
            type='search'
            placeholder='search...'
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            {...rest}
        />
    )
}

export default SearchBoxInput;