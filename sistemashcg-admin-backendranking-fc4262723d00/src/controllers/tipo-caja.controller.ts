import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { TipoCajaRepository } from "src/repositories/tipo-caja.repository";

@Controller(AppConstantController.TIPO_CAJA_CONTROLLER)
export class TipoCajaController{
    constructor(private readonly tipoCajaRepository: TipoCajaRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.tipoCajaRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.tipoCajaRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.tipoCajaRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.tipoCajaRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.tipoCajaRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.tipoCajaRepository.updateEstadoDesActivo(id);
    }
}