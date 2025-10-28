const sgMail = require("@sendgrid/mail");

// Configure SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Template HTML para o email da clínica
const createEmailTemplate = (formData) => {
  const { name, email, phone, service, date, time, message } = formData;

  return `
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nova Consulta - MyClinic Angola</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f4f6;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;color:#111;">

        <!-- Wrapper table -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f3f4f6;padding:24px 0;">
            <tr>
                <td align="center">

                    <!-- Main container -->
                    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:8px;overflow:hidden;">

                        <!-- Header / Brand -->
                        <tr>
                            <td style="background:linear-gradient(135deg,#0066cc 0%,#00a8e8 100%);padding:28px 24px;text-align:center;color:#ffffff;">
                                <!-- Logo (use absolute URL in production) -->
                                <img src="public/img/myclinic-logo.png" alt="MyClinic" width="140" style="display:block;margin:0 auto 12px auto;border:0;line-height:100%;outline:none;text-decoration:none;" />
                                <h1 style="font-size:20px;font-weight:700;margin:0;padding:0;font-family:Georgia, 'Times New Roman', serif;">MyClinic Angola</h1>
                                <p style="margin:6px 0 0 0;font-size:13px;opacity:0.95;">Cuidados Dentários Profissionais</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:20px 24px 8px 24px;color:#0f172a;">
                                <p style="margin:0 0 12px 0;font-size:15px;"><strong>Novo Agendamento Recebido</strong></p>
                                <p style="margin:0 0 18px 0;color:#475569;font-size:14px;">Uma nova solicitação de consulta foi recebida através do site. Confira os detalhes abaixo e contacte o paciente para confirmar.</p>

                                                <!-- Appointment card -->
                                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #e6eef6;border-radius:8px;background:#ffffff;padding:0;margin-top:12px;">
                                                    <tr>
                                                        <td style="padding:0;">
                                                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;border-spacing:0;width:100%;">
                                                                <!-- Row template: label | value -->
                                                                <tr style="border-bottom:1px solid #f1f5f9;">
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Nome do Paciente</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${name}</td>
                                                                </tr>
                                                                <tr style="border-bottom:1px solid #f1f5f9;">
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Email</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${email}</td>
                                                                </tr>
                                                                <tr style="border-bottom:1px solid #f1f5f9;">
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Telefone</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${phone}</td>
                                                                </tr>
                                                                <tr style="border-bottom:1px solid #f1f5f9;">
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Serviço</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${
                                                                      service ||
                                                                      "Consulta Geral"
                                                                    }</td>
                                                                </tr>
                                                                <tr style="border-bottom:1px solid #f1f5f9;">
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Data</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${
                                                                      date ||
                                                                      "A definir"
                                                                    }</td>
                                                                </tr>
                                                                <tr style="border-bottom:1px solid #f1f5f9;">
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Horário</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${
                                                                      time ||
                                                                      "A definir"
                                                                    }</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="width:40%;padding:14px 16px;background:#fbfdff;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;">Mensagem</td>
                                                                    <td style="padding:14px 16px;color:#0f172a;font-size:14px;vertical-align:top;">${
                                                                      message ||
                                                                      "-"
                                                                    }</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>

                                <p style="margin:18px 0 0 0;font-size:13px;color:#475569;">Aconselhamos que contacte o paciente o mais rápido possível para confirmação. Pode responder diretamente ao endereço de email do paciente (reply-to).</p>
                            </td>
                        </tr>

                        <!-- CTA / Contact info -->
                                    <!-- Removed CTA; contacts moved to footer for clarity -->

                        <!-- Footer -->
                                    <tr>
                                        <td style="background:#0f172a;color:#94a3b8;padding:18px 24px;text-align:center;font-size:12px;">
                                            <div style="margin-bottom:8px;font-size:13px;color:#cbd5e1;">📞 +244 933 000 331 • +244 928 616 519 &nbsp; • &nbsp; 📧 geral@myclinic.ao</div>
                                            <div style="margin-bottom:6px;color:#94a3b8;">Shopping Fortaleza, Piso 2 — Luanda, Angola</div>
                                            <div style="color:#94a3b8;">© MyClinic Angola</div>
                                        </td>
                                    </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
</html>
  `;
};

// Vercel serverless API handler
module.exports = async function (req, res) {
  // CORS headers for cross-origin requests
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );

  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST for actual requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  // Require SendGrid API key and destination email
  if (!process.env.SENDGRID_API_KEY || !process.env.CLINIC_EMAIL || !process.env.CLINIC_EMAIL2) {
    return res
      .status(500)
      .json({ success: false, message: "Server not configured" });
  }

  const { name, email, phone, service, date, time, message } = req.body || {};

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const formData = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    service: service || "Consulta Geral",
    date: date || "A definir",
    time: time || "A definir",
    message: message ? String(message).trim() : "",
  };

  const msg = {
    to: [process.env.CLINIC_EMAIL, process.env.CLINIC_EMAIL2],
    from: {
      email: process.env.FROM_EMAIL || "noreply@myclinic.ao",
      name: "MyClinic Angola - Website",
    },
    replyTo: formData.email,
    subject: `Nova Consulta - ${formData.name}`,
    text: `Nome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${
      formData.phone
    }\nServiço: ${formData.service}\nData: ${formData.date}\nHora: ${
      formData.time
    }\n${formData.message ? `Mensagem: ${formData.message}` : ""}`,
    html: createEmailTemplate(formData),
  };

  try {
    const result = await sgMail.send(msg);
    return res.status(200).json({
      success: true,
      message: "Pedido enviado com sucesso.",
    });
  } catch (e) {
    console.error("SendGrid error:", e.response?.body || e.message || e);
    return res.status(500).json({
      success: false,
      message: "Falha no envio.",
      error: e.response?.body || e.message || e.toString(),
    });
  }
};
