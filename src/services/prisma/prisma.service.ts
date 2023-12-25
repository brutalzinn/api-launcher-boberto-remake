import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  transactions : Array<Prisma.PrismaPromise<any>>  =[]
  $queryRaw: any;
  async onModuleInit() {
    await this.$connect();
  }

  add(item: Prisma.PrismaPromise<any>){
    this.transactions.push(item)
  }
  
  async commit(): Promise<boolean>{
    try{
      await this.$transaction(this.transactions)
      this.transactions = []
      return true
    }catch(exception){
      return false
    }
  }

   abort(){
    this.transactions = []
  }
}