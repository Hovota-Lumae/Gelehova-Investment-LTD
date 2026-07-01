// GELEHOVA INVESTMENT LIMITED - Google Apps Script for Form Submissions
// This script receives form data from your website and stores it in Google Sheets
// Deploy as Web App to receive form submissions

// Configuration
const SHEET_NAME = "Contact Submissions";
const SPREADSHEET_ID = '1VK95ezHLEKSi_NSn0DUDjuxBWjyNNF_s4sxMg-noz3s'; // GeleHova sheet ID

// Get or create the sheet for storing submissions
function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers
    const headers = [
      "Timestamp",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Company",
      "Project Type",
      "Message",
      "Newsletter",
    ];
    sheet.appendRow(headers);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#F4B82F");
    headerRange.setFontColor("#1F2937");
    headerRange.setFontWeight("bold");

    // Set column widths
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 120);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 180);
    sheet.setColumnWidth(5, 120);
    sheet.setColumnWidth(6, 150);
    sheet.setColumnWidth(7, 150);
    sheet.setColumnWidth(8, 300);
    sheet.setColumnWidth(9, 100);

    // Freeze header row
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// Handle POST requests from the contact page
function doPost(e) {
  try {
    // Support both JSON POST (from fetch) and form-encoded POST (e.parameter)
    var params = {};

    if (e.postData && e.postData.contents) {
      var contentType = e.postData.type || '';
      if (contentType.indexOf('application/json') !== -1) {
        params = JSON.parse(e.postData.contents);
      } else {
        // e.parameter contains parsed form fields for urlencoded/form-data
        params = e.parameter || {};
      }
    } else {
      params = e.parameter || {};
    }

    // Map contact.html field names to parameter variables
    var firstName = params['first-name'] || params.firstName || '';
    var lastName = params['last-name'] || params.lastName || '';
    var email = params.email || '';
    var phone = params.phone || '';
    var projectType = params['project-type'] || params.projectType || '';
    var message = params.message || params.projectDetails || params.projectDetails || '';
    var newsletter = 'No';
    if (params.newsletter) {
      var nl = params.newsletter;
      if (nl === 'on' || nl === 'true' || nl === 'Yes' || nl === 'yes') {
        newsletter = 'Yes';
      } else {
        newsletter = String(nl);
      }
    }

    // Open spreadsheet using configured constant
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet does not exist, create with headers that match contact page
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = [
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Project Type',
        'Message',
        'Newsletter',
        'Status'
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#F4B82F');
      headerRange.setFontColor('#1F2937');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Append the submission row
    var status = 'New';
    sheet.appendRow([new Date(), firstName, lastName, email, phone, projectType, message, newsletter, status]);

    // Send admin notification (use the provided admin address)
    try {
      MailApp.sendEmail({
        to: 'gelehovainvestmentltd@gmail.com',
        subject: 'New Lead - GeleHova Website',
        body: 'Name: ' + firstName + ' ' + lastName + '\nEmail: ' + email + '\nPhone: ' + phone + '\nType: ' + projectType + '\nDetails: ' + message
      });
    } catch (mailErr) {
      Logger.log('Mail send error: ' + mailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error in doPost: ' + error);
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Send confirmation email to user
function sendConfirmationEmail(email, firstName) {
  if (!email) return;

  const subject = "We Received Your Message - GELEHOVA INVESTMENT LIMITED";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1A222E 0%, #000 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">GELEHOVA</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">INVESTMENT LIMITED</p>
      </div>
      
      <div style="background: #f9fafb; padding: 40px 20px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1F2937; margin-top: 0;">Thank You for Reaching Out!</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Hi ${firstName || "there"},
        </p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          We've received your message and appreciate you taking the time to contact us. Our team will review your project details and get back to you within 24 hours with a personalized consultation and quote.
        </p>
        
        <div style="background: #ffffff; border-left: 4px solid #F4B82F; padding: 20px; margin: 30px 0; border-radius: 4px;">
          <p style="margin: 0; color: #4b5563;"><strong>What happens next:</strong></p>
          <ul style="color: #4b5563; margin: 10px 0 0 0; padding-left: 20px;">
            <li>Our team reviews your project details</li>
            <li>We prepare a detailed consultation</li>
            <li>You'll hear from us within 24 hours</li>
          </ul>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          If you have any urgent matters, feel free to call us directly at <strong>+675 7056 0102</strong> (Mon-Fri, 8AM-4PM)
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          GELEHOVA Investment Limited<br>
          Papua New Guinea, Bomana, Section 04, Allotment 07<br>
          Email: piopeter0147@gmail.com<br>
          Emergency: +675 7061 3174
        </p>
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail(email, subject, "", { htmlBody: htmlBody });
  } catch (error) {
    Logger.log("Error sending confirmation email: " + error);
  }
}

// Send notification to admin
function sendAdminNotification(params) {
  const adminEmail = "piopeter0147@gmail.com"; // Replace with your email

  const subject = `New Contact Form Submission - ${params.firstName} ${params.lastName}`;

  const textBody = `
New Contact Form Submission

Name: ${params.firstName} ${params.lastName}
Email: ${params.email}
Phone: ${params.phone || "N/A"}
Company: ${params.company || "N/A"}
Project Type: ${params.projectType || "N/A"}
Newsletter: ${params.newsletter}

Message:
${params.message}

Submitted: ${params.timestamp}
  `;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #1F2937;">📬 New Contact Form Submission</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; width: 150px;">Name</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${params.firstName} ${params.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Email</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${params.email}">${params.email}</a></td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${params.phone || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Company</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${params.company || "N/A"}</td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Project Type</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${params.projectType || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Newsletter</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${params.newsletter}</td>
        </tr>
      </table>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1F2937;">Message:</h3>
        <p style="white-space: pre-wrap; color: #4b5563;">${params.message}</p>
      </div>
      
      <p style="color: #6b7280; font-size: 12px;">
        Submitted: ${params.timestamp}
      </p>
    </div>
  `;

  try {
    MailApp.sendEmail(adminEmail, subject, textBody, { htmlBody: htmlBody });
  } catch (error) {
    Logger.log("Error sending admin notification: " + error);
  }
}

// For GET requests (testing)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: false,
      message: "This endpoint only accepts POST requests from the contact form",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
