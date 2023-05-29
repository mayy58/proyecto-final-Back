const {
  createAdmin,
  allUser,
  deleteSelectedUsers, 
  PieChart,
  registerPercentege,
  findCountVentasXVendedor,
  deliveredProducts,
  findCountSaleProduct,
} = require("../controllers/adminControllers");

const postCreateAdmin = async (req, res) => {
  const {
    picture,
    email,
    password,
    name,
    lastName,
    birthDate,
    address,
    nickname,
  } = req.body;
  try {
    const result = await createAdmin(
      picture,
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

const percentegeGoogle = async (req, res) => {
  try {
    const result = await registerPercentege();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPieChart = async (req, res) => {
  try {
    const result = await PieChart();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSellers = async (req, res) => {
  try {
    const result = await findCountVentasXVendedor();
    return res.status(200).json(result);
      } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const result = await findCountSaleProduct();
    return res.status(200).json(result);
      } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
    

const allProduct = async (req, res) => {
  try {
    const result = await deliveredProducts();
    return res.status(200).json({ result });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  postCreateAdmin,
  getAllUser,
  logicDelete,
  percentegeGoogle,
  getPieChart,
  allProduct,
  getSellers,
  getSales
};
