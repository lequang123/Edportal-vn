import { useMutation } from 'react-query'
import {
  searchOrder,
  updateOrderInfo,
  downloadExportExcel,
} from '../services/orderService'

export const useSearchOrder = (options = {}) =>
  useMutation((params = {}) => searchOrder(params), options)

export const useUpdateOrderInfo = (options = {}) =>
  useMutation((params) => updateOrderInfo(params), options)

export const useDownloadExportExcelOrder = (options = {}) =>
  useMutation((params) => downloadExportExcel(params), options)
