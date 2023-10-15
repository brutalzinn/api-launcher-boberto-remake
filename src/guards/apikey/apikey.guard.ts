import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApikeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];
    if(apiKey != process.env.API_KEY){
      throw new UnauthorizedException()
    }
    return true;
  }
}
