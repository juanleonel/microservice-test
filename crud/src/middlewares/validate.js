const Joi = require('joi');

function take(object, keys) {
  return Object.assign({}, ...keys
    .filter(key => object.hasOwnProperty(key))
    .map(key => ({ [key]: object[key] })));
}

function validate(schema) {
  return (req, res, next) => {
    const selectedSchema = take(schema, ['params', 'query', 'body']);
    const objectToValidate = take(req, Object.keys(selectedSchema));
    const { error, value } = Joi.compile(selectedSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(objectToValidate);

    if (error) {
      const errorMsg = error.details.map(d => d.message).join(', ');

      return res.status(400).json({ success: false, message: errorMsg });
    }

    Object.assign(req, value);
    next();
  };
}

module.exports = {
  take,
  validate
}
