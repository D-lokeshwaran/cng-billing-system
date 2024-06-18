import { Card, Col, Row } from "react-bootstrap"
import Input from "src/components/form/Input";


const AccountDetails = () => {    
    return (
        <Card>
            <Card.Header>
                Account Details
            </Card.Header>
            <Card.Body>
                <Row className="gx-5">
                    <Input 
                        as={Col} 
                        field={{title: "Account number", state: "accountNumber"}}
                        validate={{
                            format: (v: any) => v.match(/^[a-zA-Z0-9]{11,16}$/) || "Must be 11 to 16 digits long"
                        }}
                        control={{ autoComplete: "off" }}
                    />
                    <Input 
                        as={Col} 
                        field={{title: "Contact number", state: "contactNumber"}}
                        validate={{
                            format: (v: any) => v.match(/^[0-9]{10}$/) || "Must be 10 digits long"
                        }}
                    />
                </Row>
                <Input 
                    field={{title: "Full name", state: "fullName"}}
                    control={{ placeholder: "firstname & lastname"}}
                />
            </Card.Body>
        </Card>
    )
}

export default AccountDetails;