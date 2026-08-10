const Lead = require('../models/Lead');

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const nodemailer = require('nodemailer');

const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    const createdLead = await lead.save();

    // Automated CRM Follow-up via Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, 
        auth: {
          user: process.env.SMTP_USER || 'your_email@gmail.com',
          pass: process.env.SMTP_PASS || 'your_app_password',
        },
      });

      const mailOptions = {
        from: '"Nazmul Real Estate Team" <noreply@nazmulrealestate.com>',
        to: createdLead.email,
        subject: `Thank You for Your Inquiry - Nazmul Real Estate`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #0f172a;">Hi ${createdLead.name},</h2>
            <p>Thank you for reaching out to the Nazmul Real Estate Team regarding <strong>${createdLead.interest}</strong>.</p>
            <p>We have successfully received your message and our luxury real estate experts are currently reviewing your request. One of our senior agents will be in touch with you shortly at ${createdLead.phone || createdLead.email}.</p>
            <p>In the meantime, feel free to browse our <a href="https://nazmul-real-estate.vercel.app/listings" style="color: #d4af37;">exclusive property listings</a> or read our latest market insights.</p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>Nazmul Real Estate Team</strong><br/>
            <a href="https://nazmul-real-estate.vercel.app" style="color: #64748b; text-decoration: none;">www.nazmulrealestate.com</a></p>
          </div>
        `
      };
      
      // We don't await this so it doesn't block the API response
      transporter.sendMail(mailOptions).catch(err => console.error("Failed to send auto-reply CRM email:", err));
    } catch (mailError) {
      console.error("Nodemailer setup failed:", mailError);
    }

    res.status(201).json(createdLead);
  } catch (error) {
    res.status(400).json({ message: 'Invalid lead data', error: error.message });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (lead) {
      lead.status = req.body.status || lead.status;
      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

module.exports = { getLeads, createLead, updateLeadStatus };
