import { useParams } from "react-router-dom";
import { Settings } from "../profile/Settings"
import { useEffect, useState } from "react";
import { supportApi } from "src/utils/api";

const UserDetails = () => {
    const { emailAddress } = useParams();
    const [ user, setUser ] = useState();

    useEffect(() => {
        retrieveSelectedUser();
    }, [])

    const retrieveSelectedUser = async () => {
        await supportApi.get(`/user/${emailAddress}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }

    return (
        <Settings readonly readonlyUser={user}/>
    )

}

export default UserDetails;