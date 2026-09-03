import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
const MongoClient = require("mongodb").MongoClient;

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  public mongooseOptions(): MongooseModuleOptions {

    const options: MongooseModuleOptions = {
      uri: this.configService.get<string>('mongodbUri'),
      retryAttempts: 1,
    };

    return options;
  }

  constructor(private readonly configService: ConfigService) {}

  //You can retrun promise as well
  public createMongooseOptions(): MongooseModuleOptions {

      const connection = async () => {
        try {

          const client = new MongoClient(this.configService.get<string>('mongodbUri'), {
              useUnifiedTopology: true,
          });

          await client.connect();

          //const database = client.db("affmailer");
          //console.log(database);

          //const emails = await client.db("affmailer").collection('emails').find().toArray();
          //console.log(emails);

          await client.close();
        } catch(ex) {
          console.log('connection error', ex);
        }
      };
      connection();


    return this.mongooseOptions();
  
  }
}
