import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../services/prisma/prisma.service';
import { ModpackClientMetadata, Prisma, PrismaPromise } from '@prisma/client';

@Injectable()
export class ModpackClientMetadataPrismaService {
  
    constructor(private prisma: PrismaService){}

     findBy<S extends Prisma.ModpackClientMetadataInclude>(params: { where: Prisma.ModpackClientMetadataWhereInput, include?: Prisma.Subset<S,Prisma.ModpackClientMetadataInclude>}) : PrismaPromise<ModpackClientMetadata | undefined> {
        const { where, include } = params;
        return this.prisma.modpackClientMetadata.findFirst({
            where: where,
            include: include
        });
      }
      
       update(params: {
        where: Prisma.ModpackClientMetadataWhereUniqueInput;
        data: Prisma.ModpackClientMetadataUpdateInput;
      }){
        const { where, data } = params;
        return this.prisma.modpackClientMetadata.update({
          data,
          where,
        });
      }
      
       upsert<S extends Prisma.ModpackClientMetadataInclude>(params: {
        create: Prisma.ModpackClientMetadataCreateInput
        where: Prisma.ModpackClientMetadataWhereUniqueInput
        update: Prisma.ModpackClientMetadataUpdateInput,
        include?: Prisma.Subset<S, Prisma.ModpackClientMetadataInclude>
      }){
        const { where, create, update, include } = params;
        return this.prisma.modpackClientMetadata.upsert({
          create,
          update,
          where,
          include
        });
      }

       create(params: {data: Prisma.ModpackClientMetadataCreateInput}) : PrismaPromise<ModpackClientMetadata | undefined> {
        const { data } = params;
        return this.prisma.modpackClientMetadata.create({
          data:data
        });
      }
      
       list<S extends Prisma.ModpackClientMetadataInclude>(params?: {where?: Prisma.ModpackClientMetadataWhereInput, include?: Prisma.Subset<S, Prisma.ModpackClientMetadataInclude>}) 
      {
        const { where, include } = params;
        return this.prisma.modpackClientMetadata.findMany({
          where: where,
          include: include
      });
      }  
    
         delete(params: {where: Prisma.ModpackClientMetadataWhereUniqueInput}): PrismaPromise<ModpackClientMetadata> {
        const { where } = params;
        return this.prisma.modpackClientMetadata.delete({
          where: where
        })
      }
}
