import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { EmailController } from 'src/controllers/email/email.controller';
import { AssetController } from 'src/controllers/asset/asset.controller';
import { AppService } from 'src/app.service';
import { ParsingService } from 'src/services/parsing/parsing.service';
import { ParsingHelper } from 'src/helpers/parsing.helper';
import { EmailService } from 'src/services/email/email.service';
import { MongodbConfigService } from 'src/services/mongodb-config/mongodb-config.service';
import { EmailLoggingService } from 'src/services/email-logging/email-logging.service';
import { Email, EmailSchema } from 'src/models/email.model';
import { join } from 'path';
import { ReportController } from './controllers/report/report.controller';
import { ReportService } from './services/report/report.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://affmailer:Q4Fl6oU5eSIjAD5O@affmailer.i4tul1v.mongodb.net/affmailer',
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      entities: [Email],
    }),
    TypeOrmModule.forFeature([Email]),
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
      // {
      //   name: InfoCv.name, schema: InfoCvSchema
      // }
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
  ],
  providers: [
    AppService,
    EmailService,
    ParsingService,
    ParsingHelper,
    EmailLoggingService,
    ReportService,
  ],
})
export class AppModule {}
