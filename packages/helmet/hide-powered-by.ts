import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import * as helmet from 'helmet';

@Injectable()
export class HelmetHidePoweredByMiddleware implements NestMiddleware {

    public static configure(opts: helmet.IHelmetHidePoweredByConfiguration) {
        this.options = opts;
    }

    private static options: helmet.IHelmetHidePoweredByConfiguration;

    public resolve(...args: any[]): RequestHandler {
        if (HelmetHidePoweredByMiddleware.options) {
            return helmet.hidePoweredBy(HelmetHidePoweredByMiddleware.options);
        } else {
            return helmet.hidePoweredBy();
        }
    }

    public use(req, res, next) {
      return this.resolve()(req, res, next);
    }
}
