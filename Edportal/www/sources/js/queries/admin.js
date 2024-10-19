import { useMutation } from 'react-query'
import {
    searchLocation,
} from '../services/adminService'

export const useSearchLocation = (options = {}) =>
  useMutation((params = {}) => searchLocation(params), options)
