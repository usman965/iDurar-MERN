const path = require('path');
const fs = require('fs');
const { slugify } = require('transliteration');
const fileFilterMiddleware = require('./utils/fileFilterMiddleware');

const LocalSingleStorage = ({
  entity,
  fileType = 'default',
  uploadFieldName = 'file',
  fieldName = 'file',
}) => {
  return async function (req, res, next) {
    console.log('LocalSingleStorage: Starting upload middleware');
    console.log('LocalSingleStorage: req.files =', req.files);
    
    if (!req.files || Object.keys(req.files)?.length === 0 || !req.files?.file) {
      console.log('LocalSingleStorage: No file found, setting field to null');
      req.body[fieldName] = null;
      next();
    } else {
      try {
        console.log('LocalSingleStorage: File found, processing upload');
        
        if (!fileFilterMiddleware({ type: fileType, mimetype: req.files.file.mimetype })) {
          console.log('LocalSingleStorage: File type not supported');
          throw new Error('Uploaded file type not supported');
        }
        
        let fileExtension = path.extname(req.files.file.name);
        const fileNameWithoutExt = path.parse(req.files.file.name).name;

        let uniqueFileID = Math.random().toString(36).slice(2, 7); // generates unique ID of length 5

        let originalname = '';
        if (req.body.seotitle) {
          originalname = slugify(req.body.seotitle.toLocaleLowerCase()); // convert any language to English characters
        } else {
          originalname = slugify(fileNameWithoutExt.toLocaleLowerCase()); // convert any language to English characters
        }

        let _fileName = `${originalname}-${uniqueFileID}${fileExtension}`;
        const filePath = `public/uploads/${entity}/${_fileName}`;
        const fullPath = `src/${filePath}`;

        // Ensure directory exists
        const uploadDir = path.dirname(fullPath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move file to destination
        await req.files.file.mv(fullPath);

        console.log('LocalSingleStorage: File saved to', fullPath);

        // saving file name and extension in request upload object
        req.upload = {
          fileName: _fileName,
          fieldExt: fileExtension,
          entity: entity,
          fieldName: fieldName,
          fileType: fileType,
          filePath: filePath,
        };

        req.body[fieldName] = filePath;
        console.log('LocalSingleStorage: Set', fieldName, 'to', filePath);
        console.log('LocalSingleStorage: req.body after setting:', req.body);
        
        next();
      } catch (error) {
        console.log('LocalSingleStorage: Error during upload:', error.message);
        return res.status(403).json({
          success: false,
          result: null,
          controller: 'LocalSingleStorage.js',
          message: 'Error on uploading file: ' + error.message,
        });
      }
    }
  };
};

module.exports = LocalSingleStorage;
