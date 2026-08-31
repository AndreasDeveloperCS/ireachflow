import { Controller, Get, HttpCode, Param, Req, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { ParsingHelper } from 'src/helpers/parsing.helper';
import { EmailService } from 'src/services/email/email.service';
import { ParsingService } from 'src/services/parsing/parsing.service';
import { createReadStream } from 'fs';
import { NotFoundInterceptor } from 'src/interceptors/not-found-interceptor';
import { join } from 'path';
import { EmailLoggingService } from 'src/services/email-logging/email-logging.service';
const fs = require("fs");
const {resolve} = require('path');

@Controller('asset')
export class AssetController {
    assetPath = 'src/assets/logo.png';
    constructor(private emailLoggingService:EmailLoggingService) {
        console.log('Welcome to Assets Controller');
    }

    @Get()
    getAsset(@Res() res): any {

        if (!fs.existsSync(this.assetPath)){
            console.log('does not exist', this.assetPath);
        }
        if (fs.existsSync(this.assetPath)){
            console.log('does exist', this.assetPath);
        }
        const filePath = join(process.cwd(), this.assetPath);

        console.log('does exist', filePath);

        const file = createReadStream(filePath);

        //return new StreamableFile(file);

        res.sendFile(resolve(this.assetPath));

        //const assetPath = 'http://localhost:3000/api/assets/logo.png';;
    }


    @Get(':id')
    @HttpCode(200)
    //@UseInterceptors(NotFoundInterceptor)
    async getId(
      @Param('id') id: string,
      @Res() res
    ): Promise<any> {

      try {

        console.log('message ID', id);
        await this.emailLoggingService.messageIsOpened(id);
        res.header('Content-Type', 'image/png');
        res.sendFile(resolve(this.assetPath));

      } catch (error) {
        console.error(`Couldn't return message ID by searched ID`);
      }

    }

    async getFile(@Param('bucketname') bucketName: string, @Param('filename') fileName: string, @Res() response) {
        return; // (await this.appService.getFile(bucketName, fileName)).pipe(response);
    }

}