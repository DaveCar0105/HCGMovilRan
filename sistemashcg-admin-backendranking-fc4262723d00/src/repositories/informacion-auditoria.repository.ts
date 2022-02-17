import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { InformacionAuditoriaEntity } from "src/entities/informacion-auditoria.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class InformacionAuditoriaRepository{
    constructor(
        @InjectRepository(InformacionAuditoriaEntity)
        private readonly repository: Repository<InformacionAuditoriaEntity>
    ){}

    insert(entity: InformacionAuditoriaEntity): Promise<InsertResult> {
        return this.repository.insert(entity);
    }

    selectAll(): Promise<InformacionAuditoriaEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<InformacionAuditoriaEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: InformacionAuditoriaEntity): Promise<UpdateResult> {
        delete fieldEntity.fechaHoraActualizacion;
        delete fieldEntity.fechaHoraRegistro;
        delete fieldEntity.id;
        return this.repository.update(id, fieldEntity);
    }

}