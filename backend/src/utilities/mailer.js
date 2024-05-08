import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'juanpaadams20@gmail.com',
    pass: 'yweg ppqw llum zpxe'
  }
})

transporter.verify().then(() => {
  console.log('ready for send emails')
})
