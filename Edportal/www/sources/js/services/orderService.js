import { template } from 'lodash';
import Urls from '../Urls';
import middlewareService from './middlewareService';

export function searchOrder(params = {}) {
  return new middlewareService({
    endpoint: Urls.ORDER_LIST,
  }).post({
    ...params,
  });
}

export function updateOrderInfo(params = {}) {
  const url = template(Urls.UPDATE_ORDER_INFO);
  return new middlewareService({
    endpoint: url({ id: params.orderId }),
  }).put({ ...params });
}

export function downloadExportExcel(params = {}) {
  return new middlewareService({
    endpoint: Urls.EXPORT_EXCEL,
    axiosConfig: { responseType: 'blob' },
  }).post({ ...params });
}
