import multer from 'multer';
import path from 'path';
import fs from 'fs';

// project root e uploads folder
const uploadPath = path.join(process.cwd(), 'uploads'); // process.cwd() = project root

// folder exist na thakle create
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images allowed'), false);
  }
};

export const upload = multer({ storage, fileFilter });
