const sgMail = require("@sendgrid/mail");

// Configurar SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// Função principal da API
async function handler(req, res) {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Responder a requisições OPTIONS (CORS preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Apenas aceitar POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Método não permitido. Use POST.",
    });
  }

  try {
    // Validar se as variáveis de ambiente estão configuradas
    if (!process.env.SENDGRID_API_KEY || !process.env.CLINIC_EMAIL) {
      return res.status(500).json({
        success: false,
        message:
          "Configuração do servidor incompleta. Contacte o administrador.",
      });
    }

    // Extrair dados do formulário
    const { name, email, phone, service, date, time, message } = req.body;

    // Validação básica
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Nome, email e telefone são obrigatórios.",
      });
    }

    // Validação de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido.",
      });
    }

    // Dados do formulário para o template
    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service || "Consulta Geral",
      date: date || "A definir",
      time: time || "A definir",
      message: message ? message.trim() : "",
    };

    // Configurar email para a clínica
    const clinicMsg = {
      to: process.env.CLINIC_EMAIL, // Email da clínica
      from: {
        email: process.env.FROM_EMAIL || "noreply@myclinic.ao",
        name: "MyClinic Angola - Website",
      },
      replyTo: email, // Para responder diretamente ao paciente
      subject: `🦷 Nova Consulta Agendada - ${name}`,
      html: createEmailTemplate(formData),
      // Texto alternativo para clientes que não suportam HTML
      text: `
Nova Consulta Agendada - MyClinic Angola

Nome: ${name}
Email: ${email}
Telefone: ${phone}
Serviço: ${service || "Consulta Geral"}
Data Preferida: ${date || "A definir"}
Horário Preferido: ${time || "A definir"}
${message ? `\nMensagem: ${message}` : ""}

Entre em contacto com o paciente o mais rápido possível para confirmar a consulta.
      `,
    };

    // Enviar apenas email para a clínica
    await sgMail.send(clinicMsg);

    // Resposta de sucesso
    res.status(200).json({
      success: true,
      message:
        "Sua marcação foi efetuada com sucesso! Entraremos em contacto consigo.",
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);

    // Log detalhado do erro (apenas no servidor)
    if (error.response) {
      console.error("SendGrid Error:", error.response.body);
    }

    // Determinar tipo de erro e resposta apropriada
    let errorMessage =
      "Falha ao marcar consulta. Entre em contacto connosco via telefone.";
    let statusCode = 500;

    // Verificar se é erro de validação de email
    if (error.response && error.response.body) {
      const errorBody = error.response.body;

      // Erro de email inválido ou domínio rejeitado
      if (
        errorBody.errors &&
        errorBody.errors.some(
          (err) =>
            err.message &&
            (err.message.includes("invalid email") ||
              err.message.includes("does not contain a valid address") ||
              err.message.includes("blocked"))
        )
      ) {
        errorMessage =
          "Falha ao marcar consulta. Verifique seu email ou entre em contacto via telefone.";
        statusCode = 400;
      }

      // Erro de quota excedida
      if (
        errorBody.errors &&
        errorBody.errors.some(
          (err) => err.message && err.message.includes("quota")
        )
      ) {
        errorMessage =
          "Falha ao marcar consulta. Entre em contacto connosco via telefone.";
        statusCode = 503;
      }
    }

    // Resposta de erro segura para o cliente (sem exposição de detalhes técnicos)
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      contactInfo: {
        phone1: "+244 933 000 331",
        phone2: "+244 928 616 519",
        email: "geral@myclinic.ao",
        address: "Shopping Fortaleza, Piso 2",
      },
    });
  }
}

// Exportar usando CommonJS para compatibilidade com require()
module.exports = handler;
