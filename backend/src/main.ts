import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';
import { join } from 'path';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import { exposedHeaders, headers, methods, whiteList } from './config';

const https = require('https');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
import { renderFile } from 'ejs'

async function bootstrap() {

  // const httpsOptions: HttpsOptions = {
  //   key: fs.readFileSync(path?.join(__dirname, '../client_certs/key.pem')),
  //   cert: fs.readFileSync(path?.join(__dirname, '../client_certs/cert.pem')),
  // };

  const options: NestApplicationOptions = {
    cors: true,
    bodyParser: true,
    //httpsOptions: httpsOptions,
  };

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    options
  );

  app.setGlobalPrefix('/api');

  app.enableCors({
    allowedHeaders: headers,
    origin: whiteList,
    optionsSuccessStatus: 200,
    exposedHeaders: exposedHeaders,
    methods: methods,
    credentials: true,
  });

  // app.engine('html', renderFile).
  //     setBaseViewsDir(join(__dirname, '../views')).
  //     useStaticAssets(join(__dirname, '../views/public'), {
  //       index: false,
  //       redirect: false
  //     });

  const server = await app.listen(3000);
  server.setTimeout(300000);
}

bootstrap();
