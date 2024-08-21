import { createContext, useContext, useState, useEffect } from 'react';
import ProfileType from "src/features/profile/type";
import { useAuth } from "src/context/AuthContext";
import { supportApi } from "src/utils/api";
import { trackPromise } from 'react-promise-tracker';

const UserContext = createContext<ProfileType>(null!);
export const useUserContext = () => useContext(UserContext);

function UserContextProvider({ children }) {

    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState<ProfileType | null>();

    useEffect(() => {
        retrieveUserDetails();
    }, [user.emailAddress])

    const retrieveUserDetails = async () => {
        if (!user.emailAddress) return;
        await trackPromise(supportApi.get(`user/${user.emailAddress}`))
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