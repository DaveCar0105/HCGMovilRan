import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { CausaRepository } from "src/repositories/causa.repository";

@Controller(AppConstantController.CAUSA_CONTROLLER)
export class CausaController{
    constructor(private readonly causaRepository: CausaRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.causaRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.causaRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.causaRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.causaRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.causaRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.causaRepository.updateEstadoDesActivo(id);
    }
}