# 📧 Configuração da API de Email - MyClinic Angola

Este projeto inclui uma API serverless para envio de emails de agendamento de consultas usando SendGrid e Vercel.

## 🚀 Configuração Rápida

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configuração do SendGrid

1. **Criar conta no SendGrid:**
   - Acesse [SendGrid](https://sendgrid.com/)
   - Crie uma conta gratuita (100 emails/dia)

2. **Obter API Key:**
   - Acesse [SendGrid API Keys](https://app.sendgrid.com/settings/api_keys)
   - Clique em "Create API Key"
   - Nome: `MyClinic-Website`
   - Permissões: **Full Access** (ou Mail Send apenas)
   - Copie a API Key gerada

3. **Domain Authentication (Opcional mas Recomendado):**
   - Acesse [Domain Authentication](https://app.sendgrid.com/settings/sender_auth)
   - Configure seu domínio (myclinic.ao)

### 3. Configuração das Variáveis de Ambiente

#### No Vercel (Produção):
1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

```env
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
CLINIC_EMAIL=geral@myclinic.ao
FROM_EMAIL=noreply@myclinic.ao
NODE_ENV=production
```

#### Para Desenvolvimento Local:
1. Copie o arquivo `.env` e configure:

```env
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
CLINIC_EMAIL=geral@myclinic.ao
FROM_EMAIL=noreply@myclinic.ao
NODE_ENV=development
```

### 4. Deploy no Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📋 Como Funciona

### Fluxo do Email:

1. **Usuário preenche formulário** no site
2. **JavaScript** envia dados para `/api/send-email`
3. **API serverless** processa e valida dados
4. **SendGrid** envia email para `CLINIC_EMAIL`
5. **Usuário recebe confirmação** via notificação

### Dados Coletados:

- ✅ **Nome** (obrigatório)
- ✅ **Email** (obrigatório)
- ✅ **Telefone** (obrigatório)
- ✅ **Serviço** solicitado
- ✅ **Data** preferida
- ✅ **Horário** preferido
- ✅ **Mensagem** adicional

## 🎨 Template de Email

O template HTML inclui:

- ✅ **Design responsivo** matching site
- ✅ **Cores da marca** MyClinic
- ✅ **Informações organizadas** em cards
- ✅ **Call-to-action** claro
- ✅ **Informações de contacto**
- ✅ **Mobile-first** design

## 🔧 Customização

### Alterar Email de Destino:
```env
CLINIC_EMAIL=seu-novo-email@myclinic.ao
```

### Alterar Template:
Edite a função `createEmailTemplate()` em `/api/send-email.js`

### Adicionar Campos:
1. Atualize o formulário HTML
2. Modifique a API para processar novos campos
3. Atualize o template de email

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
vercel dev

# Ou usar Python para servir arquivos estáticos
python3 -m http.server 8000
```

## 📱 Testes

### Testar API:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "+244 900 000 000",
    "service": "Limpeza",
    "date": "2024-01-15",
    "time": "14:00"
  }'
```

### Testar no Site:
1. Abra o site localmente
2. Preencha o formulário de contacto
3. Verifique as notificações
4. Confirme recebimento do email

## 🚨 Troubleshooting

### Erro: "API Key inválida"
- Verifique se a SENDGRID_API_KEY está correta
- Confirme se a API Key tem permissões Mail Send

### Erro: "Domain not authenticated"
- Configure Domain Authentication no SendGrid
- Use email verificado no FROM_EMAIL

### Emails não chegam:
- Verifique spam/lixo eletrônico
- Confirme se CLINIC_EMAIL está correto
- Teste com outro email de destino

### CORS Errors:
- API já configurada para aceitar requests de qualquer origem
- Para produção, configure origins específicas

## 📊 Monitoramento

### SendGrid Dashboard:
- [Activity Feed](https://app.sendgrid.com/email_activity)
- [Statistics](https://app.sendgrid.com/statistics)
- [Suppressions](https://app.sendgrid.com/suppressions)

### Vercel Functions:
- [Functions Log](https://vercel.com/dashboard) → Seu projeto → Functions

## 💡 Próximos Passos

- [ ] Adicionar reCAPTCHA para segurança
- [ ] Implementar rate limiting
- [ ] Adicionar webhook para confirmações
- [ ] Integrar com sistema de agendamento
- [ ] Adicionar notificações SMS
- [ ] Implementar fila de emails

---

## 📞 Suporte

Para dúvidas sobre a configuração:
- 📧 Email: suporte@myclinic.ao
- 📱 WhatsApp: +244 933 000 331

**Desenvolvido com ❤️ para MyClinic Angola**