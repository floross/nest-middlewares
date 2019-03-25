import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {

    // DELETE THESE LINES IF MIDDLEWARE DOES NOT TAKE OPTIONS
    public static configure(secret: string | string[], opts?: cookieParser.CookieParseOptions) {
        this.secret = secret;
        if (opts) {
            this.options = opts;
        }
    }

    private static secret: string | string[];
    private static options: cookieParser.CookieParseOptions;

    public resolve(...args: any[]): RequestHandler {
        if (CookieParserMiddleware.secret) {
            return cookieParser(CookieParserMiddleware.secret, CookieParserMiddleware.options);
        } else {
            return cookieParser();
        }
    }

    public use(req, res, next) {
      return this.resolve()(req, res, next);
    }
}
