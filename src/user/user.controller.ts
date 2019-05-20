import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('find-all')
    @UseGuards(AuthGuard())
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        this.userService.create(createUserDto);
    }
}
