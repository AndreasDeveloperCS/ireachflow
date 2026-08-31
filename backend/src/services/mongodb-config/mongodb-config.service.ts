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
      uri: 'mongodb+srv://affmailer:Q4Fl6oU5eSIjAD5O@affmailer.i4tul1v.mongodb.net/affmailer',
      //uri: 'mongodb+srv://devUser:ghzATDgDhDHcZvFP@dev.arg3n.mongodb.net/kingpin?retryWrites=true&w=majority',
      retryAttempts: 1,
      //dbName: 'affmailer',
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    };

    return options;
  }

  constructor(private readonly configService: ConfigService) {}

  //You can retrun promise as well
  public createMongooseOptions(): MongooseModuleOptions {

      const connection = async () => {
        try {

          const client = new MongoClient(
             'mongodb+srv://affmailer:Q4Fl6oU5eSIjAD5O@affmailer.i4tul1v.mongodb.net/affmailer', {
              //useNewUrlParser: true,
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
