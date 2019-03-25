import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import * as helmet from 'helmet';

@Injectable()
export class HelmetDnsPrefetchControlMiddleware implements NestMiddleware {

    public static configure(opts: helmet.IHelmetDnsPrefetchControlConfiguration) {
        this.options = opts;
    }

    private static options: helmet.IHelmetDnsPrefetchControlConfiguration;

    public resolve(...args: any[]): RequestHandler {
        if (HelmetDnsPrefetchControlMiddleware.options) {
            return helmet.dnsPrefetchControl(HelmetDnsPrefetchControlMiddleware.options);
        } else {
            return helmet.dnsPrefetchControl();
        }
    }

    public use(req, res, next) {
      return this.resolve()(req, res, next);
    }
}
