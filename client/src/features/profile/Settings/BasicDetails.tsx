import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import AvatarUploadInput from "./AvatarUploadInput";
import { useAuth } from "src/context/AuthContext";
import { useUserContext } from "src/context/UserContext";
import { supportApi } from "src/utils/api";

interface BasicDetailsType {
    emailAddress: string,
    avatar: string,
    fullName: string,
    phoneNumber: number,
    status: string,
    aboutMe: string
}

const BasicDetails = () => {

    const { user } = useAuth();
    const { userDetails, setUserDetails } = useUserContext();
    const basicDetails = {
        emailAddress: userDetails?.emailAddress,
        avatar: userDetails?.avatar,
        ...userDetails?.profile
    }

    const handleEditDetails: SubmitHandler<BasicDetailsType> = async (data, event) => {
        try {
            const { avatar, fullName, phoneNumber, status, aboutMe } = data;
            var profileData = new FormData();
            profileData.append("avatar", avatar);
            profileData.append("fullName", fullName);
            profileData.append("phoneNumber", phoneNumber);
            profileData.append("status", status);
            profileData.append("aboutMe", aboutMe);

            const result = await supportApi({
                url: `user/johnDoe02@gmail.com/profile`,
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: profileData
            });
            setUserDetails(result.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Card>
            <Card.Header><h3 className="mb-0">Details</h3></Card.Header>
            <HookForm onSubmit={handleEditDetails} defaultValues={basicDetails}>
                <Card.Body>
                    <AvatarUploadInput/>
                    <Input field={{state: "emailAddress", title: "Email Address"}} control={{disabled: false}}/>
                    <Input field={{state: "fullName", title: "Full Name"}}/>
                    <Input field={{state: "phoneNumber", title: "Phone Number"}}/>
                    <Input
                        field={{state: "status", title: "Status", type: "select"}}
                        control={{defaultValue: "onDuty"}}
                        required={false}
                    >
                        <option value="leave">Leave</option>
                        <option value="onDuty">On Duty</option>
                        <option value="offDuty">Off Duty</option>
                    </Input>
                    <Input
                        field={{state: "aboutMe", title: "About Me"}}
                        required={false}
                        control={{
                            as: "textarea",
                            placeholder: "Describe about you...",
                            style: { fontSize: "14px"},
                            rows: 5
                        }}
                    />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                    <Button size="sm" variant="secondary" type="reset" className="me-3">reset</Button>
                    <Button size="sm" type="submit">Update</Button>
                </Card.Footer>
            </HookForm>
        </Card>
    )
}

export default BasicDetails;