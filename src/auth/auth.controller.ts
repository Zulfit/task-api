import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() authDto: AuthDto) {
        return await this.authService.register(authDto);
    }

    @Post('login')
    async login(@Body() authDto: AuthDto) {
        return await this.authService.login(authDto);
    }
}