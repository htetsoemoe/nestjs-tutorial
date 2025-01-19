import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
        GET /users
        GET /users/:id
        POST /users
        PATCH /users/:id
        DELETE /users/:id
    */

    @Get() // GET /users
    findAll() {
        return [
            { id: 1, name: 'John Doe', email: 'john@code.com' },
            { id: 2, name: 'Thiri Ko Ko', email: 'thiriko@code.com' },
        ];
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return {id}
    }

    @Post() // POST /users
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() user: {}) {
        return {id, ...user}
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return {id}
    }
}
