const Joi = require('joi');

module.exports = {
  validateBody: schema => async (ctx, next) => {
    try {
      await Joi.validate(ctx.request.body, schema);
    } catch (e) {
      ctx.status = 400;
      ctx.body = { message: e.message };
      return;
    }
    await next();
  },
  validateQuery: schema => async (ctx, next) => {
    try {
      await Joi.validate(ctx.request.query, schema);
    } catch (e) {
      ctx.status = 400;
      ctx.body = { message: e.message };
      return;
    }
    await next();
  },
};
