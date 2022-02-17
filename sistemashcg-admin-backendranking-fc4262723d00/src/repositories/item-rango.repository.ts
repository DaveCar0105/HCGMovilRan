import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemRangoEntity } from "src/entities/item-rango.entity";
import { DeleteResult, InsertResult, Repository } from "typeorm";

@Injectable()
export class ItemRangoRepository{
    constructor(
        @InjectRepository(ItemRangoEntity)
        private readonly repository: Repository<ItemRangoEntity>
    ){}

    async insert(entity: ItemRangoEntity): Promise<InsertResult> {
        const itemRango = await this.repository.findOne({
            where:{
                idItem: entity.idItem,
                idRango: entity.idRango,
                orden: entity.orden
            }
        });
        if (itemRango!=null && itemRango!=undefined)
            throw new BadRequestException('Item-rango ya existe.');
        return this.repository.insert(entity);
    }

    selectAll(): Promise<ItemRangoEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<ItemRangoEntity | undefined> {
        return this.repository.findOne({id});
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}