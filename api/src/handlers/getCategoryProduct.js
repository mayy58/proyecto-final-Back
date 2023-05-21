const findCategoryProduct = require("../controllers/findCategoryProduct");

const getCategoryProduct = async (req, res) => {
    //* paginado
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumbre = Number.parseInt(req.query.size);

    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) 
        page = pageAsNumber;

    let size = 3;
    if(!Number.isNaN(sizeAsNumbre) && sizeAsNumbre > 0 && sizeAsNumbre < 10) 
        size = sizeAsNumbre;

    //****** */
  try {

    const { namecategory } = req.params;
    console.log(namecategory);
    const prod = await findCategoryProduct(namecategory, page, size);
    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = getCategoryProduct;
