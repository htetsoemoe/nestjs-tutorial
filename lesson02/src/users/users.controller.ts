import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
        GET /users
        GET /users/:id
        POST /users
        PATCH /users/:id
        DELETE /users/:id
    */

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') { // role?: literal type

        // Nullish Coalescing Operator (??):
        // The ?? operator assigns a default value ('NO ROLE') only if role is null or undefined.
        // This is preferred as it avoids overwriting valid falsy values (e.g., '' or false).
        const defaultRole = role ?? 'NO ROLE'

        return [
            {role: defaultRole},
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
