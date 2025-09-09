import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Wraps the useDispatch and it is type safe
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Wraps the useSelector and knows the shape the RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
