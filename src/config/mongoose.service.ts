import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { log, error } from "console";
import { Connection } from "mongoose";

@Injectable()
export class MongooseService {
  constructor(@InjectConnection() private readonly connection: Connection){
    this.connect();
  }

  connect() {
    this.connection.on('connected', () => {
      console.log('Conexão estabelecida com o MongoDB');
    });

    this.connection.on('error', (err) => {
      console.error('Erro de conexão com o MongoDB:', err);
    });

    this.connection.on('disconnected', () => {
      console.log('Conexão com o MongoDB desconectada');
    });

    this.connection.on('reconnected', () => {
      console.log('Reconexão com o MongoDB estabelecida');
    });
  }
}