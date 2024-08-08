import { createContext, useContext, useState, useEffect } from 'react';
import ProfileType from "src/features/profile/type";
import { supportApi } from "src/utils/api";

const UserContext = createContext<ProfileType>(null!);
export const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }) {

    const [userDetails, setUserDetails] = useState<ProfileType | null>();

    useEffect(() => {
        retrieveUserDetails();
    }, [])

    const retrieveUserDetails = async () => {
        await supportApi.get(`user/johnDoe02@gmail.com`)
            .then(result => {
                const userDetails = result.data;
                setUserDetails(userDetails);
            })
            .catch(err => console.log("Failed to get profile: ", err));
    }

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;