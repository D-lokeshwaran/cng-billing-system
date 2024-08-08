export default  {
    emailAddress: string,
    avatar: string,
    profile: BasicDetails,
    accountSettings: AccountSettings
}

export type BasicDetails = {
    fullName: string,
    phoneNumber: number,
    status: string,
    aboutMe: string
}

export type AccountSettings = {
    whoCanView: string,
    communicateViaEmail: boolean,
    communicateViaPhoneNumber: boolean,
    allowDeleteLogs: boolean,
    showAboutMe: boolean
}