import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemRangoEntity } from "./item-rango.entity";

@Entity('rango')
export class RangoEntity{
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
        name: 'minimo', 
        type: 'double precision',
        nullable: false
    })
    minimo: number;

    @Column({
        name: 'maximo', 
        type: 'double precision',
        nullable: false
    })
    maximo: number;

    @Column({
        name: 'cantidad_disminuir', 
        type: 'double precision',
        nullable: false
    })
    cantidadDisminuir: number;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'rango_nombre'
    })
    rangoNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @OneToMany(() => ItemRangoEntity, itemRango => itemRango.rango)
    itemsRango?: ItemRangoEntity[];
}