import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant, AppConstantDatabase } from "src/app.constant";
import { TipoCajaEntity } from "src/entities/tipo-caja.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class TipoCajaRepository{
    constructor(
        @InjectRepository(TipoCajaEntity)
        private readonly repository: Repository<TipoCajaEntity>
    ){}

    insert(entity: TipoCajaEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<TipoCajaEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<TipoCajaEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: TipoCajaEntity): Promise<UpdateResult> {
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