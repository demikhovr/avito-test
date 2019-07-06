import NameSpace from '../NameSpace';

export const getLoadingState = state => state[NameSpace.SELLERS].isLoading;
export const getSeller = state => state[NameSpace.SELLERS].seller;
