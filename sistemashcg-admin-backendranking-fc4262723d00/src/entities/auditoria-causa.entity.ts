import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CausaEntity } from "./causa.entity";
import { InformacionAuditoriaEntity } from "./informacion-auditoria.entity";

@Entity('auditoria_causa')
export class AuditoriaCausaEntity{
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
        name: 'porcentaje_afectacion', 
        type: 'double precision', 
        nullable: true
    })
    porcentajeAfectacion?: number;

    @Column({ name: 'id_causa', nullable: true })
    idCausa?: number;

    @ManyToOne(() => CausaEntity, causa => causa.auditoriasCausas, { eager: true })
    @JoinColumn({ name: 'id_causa' })
    causa?: CausaEntity;

    @Column({ name: 'id_informacion_auditoria', nullable: true })
    idInformacionAuditoria?: number;

    @ManyToOne(() => InformacionAuditoriaEntity, infoAuditoria => infoAuditoria.auditoriasCausas)
    @JoinColumn({ name: 'id_informacion_auditoria' })
    informacionAuditoria?: InformacionAuditoriaEntity;
}