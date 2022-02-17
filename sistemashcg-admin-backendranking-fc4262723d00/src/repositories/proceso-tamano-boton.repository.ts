import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProcesoTamanoBotonEntity } from "src/entities/proceso-tamano-boton.entity";
import { Between, InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ProcesoTamnoBotonRepository{
    constructor(
        @InjectRepository(ProcesoTamanoBotonEntity)
        private readonly repository: Repository<ProcesoTamanoBotonEntity>
    ){}

    insert(entity: ProcesoTamanoBotonEntity): Promise<InsertResult> { 
        return this.repository.insert(entity);
    }

    selectAll(): Promise<ProcesoTamanoBotonEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<ProcesoTamanoBotonEntity | undefined> {
        return this.repository.findOne({id});
    }

    /*selectByDate(fechaInciio: Date, fechaFin: Date): Promise<ProcesoTamanoBotonEntity[] | undefined> {
        if(fechaInciio==null && fechaFin==null){
            throw new BadRequestException({
                mensaje: `¡Fechas incorrectas, por favor intente nuevamente!`,
            });
        }
        if( fechaInciio!= null && fechaFin!=null && fechaInciio.getTime()< fechaFin.getTime()){
            return this.repository.find(
                {
                    where: {
                        fechaAuditoria: Between(fechaInciio, fechaFin)
                    }
                }
            )
        }
    }*/
}