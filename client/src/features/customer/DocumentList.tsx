import React, { useRef } from 'react';
import { Card, FormControl, FormGroup, FormLabel, ListGroup } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Cancel01Icon, DocumentValidationIcon, Upload02Icon } from "hugeicons-react";
import { getReadableFileSize, validateFileSize } from "src/utils/common";
import { Customer } from './customerSlice';
import ErrorMessage from 'src/components/form/ErrorMessage';
import { MAX_FILE_SIZE } from 'src/config';
import { CUSTOMER_DETAILS } from 'src/constants/labels';

const DocumentList = () => {

    const { control, setError, clearErrors } = useFormContext<Customer>();
    const { fields, append, remove } = useFieldArray<Customer>({
        control,
        name: "documents",
        keyName: "id"
    });

    const hiddenFileInput = useRef<HTMLInputElement>(null!);

    const onAddDocument = () => {
        hiddenFileInput.current.click();
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files || []);

        // validate empty file and max file size
        const hasEmptyFile = uploadedFiles.some(file => file.size === 0);
        const hasLargeFile = uploadedFiles.some(file => validateFileSize(file.size));
        if (hasEmptyFile) {
            setError("documents", { type: "manual", message: "File(s) should not be empty" });
        } else if (hasLargeFile) {
            setError("documents", { type: "manual", message: `File(s) size should be under ${MAX_FILE_SIZE}` });
        }else {
            clearErrors("documents");
        }

        // append files to the hook form
        if (uploadedFiles.length > 0) {
            const wrappedFiles = uploadedFiles.map(file => ({ file }));
            append(wrappedFiles as any);
        }

        hiddenFileInput.current.value = "";
    };

    return (
        <FormGroup>
            <FormLabel>{CUSTOMER_DETAILS.DOCUMENTS}</FormLabel>
            <FormControl
                type="file"
                hidden
                className="file-uploader-input"
                ref={hiddenFileInput}
                multiple
                onChange={handleFileUpload}
            />
            <Card>
                <Card.Header className='p-0'>
                    <div 
                        style={{ backgroundColor: "#CCC !important" }} 
                        className="p-4 rounded bg-light border border-2 text-center cursor-pointer"
                        onClick={onAddDocument}
                    >
                        <Upload02Icon 
                            size={34}
                            className="me-3"
                        /> 
                        <p className="mb-0 mt-1" style={{ fontSize: ".90rem" }}>Click to browse or Drag and drop.</p>
                    </div>
                </Card.Header>
                <Card.Body className='p-0'>
                    <ListGroup variant="flush">
                        {fields.map((field, index) => (
                            <Controller
                                key={field.id}
                                control={control}
                                name={`${CUSTOMER_DETAILS.DOCUMENTS}.${index}`}
                                render={() => (
                                    <ListGroup.Item className="mt-2 border rounded-3 p-3 px-4" key={index}>
                                        <FlexBox className="justify-content-between">
                                            <DocumentValidationIcon className="me-3" />
                                            <div>
                                                <div className="text-truncate">{(field as any).file?.name || field.name}</div>
                                                <small className="text-secondary">{getReadableFileSize((field as any).file?.size || field.size)}</small>
                                            </div>
                                            <div className="me-5">12/2/2024</div>
                                            <Cancel01Icon
                                                className="cursor-pointer"
                                                onClick={() => remove(index)}
                                            />
                                            {(field as any).file?.size === 0 && <ErrorMessage errorMessage="File is empty" />}
                                            {validateFileSize((field as any).file?.size || field.size)
                                                && <ErrorMessage errorMessage={`File size should be under ${MAX_FILE_SIZE}`} />}
                                        </FlexBox>
                                    </ListGroup.Item>
                                )}
                            />
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </FormGroup>
    );
};

export default DocumentList;