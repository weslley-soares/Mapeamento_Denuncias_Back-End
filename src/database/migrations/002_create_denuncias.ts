import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("denuncias", (table) => {
    table.increments("id").primary();
    table.string("titulo").notNullable();
    table.text("descricao").notNullable();
    table.decimal("latitude", 10, 7).notNullable();
    table.decimal("longitude", 10, 7).notNullable();
    table.string("status").defaultTo("em andamento"); // 'em andamento', 'parado', 'concluído'
    table.string("protocolo").unique().notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("denuncias");
}