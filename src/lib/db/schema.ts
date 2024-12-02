import {pgTable, serial, text, boolean, numeric} from 'drizzle-orm/pg-core'

export const $audio = pgTable('audio', 
{
    id: serial('id').primaryKey(),
    mp3_file: text('mp3_file').notNull(),
    text: text('text').notNull(),
    validated: boolean('validated'),
    duration: numeric('duration').notNull(),
});

export type AudioType = typeof $audio.$inferInsert;