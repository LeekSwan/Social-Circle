/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    firstname: { type: 'text' },
    lastname: { type: 'text' },
    email: { type: 'text' },
    secret: { type: 'text' },
    deletedAt: { type: 'timestamptz' },
    createdAt: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    mergedUserId: {
      type: 'integer',
      references: '"users"'
    },
  })
  pgm.createTable('friendships', {
    id: 'id',
    user1: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade'
    },
    user2: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade'
    },
    createdAt: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}

exports.down = pgm => {}
