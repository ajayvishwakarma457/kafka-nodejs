function sendEmail(to, subject, body) {
    console.log(`
      ✉️ Sending Email:
      To: ${to}
      Subject: ${subject}
      Body: ${body}
    `);
  }
  
  module.exports = { sendEmail };
  