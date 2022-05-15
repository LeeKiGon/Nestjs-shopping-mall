import { JwtAuthGuard } from './jwt/jwt.guard';
import { LoginRequestDto } from './dto/login.request.dto';
import { successInterceptor } from './../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { Controller, Delete, Get, Patch, Post, UseFilters, HttpException, Param, ParseIntPipe, UseInterceptors, Body, Req, UseGuards } from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positivelnt.pipe';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';


@Controller('auth')
@UseInterceptors(successInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get() //회원 정보 조회
    getuser(@Req() req: Request) {
        console.log(req.user)
        return req.user;
    }

    @Get(':id') //회원 정보 조회
    getOneuser(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
        return 'Oneuser';
    }

    @Post() //회원 가입
    async signUp(@Body() body: CreateAuthDto): Promise<User> {
        return await this.authService.signUp(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('login') //로그인
    async login(@Body() data: LoginRequestDto) {
        return await this.authService.login(data);
    }

    @Patch(':id') //회원 정보 수정
    patchuser() {
        return 'patchuser';
    }

    @Delete(':id') //회원 삭제
    deleteuser() {
        return 'deleteuser';
    }
}

