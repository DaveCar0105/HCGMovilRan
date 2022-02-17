import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { RangoEntity } from "src/entities/rango.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class RangoRepository{
    constructor(
        @InjectRepository(RangoEntity)
        private readonly repository: Repository<RangoEntity>
    ){}

    insert(entity: RangoEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<RangoEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<RangoEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: RangoEntity): Promise<UpdateResult> {
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