import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { PostcosechaRepository } from "src/repositories/postcosecha.repository";

@Controller(AppConstantController.POSTCOSECHA_CONTROLLER)
export class PostcosechaController{
    constructor(private readonly postcosechaRepository: PostcosechaRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.postcosechaRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.postcosechaRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.postcosechaRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.postcosechaRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.postcosechaRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.postcosechaRepository.updateEstadoDesActivo(id);
    }
}