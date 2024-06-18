import { Card, Col, Row } from "react-bootstrap"
import Input from "src/components/form/Input";


const AccountDetails = () => {    
    return (
        <Card>
            <Card.Header>
                Account Details
            </Card.Header>
            <Card.Body>
                <Input 
                    as={Col} 
                    field={{title: "Account number", state: "accountNumber"}}
                    validate={{
                        format: (v) => v.match(/^[a-zA-Z0-9]{11,16}$/) || "Must be 11 to 16 digits long"
                    }}
                    control={{ autoComplete: "off" }}
                />
                <Input 
                    field={{title: "Full name", state: "fullName"}}
                    control={{ placeholder: "firstname & lastname"}}
                />
            </Card.Body>
        </Card>
    )
}

export default AccountDetails;