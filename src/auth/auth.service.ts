import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user: User = await this.userService.getByUsername(username);
        console.log(user.password)
        if (user && user.username === username && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async generateJwtToken(user: User): Promise<string> {
        const dto: UserDto = this.userService.toDto(user)
        const payload = { user: dto };
        return await this.jwtService.signAsync(payload);
    }
}
