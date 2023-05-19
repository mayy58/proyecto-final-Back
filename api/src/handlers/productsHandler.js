const { popularProductByCategory, findProductUser, getOrderProduct, findNameProdPrice, createProduct, findProdCatPrice, postPagoMercadoPago } = require("../controllers/productsControllers");

const getPopularProduct = async () => {
  try {
    const result = await popularProductByCategory();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//! Este Handler solicita los productos de un usuario a su controller
const getProductsUser = async (req, res) => {
    try {
        const { nameuser }  = req.params;
        const prod = await findProductUser(nameuser);
        res.status(200).json(prod);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }


 const getOrderHanlderProducto = async (req, res) => {
  try {
   
      const { orders } = req.query
      const order = await getOrderProduct(orders);
      res.status(200).json(order);

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}


 //! Handlers para traer los productos por un rango de precios por nombre de producto
 //!recibo el nombre por params y los rangos por query
 const getPriceRangeName = async (req, res) => {
     //* paginado
     const pageAsNumber = Number.parseInt(req.query.page);
     const sizeAsNumbre = Number.parseInt(req.query.size);
     
     let page = 0;
     if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) 
         page = pageAsNumber;
     
     let size = 6;
     if(!Number.isNaN(sizeAsNumbre) && sizeAsNumbre > 0 && sizeAsNumbre < 10) 
         size = sizeAsNumbre;
     
     //****** */
  try {
    const { max, min } = req.query;
    const {nameproduct} = req.params;
    const prodPrice = await findNameProdPrice(nameproduct, max, min, page, size);
    res.status(200).json(prodPrice);
    
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

 }

  //! Handlers para traer los productos por un rango de precios por categoria
  //!recibo la categoria por params y los rangos por query
  const getPriceRangeCategory = async (req, res) => {
       //* paginado
       const pageAsNumber = Number.parseInt(req.query.page);
       const sizeAsNumbre = Number.parseInt(req.query.size);
       
       let page = 0;
       if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) 
           page = pageAsNumber;
       
       let size = 6;
       if(!Number.isNaN(sizeAsNumbre) && sizeAsNumbre > 0 && sizeAsNumbre < 10) 
           size = sizeAsNumbre;
       
       //****** */
    try {
      const { max, min } = req.query;
      const {namecategory} = req.params;
      const prodPrice = await findProdCatPrice(namecategory, max, min, page, size);
      res.status(200).json(prodPrice);
      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  
   }
  


 //! Handlers para cargar productos setProduct
 const setProduct = async (req, res) => {
  try {
    const { name, img, stock, description, price, isOnSale, salePrice, status, categories, email} = req.body;
    const newProduct = await createProduct({ name, img, stock, description, price, isOnSale, salePrice, status, categories, email });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
///hecho por nelson para despues controlar en el pull marge request
//Para obtener los datos desde el front
const postShoppingHandler = async(req, res)=>{
  try {
   const products =  req.body
 
    const newShoping = await postPagoMercadoPago(products)
    console.log(newShoping)
    res.status(200).json(newShoping)
 
  } catch (error) {
    res.status(404).json({error:error.message})
  }
 }


module.exports = { getPopularProduct, getProductsUser, getOrderHanlderProducto, getPriceRangeName, setProduct, getPriceRangeCategory, postShoppingHandler};

