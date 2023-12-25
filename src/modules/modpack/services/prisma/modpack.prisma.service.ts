import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../services/prisma/prisma.service';
import { ModPack, Prisma, PrismaPromise } from '@prisma/client';

@Injectable()
export class ModpackPrismaService {
  
    constructor(private prisma: PrismaService){}

     findBy<S extends Prisma.ModPackInclude>(params: { where: Prisma.ModPackWhereInput, include?: Prisma.Subset<S,Prisma.ModPackInclude>}) : PrismaPromise<ModPack | undefined> {
        const { where, include } = params;
        return this.prisma.modPack.findFirst({
            where: where,
            include: include
        });
      }
      
       update(params: {
        where: Prisma.ModPackWhereUniqueInput;
        data: Prisma.ModPackUpdateInput;
      }){
        const { where, data } = params;
        return this.prisma.modPack.update({
          data,
          where,
        });
      }
      
       upsert<S extends Prisma.ModPackInclude>(params: {
        create: Prisma.ModPackCreateInput
        where: Prisma.ModPackWhereUniqueInput
        update: Prisma.ModPackUpdateInput,
        include?: Prisma.Subset<S, Prisma.ModPackInclude>
      }){
        const { where, create, update, include } = params;
        return this.prisma.modPack.upsert({
          create,
          update,
          where,
          include
        });
      }

       create(params: {data: Prisma.ModPackCreateInput}) : PrismaPromise<ModPack | undefined> {
        const { data } = params;
        return this.prisma.modPack.create({
          data:data
        });
      }
      
       list<S extends Prisma.ModPackInclude>(params?: {where?: Prisma.ModPackWhereInput, include?: Prisma.Subset<S, Prisma.ModPackInclude>}) 
      {
        const { where, include } = params;
        return this.prisma.modPack.findMany({
          where: where,
          include: include
      });
      }  
    
         delete(params: {where: Prisma.ModPackWhereUniqueInput}): PrismaPromise<ModPack> {
        const { where } = params;
        return this.prisma.modPack.delete({
          where: where
        })
      }
}
