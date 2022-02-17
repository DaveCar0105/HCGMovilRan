import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AuditoriaCausaEntity } from "./auditoria-causa.entity";
import { PostcosechaEntity } from "./postcosecha.entity";
import { UsuarioEntity } from "./usuario.entity";

@Entity('informacion_auditoria')
export class InformacionAuditoriaEntity{
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
        name: 'fecha_auditoria',
        type: 'timestamp without time zone'
    })
    fechaAuditoria? : Date;

    @Column({
        name: 'promedio_sala', 
        type: 'double precision', 
        nullable: true
    })
    promedioSala?: number;

    @Column({
        name: 'promedio_boncheo', 
        type: 'double precision', 
        nullable: true
    })
    promedioBoncheo?: number;

    @Column({
        name: 'promedio_corte', 
        type: 'double precision', 
        nullable: true
    })
    promedioCorte?: number;

    @Column({
        name: 'promedio_largo_finca', 
        type: 'double precision', 
        nullable: true
    })
    promedioLargoFinca?: number;

    @Column({
        name: 'porcentaje_flor_nacional', 
        type: 'double precision', 
        nullable: true
    })
    porcentajeFlorNacional?: number;

    @Column({ name: 'id_postcosecha', nullable: true })
    idPostcosecha?: number;

    @ManyToOne(() => PostcosechaEntity, postcosecha => postcosecha.informacionAuditorias, { eager: true })
    @JoinColumn({ name: 'id_postcosecha' })
    postcosecha?: PostcosechaEntity;

    @Column({ name: 'id_usuario', nullable: true })
    idUsuario?: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.informacionAuditorias, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario?: UsuarioEntity;

    @OneToMany(() => AuditoriaCausaEntity, auditoriaCausa => auditoriaCausa.informacionAuditoria)
    auditoriasCausas?: AuditoriaCausaEntity[];
}