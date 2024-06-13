import express from 'express'
import multer from 'multer'
import path from 'path'
import { Person } from '../models/person.model.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    cb(null, uniqueSuffix + extension)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('The file is not an image'), false)
  }
}

const upload = multer({
  storage,
  fileFilter
})

router.post('/upload', upload.single('profileImage'), async (req, res) => {
  const { id } = req.body
  const imagePath = req.file?.path
  if (!imagePath) {
    return res.status(400).send({ message: 'No file uploaded' })
  }
  const imageUrl = path.relative(path.join(__dirname, '../../'), imagePath)

  try {
    await updateClientImage(id, imageUrl)
    res.status(200).send({ message: 'Image successfully uploaded', imageUrl })
  } catch (error) {
    res.status(400).send({ message: 'Error loading image', error: error.message })
  }
})

const updateClientImage = async (id, imageUrl) => {
  const client = await Person.findByPk(id)
  if (!client) {
    throw new Error('Client not found')
  }
  client.photoUrl = 'http://localhost:3000/' + imageUrl
  await client.save()
}

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // console.error('Multer error:', err)
    res.status(400).send({ message: 'Error loading image', error: err.message })
  } else {
    // console.error('Internal server error:', err)
    res.status(500).send({ message: 'Internal server error' })
  }
})
