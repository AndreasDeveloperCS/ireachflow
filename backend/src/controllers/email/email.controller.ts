import {
  Body,
  CallHandler,
  Controller,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ParsingHelper } from 'src/helpers/parsing.helper';
import { ParsingService } from 'src/services/parsing/parsing.service';
import { EmailInfo } from 'src/models/email.model';
import { EmailService } from 'src/services/email/email.service';
var fs = require('fs');
var path = require("path");

@Controller('email')
export class EmailController {
  constructor(
    private parsingHelper: ParsingHelper,
    private emailService: EmailService,
    private parsingService: ParsingService,
  ) {
    console.log('Welcome to EmailController');
  }

  @Post('send')
  @UseInterceptors(
    // FileFieldsInterceptor([
    //   { name: 'targetEmailsList', maxCount: 1 },
    //   { name: 'files', maxCount: 100 },
    // ]),
    //  FileInterceptor('targetEmailsList', {
    //       storage: diskStorage({
    //       destination: '../../uploads/',
    //         filename: (_req, file, cb) => {
    //           console.log('targetEmailsList INTERCEPTOR', file);
    //             const dt = new Date(Date.now());
    //             const dtStamp =`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}-${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}-${dt.getMilliseconds()}`
    //             const rootFolder = path.join(`..`, `..`, `uploads`, dtStamp);
    //             if (!fs.existsSync(rootFolder)){
    //               fs.mkdirSync(rootFolder);
    //             }
    //             const subfolderName = 'target';
    //             const realSubPath = path.join(rootFolder, subfolderName);
    //             if (!fs.existsSync(realSubPath)){
    //               fs.mkdirSync(realSubPath);
    //             }
    //             const subFolderShort =  path.join(dtStamp, subfolderName);
    //             const fullAlternativeFileName = path.join(subFolderShort, `target-${dtStamp}-${path.parse(file.originalname)?.name}${extname(file.originalname)}`);
    //             console.log('fullAlternativeFileName', fullAlternativeFileName);
    //             cb(null, fullAlternativeFileName);
    //         }
    //       })
    //   }),
    FilesInterceptor('files[]', 100, {
      storage: diskStorage({
        destination: '../../uploads/',
        filename: (req, file, cb) => {
          console.log('files');
          const dt = new Date(Date.now());
          const dtStamp = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}-${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}-${dt.getMilliseconds()}`

          const rootFolder = path.join(`..`, `..`, `uploads`, dtStamp);
          if (!fs.existsSync(rootFolder)){
            fs.mkdirSync(rootFolder);
          }
          const subfolderName = 'files';
          const realSubPath = path.join(rootFolder, subfolderName);

          if (!fs.existsSync(realSubPath)){
            fs.mkdirSync(realSubPath);
          }
          const subFolderShort = path.join(dtStamp, subfolderName);
          const fullAlternativeFileName = path.join(
            subFolderShort,
            `${subfolderName}-${dtStamp}-${
              path.parse(file.originalname)?.name
            }${extname(file.originalname)}`,
          );

          console.log('attachments filename', fullAlternativeFileName);
          cb(null, fullAlternativeFileName);
          //cb(null, fullAlternativeFileName);
        },
      }),
    }),
  )
  async upload(
    //  @UploadedFile('file', new ParseFilePipeBuilder()
    //  .addFileTypeValidator({
    //    fileType: '(csv|txt|application/vnd.ms-excel)',
    //    //fileType: '(csv|txt)',
    //  })
    //  .addMaxSizeValidator({
    //    maxSize: 1024 * 1024 * 1024 * 128
    //  })
    //  .build({
    //    //errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    //  })
    //  ) targetEmailsList: Express.Multer.File,
    @UploadedFiles(
    //    new ParseFilePipeBuilder()
    //  // .addFileTypeValidator({
    //  //   fileType: '(csv|txt|application/vnd.ms-excel)',
    //  //   //fileType: '(csv|txt)',
    //  // })
    //  .addMaxSizeValidator({
    //    maxSize: 1024 * 1024 * 1024 * 128
    //  })
    //  .build({
    //    //errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    //  })
    ) files: Array<Express.Multer.File>,
    @Body() body: Body,
    @Req() req: Request,
    @Res() res: Response,
    context: ExecutionContext,
    next: CallHandler) {
      const date = this.parsingHelper.getDate(new Date(Date.now()));

    if(files.length > 0) {
      const targetEmailsList = files[0];
      const attachments: Array<Express.Multer.File> = [];
      const emailInfo: EmailInfo = JSON.parse(body["info"]);
      const parsedTargetEmailList = this.parsingService.getParsedTargetEmailList(emailInfo, targetEmailsList, files.slice(1, files.length));
    }
    try {
    } catch (error: any) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {

    //   const candidateInfo = JSON.parse(body.info);
    //   const user = await this.userService.findByEmail(candidateInfo.email);
    //   const usrId = await this.checkAndCreateNewUser(user, candidateInfo);

    //   const savedCvResult = await this.cvService.saveCvInfoAsync(candidateInfo, file, _id, usrId);

    //   this.emailService.sendAttachment(file, candidateInfo);

    //   const cvDeliveryConfirmationEmail = this.emailService.sentCvDeliveryConfirmationEmail(body.info.email);

    //   return res.status(200).json({
    //     requestBody: req.body,
    //     result: '1',
    //     marker: '1'
    //   });
      // next.handle().pipe(map((data) => ({
      //   statusCode: 200,
      //   message: 'Message has been successfully sent',
      //   data: {
      //       result: data.result,
      //       meta: {} // if this is supposed to be the actual return then replace {} with data.result
      //     }
      // })));

    } catch (error) {
      console.error(`Could not send email`, error);
      const response = {
        status: 'ERROR',
        message: 'Could not send email',
        error: error,
        input: req.body,
        marker: '1',
      };

      // next.handle().pipe(map((data) => ({
      //   statusCode: 200,
      //   message: 'Message has been successfully sent',
      //   data: response
      // })));;
    }
  }
}
