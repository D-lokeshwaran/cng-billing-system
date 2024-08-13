import { useFormContext } from "react-hook-form"
import { FormGroup, FormLabel } from "react-bootstrap";
import { Camera01Icon } from "hugeicons-react";
import FlexBox from "src/components/common/FlexBox";
import { useRef, useState, useEffect } from "react";
import { InputProps } from './type';

const AvatarUploadInput = ({...props}) => {
    const { control, setValue, getValues } = useFormContext();
    const storedAvatar = getValues("avatar");
    const imageRef = useRef();
    const [ avatar, setAvatarPreview ] = useState();

    useEffect(() => {
        // only store when encoded
        if (typeof storedAvatar === "string") {
            setAvatarPreview(storedAvatar);
        }
    }, [storedAvatar])

    const handleUpload = () => {
        imageRef.current.click();
    }

    const handlePreview = (event) => {
        const avatar = event.target.files[0];
        setValue("avatar", avatar);
        const blobURL = URL.createObjectURL(avatar);
        setAvatarPreview(blobURL);
    }

    return (
        <FormGroup {...props} className="mb-3">
            <FormLabel className="mb-1">Avatar</FormLabel>
            <FlexBox
                style={{height: "7rem", width: "7rem"}}
                className="border rounded position-relative"
                justify="center"
                alignItems="end"
            >
                <img
                    src={avatar}
                    height="100%"
                    className="overflow-hidden rounded-2"
                />
                <input
                    type="file"
                    name="avatar"
                    hidden
                    ref={imageRef}
                    {...props.control}
                    onChange={handlePreview}
                />
                <FlexBox
                    className="position-absolute w-100 py-2 cursor-pointer text-white rounded"
                    justify="center"
                    style={{background: "linear-gradient(0deg, rgb(0 0 0 / 77%), transparent)"}}
                    onClick={handleUpload}
                >
                    <Camera01Icon/>
                </FlexBox>
            </FlexBox>
        </FormGroup>
    )

}

export default AvatarUploadInput;