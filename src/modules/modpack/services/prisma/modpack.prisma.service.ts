import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../services/prisma/prisma.service';
import { ModPackClient, Prisma, PrismaPromise } from '@prisma/client';

@Injectable()
export class ModpackPrismaService {
  
    constructor(private prisma: PrismaService){}

     findBy<S extends Prisma.ModPackClientInclude>(params: { where: Prisma.ModPackClientWhereInput, include?: Prisma.Subset<S,Prisma.ModPackClientInclude>}) : PrismaPromise<ModPackClient | undefined> {
        const { where, include } = params;
        return this.prisma.modPackClient.findFirst({
            where: where,
            include: include
        });
      }
      
       update(params: {
        where: Prisma.ModPackClientWhereUniqueInput;
        data: Prisma.ModPackClientUpdateInput;
      }){
        const { where, data } = params;
        return this.prisma.modPackClient.update({
          data,
          where,
        });
      }
      
       upsert<S extends Prisma.ModPackClientInclude>(params: {
        create: Prisma.ModPackClientCreateInput
        where: Prisma.ModPackClientWhereUniqueInput
        update: Prisma.ModPackClientUpdateInput,
        include?: Prisma.Subset<S, Prisma.ModPackClientInclude>
      }){
        const { where, create, update, include } = params;
        return this.prisma.modPackClient.upsert({
          create,
          update,
          where,
          include
        });
      }

       create(params: {data: Prisma.ModPackClientCreateInput}) : PrismaPromise<ModPackClient | undefined> {
        const { data } = params;
        return this.prisma.modPackClient.create({
          data:data
        });
      }
      
       list<S extends Prisma.ModPackClientInclude>(params?: {where?: Prisma.ModPackClientWhereInput, include?: Prisma.Subset<S, Prisma.ModPackClientInclude>}) 
      {
        const { where, include } = params;
        return this.prisma.modPackClient.findMany({
          where: where,
          include: include
      });
      }  
    
         delete(params: {where: Prisma.ModPackClientWhereUniqueInput}): PrismaPromise<ModPackClient> {
        const { where } = params;
        return this.prisma.modPackClient.delete({
          where: where
        })
      }
}
