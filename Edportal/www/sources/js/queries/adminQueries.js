import { useMutation } from 'react-query'
import {
    searchLocation,
    addLocation,
    updateLocation,
    deleteLocation,
    register,
    login
} from '../services/adminService'

export const useSearchLocation = (options = {}) =>
  useMutation((params = {}) => searchLocation(params), options)

export const useAddLocation = (options = {}) =>
  useMutation((params = {}) => addLocation(params), options)

export const useUpdateLocation = (options = {}) =>
  useMutation((params = {}) => updateLocation(params), options)

export const useDeleteLocation = (options = {}) =>
  useMutation((locationId) => deleteLocation(locationId), options);

export const useRegister = (options = {}) =>
  useMutation((params = {}) => register(params), options)

export const useLogin = (options = {}) =>
  useMutation((params = {}) => login(params), options)