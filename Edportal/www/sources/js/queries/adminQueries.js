import { useMutation } from 'react-query'
import {
    searchLocation,
    addLocation,
    updateLocation,
    deleteLocation
} from '../services/adminService'

export const useSearchLocation = (options = {}) =>
  useMutation((params = {}) => searchLocation(params), options)

export const useAddLocation = (options = {}) =>
  useMutation((params = {}) => addLocation(params), options)

export const useUpdateLocation = (options = {}) =>
  useMutation((params = {}) => updateLocation(params), options)

export const useDeleteLocation = (options = {}) =>
  useMutation((locationId) => deleteLocation(locationId), options);