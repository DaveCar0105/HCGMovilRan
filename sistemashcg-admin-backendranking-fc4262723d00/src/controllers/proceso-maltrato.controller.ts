import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ProcesoMaltratoRepository } from "src/repositories/proceso-maltrato.repository";
import { TipoCajaRepository } from "src/repositories/tipo-caja.repository";

@Controller(AppConstantController.PROCESO_MALTRATO_CONTROLLER)
export class ProcesoMaltratoController{
    constructor(private readonly procesoMaltratoRepository: ProcesoMaltratoRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.procesoMaltratoRepository.insert(objetoDto);
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