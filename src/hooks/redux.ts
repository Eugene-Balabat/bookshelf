import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatchType, RootStateType } from '../store/store'
import { useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
