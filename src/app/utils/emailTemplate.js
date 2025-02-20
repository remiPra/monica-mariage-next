export const emailTemplate = (
  name,
  clientEmail,
  phone,
  dateMariage,
  forme,
  budget,
  message
) => {
  return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de contact</title>
        <style>
          body { 
            font-family: 'Times New Roman', serif;
            background-color: #fdf1f1;
            padding: 20px;
          }
          .container { 
            max-width: 600px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(139, 99, 83, 0.1);
            margin: 0 auto;
          }
          .header { 
            background: #8b6353;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            color: white;
            font-family: 'Courier New', Courier, monospace;
            border-radius: 8px 8px 0 0;
          }
          .content { 
            padding: 20px;
            font-size: 16px;
            color: #5d4037;
            line-height: 1.6;
          }
          .footer { 
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #8b6353;
            border-top: 1px solid #f3e5e5;
          }
          a {
            color: #8b6353;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          strong {
            color: #6d4c41;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Monica Mariage</div>
          <div class="content">
            <p>Bonjour Monica,</p>
            <p>Une nouvelle cliente potentielle vous a contacté via le formulaire de votre site web :</p>
            <p><strong>Nom de la cliente :</strong> ${name}</p>
            <p><strong>Email :</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Date du mariage prévue :</strong> ${dateMariage}</p>
            <p><strong>Forme de robe préférée :</strong> ${forme}</p>
            <p><strong>Budget envisagé :</strong> ${budget}</p>
            <p><strong>Message de la cliente :</strong></p>
            <p>${message}</p>
          </div>
          <div class="footer">© 2024 Monica Mariage - Tous droits réservés</div>
        </div>
      </body>
      </html>
      `;
};
