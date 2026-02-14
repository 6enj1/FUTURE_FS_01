import nodemailer from 'nodemailer'

const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

interface MailPayload {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(data: MailPayload) {
  const toEmail = process.env.TO_EMAIL || process.env.SMTP_USER

  if (!transporter || !toEmail) {
    console.log('[mailer] SMTP not configured — logging contact submission:')
    console.log(JSON.stringify({ ...data, timestamp: new Date().toISOString() }, null, 2))
    return
  }

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: toEmail,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `[Portfolio] ${data.subject}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      '',
      data.message,
    ].join('\n'),
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr />
      <p>${data.message.replace(/\n/g, '<br />')}</p>
    `,
  })
}
