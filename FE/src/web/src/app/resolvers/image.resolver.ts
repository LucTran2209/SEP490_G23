import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { IWrappercontentImage, shape_background } from '../configs/image_Register.config';

export const imageResolver: ResolveFn<IWrappercontentImage> = (route, state) => {

  let shape_image = shape_background[state.url];
  return of(shape_image);
};
