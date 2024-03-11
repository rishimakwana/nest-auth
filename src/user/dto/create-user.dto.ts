// export class CreateUserDto {}
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @MinLength(6)
    readonly password: string;

    role: string
    templeId: any

}

export class loginDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

}
