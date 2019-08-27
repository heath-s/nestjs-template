import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

// const IS_TEST = process.env.NODE_ENV === 'test';
const IS_TEST = true;

@Injectable()
export class AuditLogService {
  async createError(context: string, request: Request, error: Error) {
    const log = this.getLogFromRequest(context, request, error);

    if (IS_TEST) {
      Logger.error(log, error.stack, 'AuditLogService::createError');
      return;
    }

    // TODO
  }

  async createSuccess(context: string, request: Request) {
    const log = this.getLogFromRequest(context, request);

    if (IS_TEST) {
      Logger.log(log, 'AuditLogService::createSuccess');
      return;
    }

    // TODO
  }

  private getLogFromRequest(context: string, request: Request, error?: Error) {
    return {
      context,
      request: {

      },
      error,
    };
  }
}

/*
from osiris
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    error: {
      allowNull: true,
      type: DataTypes.JSON
    },
    reqTag: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING
    },
    request: {
      allowNull: false,
      defaultValue: {},
      type: DataTypes.JSON
    },
    username: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING
    },
    userNickname: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING
    }
  }, {
    updatedAt: false,
    indexes: [{ fields: ['reqTag'] }, { fields: ['username'] }, { fields: ['userNickname'] }]
  });
  Log.associate = function(models) {
    // associations can be defined here
  };

  // Class methods
  Log.saveItem = async (req, error) => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    if (error && error instanceof Error) {
      error = {
        message: error.message.toString(),
        stack: error.stack.toString()
      };
    }
    const { userId: username, username: userNickname } = req.user;
    const reqTag = req.tag;
    const request = {
      body: req.body,
      endpoint: `${req.method} ${req.originalUrl}`,
      headers: req.headers,
      ip: req.ip,
      user: req.user
    };

    return await Log.create({ error, username, userNickname, reqTag, request });
  };

  return Log;
};
*/
