import { Body, Controller, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
    }
}