import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, RootStateType } from '../store/store'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
