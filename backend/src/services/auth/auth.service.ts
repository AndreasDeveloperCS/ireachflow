import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from 'src/models/organization.model';
import { UserDocument, UserRole } from 'src/models/user.model';
import { UsersService } from 'src/services/users/users.service';
import { RegisterDto } from 'src/controllers/auth/dto/register.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

const SALT_ROUNDS = 10;

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Organization.name) private organizationModel: Model<OrganizationDocument>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<UserDocument> {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const organization = await this.organizationModel.create({
      name: dto.organizationName.trim(),
      ownerId: null,
    });

    let user: UserDocument | null = null;

    try {
      const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
      user = await this.usersService.create({
        email,
        passwordHash,
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        role: UserRole.OWNER,
        organizationId: organization._id,
      });

      organization.ownerId = user._id;
      await organization.save();

      return user;
    } catch (error) {
      const cleanup: Promise<unknown>[] = [
        Promise.resolve(this.organizationModel.deleteOne({ _id: organization._id })),
      ];
      if (user?._id) {
        cleanup.push(Promise.resolve(this.usersService.deleteById(user._id.toString())));
      }
      await Promise.allSettled(cleanup);

      if (isDuplicateKeyError(error)) {
        throw new ConflictException('An account with this email already exists');
      }

      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  issueToken(user: UserDocument): string {
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: user.organizationId.toString(),
    };
    return this.jwtService.sign(payload);
  }
}
