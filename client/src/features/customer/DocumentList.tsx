import React, { useRef } from 'react';
import { Card, FormControl, FormGroup, FormLabel, ListGroup } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Cancel01Icon, DocumentValidationIcon, Upload02Icon, AlertCircleIcon } from "hugeicons-react";
import { getReadableFileSize } from "src/utils/common";
import { Customer } from './customerSlice';

const DocumentList = () => {

    const { control, formState: { errors } } = useFormContext<Customer>();
    const { fields, append, remove } = useFieldArray<Customer>({
        control,
        name: "documents",
        keyName: "documentId"
    });

    const hiddenFileInput = useRef<HTMLInputElement>(null!);

    const onAddDocument = () => {
        hiddenFileInput.current.click();
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files || []);
        if (uploadedFiles.length > 0) {
            const wrappedFiles = uploadedFiles.map(file => ({ file }));
            append(wrappedFiles as any);
        }

        hiddenFileInput.current.value = "";
    };

    return (
        <FormGroup>
            <FormLabel>Documents</FormLabel>
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
                                key={field.documentId}
                                control={control}
                                name={`documents.${index}`}
                                render={() => (
                                    <ListGroup.Item className="mt-2 border rounded-3 p-3 px-4">
                                        <FlexBox>
                                            <DocumentValidationIcon className="me-3" />
                                            <div className="text-truncate">{field.name || (field as any).file?.name}</div>
                                            <small className="text-secondary">{getReadableFileSize(field.size ||(field as any).file?.size)}</small>
                                            <div className="me-5">12/2/2024</div>
                                            <Cancel01Icon
                                                className="cursor-pointer"
                                                onClick={() => remove(index)}
                                            />
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
