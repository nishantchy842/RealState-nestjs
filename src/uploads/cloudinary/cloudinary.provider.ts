import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from './contants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dgil1ngmu',
      api_key: '612126816415455',
      api_secret: 'tzrRFmClhyG7foKfQAj06qWWh3E',
    });
  },
};
