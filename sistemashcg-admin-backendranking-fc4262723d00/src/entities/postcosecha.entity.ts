import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EvaluacionFincaEntity } from "./formularios/evaluacion-finca.entity";
import { InformacionAuditoriaEntity } from "./informacion-auditoria.entity";
import { ProcesoMaltratoEntity } from "./proceso-maltrato.entity";
import { ProcesoTamanoBotonEntity } from "./proceso-tamano-boton.entity";

@Entity('postcosecha')
export class PostcosechaEntity{
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
        name: 'postcosecha_nombre'
    })
    postcosechaNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @Column({name: 'id_postcosecha_padre', nullable: true})
    idPostcosechaPadre: number;

    @OneToMany(type => PostcosechaEntity, postcosecha => postcosecha.postcosecha)
    postcosechas?: PostcosechaEntity[];

    @ManyToOne(type => PostcosechaEntity, postcosecha => postcosecha.postcosechas)
    @JoinColumn({name: 'id_postcosecha_padre'})
    postcosecha?: PostcosechaEntity;

    @OneToMany(() => InformacionAuditoriaEntity, infoAuditoria => infoAuditoria.postcosecha)
    informacionAuditorias?: InformacionAuditoriaEntity[];

    @OneToMany(() => ProcesoTamanoBotonEntity, proTamanoBoton => proTamanoBoton.postcosecha)
    procesosTamanoBoton?: ProcesoTamanoBotonEntity[];

    @OneToMany(() => ProcesoMaltratoEntity, procesoMaltrato => procesoMaltrato.postcosecha)
    procesosMaltrato?: ProcesoMaltratoEntity[];

    @OneToMany(() => EvaluacionFincaEntity, evaluaFinc => evaluaFinc.postcosecha)
    evaluacionesFinca?: EvaluacionFincaEntity[];

}