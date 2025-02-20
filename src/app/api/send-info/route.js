const nodemailer = require("nodemailer");

export async function POST(req) {
  try {
    const { prenom, nom, email, telephone, dateDuMariage } = await req.json();

    if (!prenom || !nom || !email || !telephone || !dateDuMariage) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "remipradere@gmail.com", // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
      },
    });

    // WhatsApp Button URL
    const whatsappURL = `https://wa.me/${telephone.replace(/[^0-9]/g, "")}`;

    // Define the email options
    const mailOptions = {
      from: "remipradere@gmail.com", // Your Gmail address
      to: "remiletarologue@gmail.com", // Your wife's email
      subject: "Nouvelle demande de contact via le formulaire",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de contact</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .whatsapp-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #25D366;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            }
            .phone-link {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <h1>Nouvelle demande de contact</h1>
          <p><strong>Prénom :</strong> ${prenom}</p>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> <a class="phone-link" href="tel:${telephone}">${telephone}</a></p>
          <p><strong>Date du mariage :</strong> ${dateDuMariage}</p>
          <a href="${whatsappURL}" class="whatsapp-button">Contacter sur WhatsApp</a>
        </body>
        </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return Response.json(
      { message: "Error sending email with Nodemailer" },
      { status: 500 }
    );
  }
}
