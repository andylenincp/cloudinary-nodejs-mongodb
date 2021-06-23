const {Router} = require('express')
const router = Router()
const Image = require('../models/Image')
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async (req, res) => {
    const images = await Image.find().lean()
    res.render('images', {images})
})

router.get('/images/add', async (req, res) => {
    const images = await Image.find().lean()
    res.render('image_form', {images})
})

router.post('/images/add', async (req, res) => {
    const {title, description} = req.body
    const result = await cloudinary.uploader.upload(req.file.path)
    const newImage = new Image({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newImage.save()
    await fs.unlink(req.file.path)
    res.redirect('/')
})

router.get('/images/delete/:image_id', async (req, res) => {
    const {image_id} = req.params
    const image = await Image.findByIdAndDelete(image_id)
    const result = await cloudinary.uploader.destroy(image.public_id)
    res.redirect('/images/add')
})

module.exports = router