import NameSpace from '../NameSpace';

export const getLoadingState = state => state[NameSpace.DETAILS].isLoading;
export const getDetails = state => state[NameSpace.DETAILS].details;
