import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { CargueraEntity } from "src/entities/carguera.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class CargueraRepository{
    constructor(
        @InjectRepository(CargueraEntity)
        private readonly repository: Repository<CargueraEntity>
    ){}

    insert(entity: CargueraEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<CargueraEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<CargueraEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: CargueraEntity): Promise<UpdateResult> {
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