import { Card, Col, Row } from "react-bootstrap"
import Input from "src/components/form/Input"

const ContactDetails = () => {

    return (
        <Card>
            <Card.Header>
                Contact Details
            </Card.Header>
            <Card.Body>
                 <Input 
                    field={{title: "Contact number", state: "contactNumber"}}
                    validate={{
                        format: (v) => v.match(/^[0-9]{10}$/) || "Must be 10 digits long"
                    }}
                />
                <Input field={{ title: "Address line 1", state: "addressLine1"}}/>
                <Input 
                    required={false}
                    field={{ title: "Address line 2", state: "addressLine2"}}
                />
                <Row>
                    <Input
                        as={Col} 
                        field={{ title: "pincode", state: "pincode"}}
                        validate={{
                            pinCodeFormat: (v) => v.match(/^[0-9]{6}$/) || "Must be 6 digits long"
                        }}
                    />
                    <Input
                        as={Col} 
                        field={{ title: "city", state: "city"}}
                    />
                </Row>

            </Card.Body>
        </Card>
    )

}

export default ContactDetails;