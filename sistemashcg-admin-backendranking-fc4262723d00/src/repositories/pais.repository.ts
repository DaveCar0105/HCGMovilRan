import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { PaisEntity } from "src/entities/pais.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class PaisRepository{
    constructor(
        @InjectRepository(PaisEntity)
        private readonly repository: Repository<PaisEntity>
    ){}

    insert(entity: PaisEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<PaisEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<PaisEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: PaisEntity): Promise<UpdateResult> {
        delete fieldEntity.estado;
        delete fieldEntity.fechaHoraActualizacion;
        delete fieldEntity.fechaHoraRegistro;
        delete fieldEntity.id;
        return this.repository.update(id, fieldEntity);
    }

    updateEstadoActivo(id: number): Promise<UpdateResult> {
        const fieldEntity = {
            estado: AppConstant.ESTADO_ENTITY_ACTIVO
        };
        return this.repository.update(id, fieldEntity);
    }

    updateEstadoDesActivo(id: number): Promise<UpdateResult> {
        const fieldEntity = {
            estado: AppConstant.ESTADO_ENTITY_DESACTIVADO
        };
        return this.repository.update(id, fieldEntity);
    }


}