import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ProcesoMaltratoEntity } from "src/entities/proceso-maltrato.entity";
import { ProcesoMaltratoRepository } from "src/repositories/proceso-maltrato.repository";
import { TipoCajaRepository } from "src/repositories/tipo-caja.repository";

@Controller(AppConstantController.PROCESO_MALTRATO_CONTROLLER)
export class ProcesoMaltratoController{
    constructor(private readonly procesoMaltratoRepository: ProcesoMaltratoRepository){}

    @Post()
    create(@Body() objetoDto) {
        var newObject = new ProcesoMaltratoEntity;
        newObject.idUsuario = objetoDto[0]["usuarioId"];
        newObject.fechaAuditoria = objetoDto[0]["procesoMaltratoFecha"];
        newObject.idVariedad = objetoDto[0]["variedadId"];
        newObject.idPostcosecha = objetoDto[0]["procesoMaltratoId"];
        newObject.talloMuestreadoRecepcion= objetoDto[0]["procesoMaltratoTallosMuestreadoRecepcion"];
        newObject.talloMaltratoRecepcion = objetoDto[0]["procesoMaltratoTallosMaltratoRecepcion"];
        newObject.porcentajeIncidenciaRepcepcion = objetoDto[0]["procesoMaltratoPorcentajeIndicenciaRecepcion"];
        newObject.talloMuestreadoBoncheo = objetoDto[0]["procesoMaltratoTallosMuestreadoBoncheo"];
        newObject.talloMaltratoBoncheo = objetoDto[0]["procesoMaltratoTallosMaltratoBoncheo"];
        newObject.porcentajeIncidenciaBoncheo = objetoDto[0]["procesoMaltratoPorcentajeIndicenciaBoncheo"];
        newObject.talloMuestreadoCuartoFrio = objetoDto[0]["procesoMaltratoTallosMuestreadoCuartoFrio"];
        newObject.talloMaltratoCuartoFrio = objetoDto[0]["procesoMaltratoTallosMaltratoCuartoFrio"];
        newObject.porcentajeIncidenciaCuartoFrio = objetoDto[0]["procesoMaltratoPorcentajeIndicenciaCuartoFrio"];
        newObject.talloMuestreadoEmpaque = objetoDto[0]["procesoMaltratoTallosMuestreadoEmpaque"];
        newObject.talloMaltratoEmpaque = objetoDto[0]["procesoMaltratoTallosMaltratoEmpaque"];
        newObject.porcentajeIncidenciaEmpaque = objetoDto[0]["procesoMaltratoPorcentajeIndicenciaEmpaque"];
        return this.procesoMaltratoRepository.insert(newObject);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.procesoMaltratoRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.procesoMaltratoRepository.selectById(id));
    }
}