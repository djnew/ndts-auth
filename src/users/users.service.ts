import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userConstants } from 'src/users/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: CreateUserDto): Promise<UserDocument> {
    const { email, password, firstName } = userData;
    const hash = bcrypt.hashSync(password, userConstants.passwordSalt);
    return await this.userModel.create({
      email,
      firstName,
      passwordHash: hash,
    });
  }

  async findOne(username: string): Promise<UserDocument> {
    return await this.userModel
      .findOne({ name: username })
      .select('-__v')
      .exec();
  }
}
