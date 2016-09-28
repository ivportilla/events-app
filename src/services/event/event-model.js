'use strict';

// event-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const event = sequelize.define('events', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING
    },
    creator: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  event.sync();

  return event;
};
