import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/rootReducer';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;