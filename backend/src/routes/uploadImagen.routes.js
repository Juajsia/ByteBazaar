import express from 'express'
import multer from 'multer'
import path from 'path'
import { Person } from '../models/person.model.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const router = express.Router()

// Configuración de Multer para aceptar solo imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')) // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    // Generar un nombre de archivo único
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    cb(null, uniqueSuffix + extension)
  }
})

const fileFilter = (req, file, cb) => {
  // Verificar el tipo de archivo
  if (file.mimetype.startsWith('image/')) {
    cb(null, true) // Aceptar el archivo
  } else {
    cb(new Error('El archivo no es una imagen'), false) // Rechazar el archivo
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
  console.log(imagePath)
  const imageUrl = path.relative(path.join(__dirname, '../../'), imagePath)

  try {
    await updateClientImage(id, imageUrl)
    res.status(200).send({ message: 'Image successfully uploaded', imageUrl })
  } catch (error) {
    console.error('Error updating client image:', error) // Log para verificar errores
    res.status(400).send({ message: 'Error loading image', error: error.message })
  }
})

const updateClientImage = async (id, imageUrl) => {
  const client = await Person.findByPk(id)
  if (!client) {
    throw new Error('Client not found')
  }
  client.photoUrl = imageUrl
  await client.save()
}

// Manejo de errores de Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err) // Log para verificar errores de Multer
    res.status(400).send({ message: 'Error loading image', error: err.message })
  } else {
    console.error('Internal server error:', err) // Log para verificar otros errores
    res.status(500).send({ message: 'Internal server error' })
  }
})
