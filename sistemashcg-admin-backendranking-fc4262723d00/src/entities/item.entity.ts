import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FormularioItemEntity } from "./formulario-item.entity";
import { RespuestaFincaEntity } from "./formularios/respuesta-finca.entity";
import { ItemRangoEntity } from "./item-rango.entity";
import { SubcategoriaEntity } from "./subcategoria.entity";

@Entity('item')
export class ItemEntity{
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
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'item_nombre'
    })
    itemNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @Column({ name: 'id_subcategoria', nullable: true })
    idSubcategoria?: number;

    @ManyToOne(() => SubcategoriaEntity, subcategoria => subcategoria.items, { eager: true })
    @JoinColumn({ name: 'id_subcategoria' })
    subcategoria?: SubcategoriaEntity;

    @OneToMany(() => FormularioItemEntity, formularioItem => formularioItem.item)
    formularioItems?: FormularioItemEntity[];

    @OneToMany(() => ItemRangoEntity, itemRango => itemRango.item)
    itemsRango?: ItemRangoEntity[];

    @OneToMany(() => RespuestaFincaEntity, respueFinc => respueFinc.item)
    respuestasFinca?: RespuestaFincaEntity[];
}