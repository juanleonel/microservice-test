const accountService = require('../services/account');

const getAccounts = async (req, res) => {
  const result = await accountService.getAllAccounts();

  return res.status(200).json({ success: true, account: result.map(item => mapToResponse(item)) });
};

const createAccount = async (req, res) => {
  const { name, number, type, status } = req.body;
  const result = await accountService.createAccount(name, number, type, status);

  return res.status(201).json({
    success: true,
    account: mapToResponse(result),
  });
};

const deleteAccountById = async (req, res) => {
  const isDeleted = await accountService.deleteAccountById(req.params.id);

  if (isDeleted) {
    return res.status(204).json({ success: true });
  }

  return res.status(400).json({ success: false, message: 'No valid data to delete' });
};

const updateAccountById = async (req, res) => {
  const result = await accountService.updateAccountById(req.params.id, req.body);

  if (result.error) {
    switch (result.code) {
      case accountService.errorCodes.NO_VALID_DATA_TO_UPDATE:
        res.status(400).json({
          success: false, message:
            result.error
        });
        return;
      case accountService.errorCodes.INVALID_STATUS_CODE:
        res.status(400).json({
          success: false, message:
            'invalid status'
        });
        return;
      case accountService.errorCodes.INVALID_TYPE_CODE:
        res.status(400).json({
          success: false, message:
            'invalid type'
        });
        return;
      case accountService.errorCodes.INVALID_ACCOUNT:
        res.status(404).json({
          success: false, message:
            'Account not found'
        });
        return;
      case accountService.errorCodes.INVALID_STATE_TRANSITION:
        res.status(400).json({
          success: false, message:
            result.error
        });
        return;
      case accountService.errorCodes.INVALID_TYPE_TRANSITION:
        res.status(400).json({
          success: false, message:
            result.error
        });
        return;
      default:
        res.status(500).json({
          success: false, message:
            'internal server error'
        });
        return;
    }
  }
  return res.status(200).json({
    success: true,
    Account: mapToResponse(result),
  });
};

function mapToResponse(account) {
  const { id, name, number, type, status, } = account;

  return {
    id,
    name,
    number,
    type,
    status
  };
};

const getAccountById = async (req, res) => {
  const result = await accountService.getAccountById(req.params.id);

  if (result) {
    return res.status(200).json({
      success: true, account:
        mapToResponse(result)
    });
  }

  return res.status(404).json({ success: false, message: 'Account not found' });
};

module.exports = {
  getAccountById,
  getAccounts,
  createAccount,
  deleteAccountById,
  updateAccountById,
};
