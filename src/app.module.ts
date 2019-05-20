import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .exclude(
            /* Posible rutas para exluir del Middleware */
            { path: 'user/create', method: RequestMethod.GET },
        )
        .forRoutes(UserController);

    /* Otros Middleware para rutas o controladores diferentes
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(UserController);*/
  }
}
