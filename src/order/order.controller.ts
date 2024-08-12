import { Controller, Get, Query, Post, Body, BadRequestException, Put, Delete, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.output';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { DeleteOrderInput } from './dto/delete-order.input';
import { DistributionError, DistributionErrorCode } from 'src/exceptions/distribution-error';
import { Pagination } from 'src/util/pagination/pagination.output';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get('findAll/:pageNumber/:size/:distribution_id')
    async findAll(
        @Param('pageNumber') pageNumber:string,
        @Param('size') size: string,
        @Param('distribution_id') distribution_id: string): Promise<Pagination<OrderDto>> {
        const pageNumberInt = parseInt(pageNumber);
        const sizeInt = parseInt(size);
        const distributionIdInt = parseInt(distribution_id);
        if(isNaN(pageNumberInt) || isNaN(sizeInt) || isNaN(distributionIdInt) )
            throw new DistributionError(DistributionErrorCode.PARAMETERS_ARE_NUMBERS, "Los parametros pageNumber, size y distribution_id deben ser numeros");
        if( pageNumberInt <= 0 || sizeInt <= 0 || distributionIdInt <= 0) 
            throw new DistributionError(DistributionErrorCode.PARAMETERS_POSITIVE_VALUES, "Los parametros pageNumber, size y distribution_id deben ser valores mayores que 0");
        return await this.orderService.getOrders( {pageNumber:pageNumberInt, size: sizeInt, distribution_id: distributionIdInt});
    }

    @Post('create')
    async create(@Body() order: CreateOrderInput): Promise<OrderDto> {
        try {
            const newOrder = await this.orderService.create(order);
            return newOrder;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Put('update')
    async update(@Body() order: UpdateOrderInput): Promise<OrderDto> {
        try {
            const updatedOrder = await this.orderService.update(order);
            return updatedOrder;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Delete('delete')
    async delete(@Body() params: DeleteOrderInput): Promise<OrderDto> {
        return await this.orderService.delete(params.id);;

    }
}
