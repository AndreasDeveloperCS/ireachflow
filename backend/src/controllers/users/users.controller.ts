import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayload } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/users/users.service';
import { toSafeUser } from 'src/models/user.model';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async list(@CurrentUser() currentUser: JwtPayload) {
    const users = await this.usersService.findByOrganization(currentUser.organizationId);
    return users.map(toSafeUser);
  }
}
