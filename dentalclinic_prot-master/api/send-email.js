const sgMail = require('@sendgrid/mail');

// Configurar SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Template HTML para email de confirmação ao cliente
const createClientConfirmationTemplate = (formData) => {
  const { name, service, date, time } = formData;
  
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Agendada - MyClinic Angola</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f8fafc;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .success-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .confirmation-card {
            background: #f0fdf4;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
            border-left: 4px solid #10b981;
        }
        
        .confirmation-title {
            font-size: 20px;
            font-weight: 600;
            color: #059669;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
        }
        
        .confirmation-title::before {
            content: "✅";
            margin-right: 8px;
            font-size: 24px;
        }
        
        .confirmation-message {
            font-size: 16px;
            color: #166534;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .appointment-details {
            background: white;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #d1fae5;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .detail-item:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: #374151;
        }
        
        .detail-value {
            color: #1f2937;
        }
        
        .next-steps {
            background: #eff6ff;
            border-radius: 12px;
            padding: 24px;
            margin-top: 30px;
            border-left: 4px solid #3b82f6;
        }
        
        .next-steps h3 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
        }
        
        .next-steps h3::before {
            content: "📋";
            margin-right: 8px;
        }
        
        .steps-list {
            list-style: none;
            padding: 0;
        }
        
        .steps-list li {
            padding: 8px 0;
            color: #1e40af;
            display: flex;
            align-items: flex-start;
        }
        
        .steps-list li::before {
            content: "→";
            margin-right: 8px;
            color: #3b82f6;
            font-weight: bold;
        }
        
        .footer {
            background: #1a1a1a;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 16px;
        }
        
        .footer-contact {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 20px;
        }
        
        .footer-address {
            font-size: 14px;
            opacity: 0.6;
            line-height: 1.5;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header, .content, .footer {
                padding: 24px 20px;
            }
            
            .detail-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="success-icon">🎉</div>
            <h1>Consulta Agendada com Sucesso!</h1>
            <p>MyClinic Angola - Cuidados Dentários de Excelência</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="confirmation-card">
                <div class="confirmation-title">
                    Parabéns, ${name}!
                </div>
                <div class="confirmation-message">
                    Sua marcação foi efetuada com sucesso! Recebemos sua solicitação de agendamento e entraremos em contacto consigo nas próximas horas para confirmar os detalhes da sua consulta.
                </div>
                
                <div class="appointment-details">
                    <div class="detail-item">
                        <span class="detail-label">Serviço Solicitado:</span>
                        <span class="detail-value">${service}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Data Preferida:</span>
                        <span class="detail-value">${date}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Horário Preferido:</span>
                        <span class="detail-value">${time}</span>
                    </div>
                </div>
            </div>
            
            <div class="next-steps">
                <h3>Próximos Passos</h3>
                <ul class="steps-list">
                    <li>Nossa equipa entrará em contacto em breve para confirmação</li>
                    <li>Mantenha seu telefone disponível nas próximas horas</li>
                    <li>Em caso de urgência, contacte-nos diretamente</li>
                    <li>Prepare-se para uma experiência de excelência</li>
                </ul>
            </div>
            
            <p style="font-size: 14px; color: #64748b; text-align: center; margin-top: 30px;">
                📱 <strong>Dúvidas?</strong> Entre em contacto connosco pelos telefones abaixo.
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">MyClinic</div>
            <div class="footer-contact">
                📞 +244 933 000 331 | +244 928 616 519<br>
                📧 geral@myclinic.ao
            </div>
            <div class="footer-address">
                Shopping Fortaleza, Piso 2<br>
                Luanda, Angola
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Template HTML para o email da clínica
const createEmailTemplate = (formData) => {
  const { name, email, phone, service, date, time, message } = formData;
  
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Consulta - MyClinic Angola</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f8fafc;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #0066cc 0%, #00a8e8 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .appointment-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
            border-left: 4px solid #0066cc;
        }
        
        .appointment-title {
            font-size: 20px;
            font-weight: 600;
            color: #0066cc;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .appointment-title::before {
            content: "🦷";
            margin-right: 8px;
            font-size: 24px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .info-icon {
            width: 20px;
            height: 20px;
            background: #0066cc;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .info-content {
            flex: 1;
        }
        
        .info-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .info-value {
            font-size: 16px;
            font-weight: 500;
            color: #1a1a1a;
        }
        
        .message-section {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
        }
        
        .message-title {
            font-size: 16px;
            font-weight: 600;
            color: #0066cc;
            margin-bottom: 12px;
        }
        
        .message-text {
            font-size: 15px;
            line-height: 1.6;
            color: #4a5568;
        }
        
        .footer {
            background: #1a1a1a;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            color: #0066cc;
            margin-bottom: 16px;
        }
        
        .footer-contact {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 20px;
        }
        
        .footer-address {
            font-size: 14px;
            opacity: 0.6;
            line-height: 1.5;
        }
        
        .priority-badge {
            display: inline-block;
            background: #ff6b35;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header, .content, .footer {
                padding: 24px 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Nova Consulta Agendada</h1>
            <p>MyClinic Angola - Cuidados Dentários de Excelência</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="priority-badge">🚨 Novo Agendamento</div>
            
            <div class="appointment-card">
                <div class="appointment-title">
                    Detalhes da Consulta
                </div>
                
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-icon">👤</div>
                        <div class="info-content">
                            <div class="info-label">Nome do Paciente</div>
                            <div class="info-value">${name}</div>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-icon">📧</div>
                        <div class="info-content">
                            <div class="info-label">Email</div>
                            <div class="info-value">${email}</div>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-icon">📱</div>
                        <div class="info-content">
                            <div class="info-label">Telefone</div>
                            <div class="info-value">${phone}</div>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-icon">🦷</div>
                        <div class="info-content">
                            <div class="info-label">Serviço Solicitado</div>
                            <div class="info-value">${service}</div>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-icon">📅</div>
                        <div class="info-content">
                            <div class="info-label">Data Preferida</div>
                            <div class="info-value">${date}</div>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-icon">🕐</div>
                        <div class="info-content">
                            <div class="info-label">Horário Preferido</div>
                            <div class="info-value">${time}</div>
                        </div>
                    </div>
                </div>
                
                ${message ? `
                <div class="message-section">
                    <div class="message-title">💬 Mensagem Adicional</div>
                    <div class="message-text">${message}</div>
                </div>
                ` : ''}
            </div>
            
            <p style="font-size: 14px; color: #64748b; text-align: center; margin-top: 30px;">
                ⏰ <strong>Ação Necessária:</strong> Entre em contacto com o paciente o mais rápido possível para confirmar a consulta.
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">MyClinic</div>
            <div class="footer-contact">
                📞 +244 933 000 331 | +244 928 616 519<br>
                📧 geral@myclinic.ao
            </div>
            <div class="footer-address">
                Shopping Fortaleza, Piso 2<br>
                Luanda, Angola
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Função principal da API
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responder a requisições OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Apenas aceitar POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido. Use POST.' 
    });
  }

  try {
    // Validar se as variáveis de ambiente estão configuradas
    if (!process.env.SENDGRID_API_KEY || !process.env.CLINIC_EMAIL) {
      return res.status(500).json({ 
        success: false, 
        message: 'Configuração do servidor incompleta. Contacte o administrador.' 
      });
    }

    // Extrair dados do formulário
    const { name, email, phone, service, date, time, message } = req.body;

    // Validação básica
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e telefone são obrigatórios.' 
      });
    }

    // Validação de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email inválido.' 
      });
    }

    // Dados do formulário para o template
    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service || 'Consulta Geral',
      date: date || 'A definir',
      time: time || 'A definir',
      message: message ? message.trim() : ''
    };

    // Configurar email para a clínica
    const clinicMsg = {
      to: process.env.CLINIC_EMAIL, // Email da clínica
      from: {
        email: process.env.FROM_EMAIL || 'noreply@myclinic.ao',
        name: 'MyClinic Angola - Website'
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
Serviço: ${service || 'Consulta Geral'}
Data Preferida: ${date || 'A definir'}
Horário Preferido: ${time || 'A definir'}
${message ? `\nMensagem: ${message}` : ''}

Entre em contacto com o paciente o mais rápido possível para confirmar a consulta.
      `
    };

    // Enviar apenas email para a clínica
    await sgMail.send(clinicMsg);

    // Resposta de sucesso
    res.status(200).json({
      success: true,
      message: 'Sua marcação foi efetuada com sucesso! Entraremos em contacto consigo.'
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    // Log detalhado do erro (apenas no servidor)
    if (error.response) {
      console.error('SendGrid Error:', error.response.body);
    }

    // Determinar tipo de erro e resposta apropriada
    let errorMessage = 'Falha ao marcar consulta. Entre em contacto connosco via telefone.';
    let statusCode = 500;

    // Verificar se é erro de validação de email
    if (error.response && error.response.body) {
      const errorBody = error.response.body;
      
      // Erro de email inválido ou domínio rejeitado
      if (errorBody.errors && errorBody.errors.some(err => 
        err.message && (
          err.message.includes('invalid email') || 
          err.message.includes('does not contain a valid address') ||
          err.message.includes('blocked')
        )
      )) {
        errorMessage = 'Falha ao marcar consulta. Verifique seu email ou entre em contacto via telefone.';
        statusCode = 400;
      }
      
      // Erro de quota excedida
      if (errorBody.errors && errorBody.errors.some(err => 
        err.message && err.message.includes('quota')
      )) {
        errorMessage = 'Falha ao marcar consulta. Entre em contacto connosco via telefone.';
        statusCode = 503;
      }
    }

    // Resposta de erro segura para o cliente (sem exposição de detalhes técnicos)
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      contactInfo: {
        phone1: '+244 933 000 331',
        phone2: '+244 928 616 519',
        email: 'geral@myclinic.ao',
        address: 'Shopping Fortaleza, Piso 2'
      }
    });
  }
}