import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../services/prisma/prisma.service';
import { ModpackMetadata, Prisma, PrismaPromise } from '@prisma/client';

@Injectable()
export class ModpackMetadataPrismaService {
  
    constructor(private prisma: PrismaService){}

     findBy<S extends Prisma.ModpackMetadataInclude>(params: { where: Prisma.ModpackMetadataWhereInput, include?: Prisma.Subset<S,Prisma.ModpackMetadataInclude>}) : PrismaPromise<ModpackMetadata | undefined> {
        const { where, include } = params;
        return this.prisma.modpackMetadata.findFirst({
            where: where,
            include: include
        });
      }
      
       update(params: {
        where: Prisma.ModpackMetadataWhereUniqueInput;
        data: Prisma.ModpackMetadataUpdateInput;
      }){
        const { where, data } = params;
        return this.prisma.modpackMetadata.update({
          data,
          where,
        });
      }
      
       upsert<S extends Prisma.ModpackMetadataInclude>(params: {
        create: Prisma.ModpackMetadataCreateInput
        where: Prisma.ModpackMetadataWhereUniqueInput
        update: Prisma.ModpackMetadataUpdateInput,
        include?: Prisma.Subset<S, Prisma.ModpackMetadataInclude>
      }){
        const { where, create, update, include } = params;
        return this.prisma.modpackMetadata.upsert({
          create,
          update,
          where,
          include
        });
      }

       create(params: {data: Prisma.ModpackMetadataCreateInput}) : PrismaPromise<ModpackMetadata | undefined> {
        const { data } = params;
        return this.prisma.modpackMetadata.create({
          data:data
        });
      }
      
       list<S extends Prisma.ModpackMetadataInclude>(params?: {where?: Prisma.ModpackMetadataWhereInput, include?: Prisma.Subset<S, Prisma.ModpackMetadataInclude>}) 
      {
        const { where, include } = params;
        return this.prisma.modpackMetadata.findMany({
          where: where,
          include: include
      });
      }  
    
         delete(params: {where: Prisma.ModpackMetadataWhereUniqueInput}): PrismaPromise<ModpackMetadata> {
        const { where } = params;
        return this.prisma.modpackMetadata.delete({
          where: where
        })
      }
}
