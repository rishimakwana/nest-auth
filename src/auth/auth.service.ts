import { User } from 'src/models/user.entity';
import { CreateUserDto, loginDto } from '../user/dto/create-user.dto';
import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';



@Injectable()
export class AuthService {
  async create(user: CreateUserDto) {
    try {
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new ConflictException("EMAIL_ALREADY_EXISTS");
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await User.create({ ...user, password: hashedPassword });
      const createdUser = await newUser.save();
      const updateData = { ...createdUser.toJSON() };
      delete updateData.password;

      return {
        statusCode: HttpStatus.OK,
        message: "CREATED_SUCCESSFULLY",
        data: updateData,
      };
    } catch (error) {
      throw error;
    }
  }
  async login(data: loginDto) {
    try {
      const { email, password } = data;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('NO_USER_DATA_FOUND');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('PASSWORD_DOES_NOT_MATCH');
      }
      
      const token = sign({ userId: user.id, email: user.email, }, process.env.JWTKEY, { expiresIn: '30d' });
      const userData = { ...user.dataValues };
      delete userData.password;
      return {
        message: ('LOGGED_IN_SUCCESSFUL'),
        statusCode: HttpStatus.OK,
        data: {
          user: userData,
          token,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
