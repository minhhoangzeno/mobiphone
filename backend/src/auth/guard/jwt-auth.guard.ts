import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
const jwt = require('jsonwebtoken')

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private userService: UserService) {
        super()
    }

    canActivate(context: ExecutionContext) {

        const http = context.switchToHttp();
        const { headers } = http.getRequest();
        const response = http.getResponse();
        response.setHeader('Cache-Control', 'no-store');

        if (!headers.authorization) {
            return false
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        //  console.log("aaa")
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        // console.log(user)
        // if(user._doc.roles.includes('admin')){
        //     console.log("user",user)
        //     throw new UnauthorizedException();
        // }
        return user;
    }

}