import { template } from 'lodash';
import Urls from '../Urls';
import middlewareService from './middlewareService';

export function searchLocation(params = {}) {
  return new middlewareService({
    endpoint: Urls.ADMIN_LOCATION_SEARCH,
  }).get({
    ...params,
  });
}


export function addLocation(params = {}) {
  return new middlewareService({
    endpoint: Urls.ADMIN_LOCATION_CREATE,
  }).post({
    ...params,
  });
}

export function updateLocation(params = {}) {
  return new middlewareService({
    endpoint: Urls.ADMIN_LOCATION_Update,
  }).put({
    ...params,
  });
}


export function deleteLocation(params = {}) {
  debugger
  return new middlewareService({
    endpoint: Urls.ADMIN_LOCATION_DELETE,
  }).delete({
    ...params,
  });
}
