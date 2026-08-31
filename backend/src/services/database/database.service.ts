import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { mongoDBCloudConnectionString } from 'src/config';
import { Service } from 'typedi';
const mongoose = require('mongoose');

@Service()
@Injectable()
export class DatabaseService {
    public connection: Connection;

    constructor() {

        try {

            console.log('DatabaseService constructor');

            mongoose.set('strictQuery', true);

            mongoose.connect(mongoDBCloudConnectionString, {
                connectTimeoutMS: 3000,
                useUnifiedTopology: true,
                useNewUrlParser: true,
                keepAlive: true,
            });

            this.connection = mongoose.connection;
            mongoose.set('strictQuery', true);


            this.dbInitialize();

        } catch (er) {
            console.log(er);
        }
    }
    
    dbInitialize() {

        this.connection.on('connected', () => {
            console.log('connected');
        });

        this.connection.on('disconnected', () => {
            console.log('disconnected');
        });

        this.connection.on('error', (er) => {
            console.error.bind(console, 'connection error:');    
        });

        // const postionsSchema = new Schema({}, { timestamps: true });
        // const positions = mongoose.model('Positions', postionsSchema);
    }

    
}
