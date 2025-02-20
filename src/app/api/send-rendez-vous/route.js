const nodemailer = require("nodemailer");

export async function POST(req, res) {
  try {
    const { prenom, telephone, email, message } = await req.body;

    if (!prenom || !telephone || !message) {
      return res
        .status(400)
        .json({ message: "Prénom, téléphone et message sont requis." });
    }

    // Créer un transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "remipradere@gmail.com", // Votre adresse Gmail
        pass: process.env.GMAIL_APP_PASSWORD, // Votre mot de passe d'application Gmail
      },
    });

    // URL du bouton WhatsApp
    const whatsappURL = `https://wa.me/${telephone.replace(/[^0-9]/g, "")}`;

    // Définir les options de l'e-mail
    const mailOptions = {
      from: "remipradere@gmail.com", // Votre adresse Gmail
      to: "remiletarologue@gmail.com", // L'adresse e-mail de votre femme
      subject: "Demande de rendez-vous",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de rendez-vous</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .container { max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 10px; }
            .btn-whatsapp {
              display: inline-block;
              padding: 12px 20px;
              background-color: #25D366;
              color: white;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
              border-radius: 5px;
              margin-top: 10px;
              display: block;
              text-align: center;
            }
            .btn-whatsapp:hover {
              background-color: #1ebd5a;
            }
            .info p { margin: 5px 0; }
            .phone-link {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Nouvelle demande de rendez-vous</h1>
            <div class="info">
              <p><strong>Prénom :</strong> ${prenom}</p>
              <p><strong>Téléphone :</strong> <a class="phone-link" href="tel:${telephone}">${telephone}</a></p>
              ${email ? `<p><strong>Email :</strong> ${email}</p>` : ""}
              <p><strong>Message :</strong> ${message}</p>
            </div>
            <a href="${whatsappURL}" class="btn-whatsapp">📲 Contacter sur WhatsApp</a>
          </div>
        </body>
        </html>
      `,
    };

    // Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.response);

    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur Nodemailer:", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email avec Nodemailer" });
  }
}
