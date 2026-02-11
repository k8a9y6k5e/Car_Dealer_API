import type {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('brand', (table)=>{
        table.increments('id');
        table.string('brand_name');
        table.string('brand_nacionality');
    });
}

export async function down(knex:Knex): Promise<void> {
    return knex.schema.dropTable('brand');
}