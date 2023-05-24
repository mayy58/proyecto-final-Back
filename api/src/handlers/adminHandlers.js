const {
  createAdmin,
  allUser,
  deleteSelectedUsers,
} = require("../controllers/adminControllers");

const postCreateAdmin = async (req, res) => {
  const { email, password, name, lastName, birthDate, address, nickname } =
    req.body;
  try {
    const result = await createAdmin(
      email,
      password,
      name,
      lastName,
      birthDate,
      address,
      nickname
    );
    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await allUser();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logicDelete = async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await deleteSelectedUsers(ids);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { postCreateAdmin, getAllUser, logicDelete };
