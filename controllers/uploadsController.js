		//activate"path"package
		const path = require('path');
		//importing customError
		const CustomError = require('../errors');
		//activate"http-status-codes"package
		const {
		 StatusCodes
		} = require('http-status-codes');

		//createProduct-function
		const uploadProductImage = async (req, res) => {
		 //check if file exists
		 if (!req.files) {
		  throw new CustomError.BadRequestError('No file uploaded')
		 }
		 let productImage = req.files.image
		 //check if file format
		 if (!productImage.mimetype.startsWith('image')) {
		  throw new CustomError.BadRequestError('Please, upload image')
		 }
		 //check size
		 const maxSize = 1024 * 1024;
		 if (productImage.size > maxSize) {
		  throw new CustomError.BadRequestError('Please, upload image smaller that 1KB')
		 }
		 //select path of generated files
		 const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
		 //select the image Path
		 await productImage.mv(imagePath)
		 //response
		 return res.status(StatusCodes.OK).json({
		  image: {
		   src: `/uploads/${productImage.name}`
		  }
		 })
		}

		// const uploadProductImage = async (req, res) => {
		//  const result = await cloudinary.uploader.upload(
		//   req.files.image.tempFilePath, {
		//    use_filename: true,
		//    folder: 'file-upload',
		//   }
		//  );
		//  fs.unlinkSync(req.files.image.tempFilePath);
		//  return res.status(StatusCodes.OK).json({
		//   image: {
		//    src: result.secure_url
		//   }
		//  });
		// };

		module.exports = {
		 uploadProductImage,
		};