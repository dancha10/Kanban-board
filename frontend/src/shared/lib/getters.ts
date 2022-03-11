export const getBIDfromPathUrl = (): string => window.location.pathname.split('/b/')[1]
export const getColumnID = async (): Promise<string> => sessionStorage.getItem('columnID')!
