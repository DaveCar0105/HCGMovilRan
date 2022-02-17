import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemEntity } from "./item.entity";
import { RangoEntity } from "./rango.entity";

@Entity('item_rango')
export class ItemRangoEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({
        name: 'fecha_hora_registro',
        type: 'timestamp without time zone'
    })
    fechaHoraRegistro? : Date;

    @UpdateDateColumn({
        name: 'fecha_hora_actualizacion',
        type: 'timestamp without time zone'
    })
    fechaHoraActualizacion? : Date;

    @Column({
        nullable: false
    })
    orden: number;

    @Column({ name: 'id_item', nullable: false })
    idItem?: number;

    @ManyToOne(() => ItemEntity, itemRango => itemRango.itemsRango)
    @JoinColumn({ name: 'id_item' })
    item?: ItemEntity;

    @Column({ name: 'id_rango', nullable: false })
    idRango?: number;

    @ManyToOne(() => RangoEntity, rango => rango.itemsRango)
    @JoinColumn({ name: 'id_rango' })
    rango?: RangoEntity;
}