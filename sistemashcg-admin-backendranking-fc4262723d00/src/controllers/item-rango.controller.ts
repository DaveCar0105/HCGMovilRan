import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ItemRangoRepository } from "src/repositories/item-rango.repository";

@Controller(AppConstantController.ITEM_RANGO_CONTROLLER)
export class ItemRangoController{
    constructor(private readonly itemRangoRepository: ItemRangoRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.itemRangoRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.itemRangoRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.itemRangoRepository.selectById(id));
    }

    @Delete('id/:id')
    async remove(@Param('id') id) {
        return await this.itemRangoRepository.delete(id);
    }
}