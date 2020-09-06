/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    firstname: { type: 'text' },
    lastname: { type: 'text' },
    email: { type: 'text' },
    secret: { type: 'text' },
    deletedat: { type: 'timestamptz' },
    createdat: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    mergeduserid: {
      type: 'integer',
      references: '"users"'
    }
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
    createdat: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}

exports.down = pgm => {}
