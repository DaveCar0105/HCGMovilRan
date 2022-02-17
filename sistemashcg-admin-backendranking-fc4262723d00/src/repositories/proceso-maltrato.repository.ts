import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProcesoMaltratoEntity } from "src/entities/proceso-maltrato.entity";
import { Between, InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ProcesoMaltratoRepository{
    constructor(
        @InjectRepository(ProcesoMaltratoEntity)
        private readonly repository: Repository<ProcesoMaltratoEntity>
    ){}

    insert(entity: ProcesoMaltratoEntity): Promise<InsertResult> { 
        return this.repository.insert(entity);
    }

    selectAll(): Promise<ProcesoMaltratoEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<ProcesoMaltratoEntity | undefined> {
        return this.repository.findOne({id});
    }
}