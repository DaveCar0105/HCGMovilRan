import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { PaisRepository } from "src/repositories/pais.repository";
import { TipoCajaRepository } from "src/repositories/tipo-caja.repository";

@Controller(AppConstantController.PAIS_CONTROLLER)
export class PaisController{
    constructor(private readonly paisRepository: PaisRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.paisRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.paisRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.paisRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.paisRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.paisRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.paisRepository.updateEstadoDesActivo(id);
    }
}