import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  coefficient: integer('coefficient').notNull(),
  logo: text('logo'),
  pot: integer('pot').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const draws = pgTable('draws', {
  id: serial('id').primaryKey(),
  season: text('season').notNull(),
  stage: text('stage').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  drawId: integer('draw_id').references(() => draws.id),
  homeTeamId: integer('home_team_id').references(() => teams.id),
  awayTeamId: integer('away_team_id').references(() => teams.id),
  matchday: integer('matchday').notNull(),
  result: text('result'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leagueStandings = pgTable('league_standings', {
  id: serial('id').primaryKey(),
  drawId: integer('draw_id').references(() => draws.id),
  teamId: integer('team_id').references(() => teams.id),
  played: integer('played').notNull(),
  won: integer('won').notNull(),
  drawn: integer('drawn').notNull(),
  lost: integer('lost').notNull(),
  goalsFor: integer('goals_for').notNull(),
  goalsAgainst: integer('goals_against').notNull(),
  points: integer('points').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});