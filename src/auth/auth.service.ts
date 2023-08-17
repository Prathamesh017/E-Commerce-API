import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs"


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  public async loginUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (!user) {
      throw new HttpException("Invalid Credentials", 400)
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new HttpException("Incorrect Password", 400)
    }
    return user;
  }

  public async registerUser(name: string, email: string, password: string): Promise<User> {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (isUserExist) {
      throw new ConflictException("User Already Exists");
    }

    const gensalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, gensalt)
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

      }
    })


    return user;
  }
}
