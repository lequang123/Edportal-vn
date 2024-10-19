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