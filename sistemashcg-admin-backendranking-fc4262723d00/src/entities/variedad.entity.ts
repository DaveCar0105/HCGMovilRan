import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProcesoMaltratoEntity } from "./proceso-maltrato.entity";
import { ProcesoTamanoBotonEntity } from "./proceso-tamano-boton.entity";
import { ProductoEntity } from "./producto.entity";

@Entity('variedad')
export class VariedadEntity{
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
        name: 'variedad_nombre'
    })
    variedadNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    // un producto tiene muchas variedades ejemplo de muchos a 1
    @Column({ name: 'id_producto', nullable: true })
    idProducto?: number;

    @ManyToOne(() => ProductoEntity, producto => producto.variedades, { eager: true })
    @JoinColumn({ name: 'id_producto' })
    producto?: ProductoEntity;

    /////////////////////////////////////////////////////////////

    @OneToMany(() => ProcesoTamanoBotonEntity, proTamanoBoton => proTamanoBoton.variedad)
    procesosTamanoBoton?: ProcesoTamanoBotonEntity[];

    @OneToMany(() => ProcesoMaltratoEntity, procesoMaltrato => procesoMaltrato.variedad)
    procesosMaltrato?: ProcesoMaltratoEntity[];
}