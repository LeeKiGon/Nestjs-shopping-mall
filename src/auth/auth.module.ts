import { UserRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true}),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),

        JwtModule.register({
            secret: process.env.JWTSECRET_KEY,
            signOptions: { expiresIn: '1y'},
        }),
        TypeOrmModule.forFeature([UserRepository])        
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
