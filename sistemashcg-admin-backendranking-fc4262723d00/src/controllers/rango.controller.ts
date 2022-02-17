import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { RangoRepository } from "src/repositories/rango.repository";

@Controller(AppConstantController.RANGO_CONTROLLER)
export class RangoController{
    constructor(private readonly rangoRepository: RangoRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.rangoRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.rangoRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.rangoRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.rangoRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.rangoRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.rangoRepository.updateEstadoDesActivo(id);
    }
}