import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { PostRoutes } from '../modules/Post/post.route';
import { GalleryRoutes } from '../modules/Gallery/gallery.route';
import { BazarDorRoutes } from '../modules/BazarDor/bazar.route';
import { BizBazarRoutes } from '../modules/BizBazar/bizBazar.route';
import { CropRoutes } from '../modules/Crop/crop.route';
import { CropDetailsRoutes } from '../modules/CropDetails/cropDetails.route';
import { CompanyRoutes } from '../modules/Company/company.route';
import { ProductRoutes } from '../modules/product/product.route';

const router = Router();

const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/galleries',
    route: GalleryRoutes,
  },
  {
    path: '/bazar-dors',
    route: BazarDorRoutes,
  },
  {
    path: '/biz-bazars',
    route: BizBazarRoutes,
  },
  {
    path: '/crops',
    route: CropRoutes,
  },
  {
    path: '/crop-details',
    route: CropDetailsRoutes,
  },
  {
    path: '/companies',
    route: CompanyRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

// route loop
moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
