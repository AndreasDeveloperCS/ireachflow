import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from 'src/app.controller';
import { EmailController } from 'src/controllers/email/email.controller';
import { AssetController } from 'src/controllers/asset/asset.controller';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { UsersController } from 'src/controllers/users/users.controller';
import { AppService } from 'src/app.service';
import { ParsingService } from 'src/services/parsing/parsing.service';
import { ParsingHelper } from 'src/helpers/parsing.helper';
import { EmailService } from 'src/services/email/email.service';
import { MongodbConfigService } from 'src/services/mongodb-config/mongodb-config.service';
import { EmailLoggingService } from 'src/services/email-logging/email-logging.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/users/users.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { Email, EmailSchema } from 'src/models/email.model';
import { User, UserSchema } from 'src/models/user.model';
import { Organization, OrganizationSchema } from 'src/models/organization.model';
import { join } from 'path';
import { ReportController } from './controllers/report/report.controller';
import { ReportService } from './services/report/report.service';
import configuration from './config/configuration';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expiresIn') },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      renderPath: 'assets',
      serveStaticOptions: { index: false },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
    }),
    // MongooseModule.forRoot(
    //      'mongodb+srv://evrykadis:Wo0dfjvGNPabn68A@evryka.fmq327h.mongodb.net/evryka'),

    //MongooseModule.forRoot('mongodb+srv://evrykadis:Wo0dfjvGNPabn68A@evryka.fmq327h.mongodb.net/evryka'),
    //MongooseModule.forRoot('mongodb+srv://devUser:ghzATDgDhDHcZvFP@dev.arg3n.mongodb.net/kingpin?retryWrites=true&w=majority'),

    MongooseModule.forFeature([
      {
        name: Email.name,
        schema: EmailSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
    ]),
    MulterModule.register({
      limits: { fieldSize: 1024 * 1024 * 1024 * 1024 },
    }),
  ],
  controllers: [
    AppController,
    EmailController,
    AssetController,
    ReportController,
    AuthController,
    UsersController,
  ],
  providers: [
    AppService,
    EmailService,
    ParsingService,
    ParsingHelper,
    EmailLoggingService,
    ReportService,
    AuthService,
    UsersService,
    JwtStrategy,
  ],
})
export class AppModule {}
