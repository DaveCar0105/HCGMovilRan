import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { VariedadEntity } from "src/entities/variedad.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class VariedadRepository{
    constructor(
        @InjectRepository(VariedadEntity)
        private readonly repository: Repository<VariedadEntity>
    ){}

    insert(entity: VariedadEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<VariedadEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<VariedadEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: VariedadEntity): Promise<UpdateResult> {
        delete fieldEntity.estado;
        delete fieldEntity.fechaHoraActualizacion;
        delete fieldEntity.fechaHoraRegistro;
        delete fieldEntity.id;
        delete fieldEntity.producto;
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