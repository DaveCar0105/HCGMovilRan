import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant, AppConstantDatabase } from "src/app.constant";
import { CausaEntity } from "src/entities/causa.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class CausaRepository{
    constructor(
        @InjectRepository(CausaEntity)
        private readonly repository: Repository<CausaEntity>
    ){}

    insert(entity: CausaEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<CausaEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<CausaEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: CausaEntity): Promise<UpdateResult> {
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