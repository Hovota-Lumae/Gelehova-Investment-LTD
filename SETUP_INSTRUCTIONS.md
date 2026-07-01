# Google Forms to Google Sheets Integration Setup Guide
## Gelehova Investment Limited - Contact Form

---

## Overview
Your website now has a contact form that submits data directly to Google Sheets via Google Apps Script. No backend server needed!

**Files Created:**
- `js/form-handler.js` - Handles form submission to Google Apps Script
- `GOOGLE_APPS_SCRIPT.gs` - Backend script (deploy to Google Apps Script)

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Create"** to start a new spreadsheet
3. Name it: **"Gelehova Contact Submissions"**
4. Copy the **Spreadsheet ID** from the URL
   - URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Example: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

---

## Step 2: Set Up Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Delete the default `myFunction()` code
4. Copy the entire code from `GOOGLE_APPS_SCRIPT.gs` file into the editor
5. **Update the Spreadsheet ID:**
   - Find this line: `const SPREADSHEET_ID = "";`
   - Replace with your ID: `const SPREADSHEET_ID = "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p";`

6. **Update your admin email (optional):**
   - Find: `const adminEmail = "piopeter0147@gmail.com";`
   - Replace with your email address if different

7. Save the script (Ctrl+S)

---

## Step 3: Deploy as Web App

1. In Apps Script editor, click **"Deploy"** → **"New deployment"**
2. Click the **⚙️ (gear)** icon and select **"Web app"**
3. Fill in the form:
   - **Description:** Contact Form Receiver
   - **Execute as:** [Your Google Account]
   - **Who has access:** Anyone

4. Click **"Deploy"**
5. Review the permissions popup (click **"Authorize"**)
6. **Copy the Deployment URL** - This is important!
   - Format: `https://script.google.com/macros/d/{SCRIPT_ID}/userweb`

---

## Step 4: Add Deployment URL to Website

1. Open `js/form-handler.js` in your project
2. Find the first line: `const GOOGLE_APPS_SCRIPT_URL = "";`
3. Replace with your deployment URL:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb";
   ```

4. Save the file

---

## Step 5: Add Script to contact.html

1. Open `contact.html`
2. Find the closing `</body>` tag (near the end of the file)
3. Add this line **before** `</body>`:
   ```html
   <script src="js/form-handler.js"></script>
   ```

4. Save the file

---

## Step 6: Test the Form

1. **Open your website locally** and navigate to the contact page
2. Fill out the contact form with test data
3. Click **"Send Message"**
4. You should see a **green success message**
5. **Check your Google Sheet:**
   - Refresh your spreadsheet
   - New row should appear with your test data
6. **Check your email:**
   - You should receive a confirmation email

**Example test data:**
- First Name: John
- Last Name: Doe
- Email: john@example.com
- Phone: +675 1234 5678
- Project Type: Residential Construction
- Message: Testing the contact form

---

## Troubleshooting

### "Error sending message" appears
- ✅ Check that `GOOGLE_APPS_SCRIPT_URL` is correct in `form-handler.js`
- ✅ Verify the Apps Script is deployed (check deployment URL)
- ✅ Make sure Apps Script URL doesn't have trailing spaces

### Data not appearing in Google Sheet
- ✅ Verify `SPREADSHEET_ID` is correct in `GOOGLE_APPS_SCRIPT.gs`
- ✅ Check that you're signed in with the correct Google account
- ✅ Confirm Apps Script has permission to edit the sheet
- ✅ Review Apps Script logs: **Execution** → **View logs**

### Confirmation emails not received
- ✅ Check spam/junk folder
- ✅ Verify email address in form is correct
- ✅ Confirm Gmail account has permission to send (check Apps Script logs)

### Admin notification not working
- ✅ Verify admin email in Apps Script: `const adminEmail = "your@email.com";`
- ✅ Re-deploy the script after making changes
- ✅ Check Apps Script execution logs for errors

---

## Important Security Notes

1. **CORS Handling:** Apps Script deployment uses `mode: "no-cors"` for cross-origin requests. This is intentional and works correctly with Google's Apps Script servers.

2. **Email Notifications:** The script sends:
   - ✉️ **Confirmation email** to the user (from your Gmail account)
   - ✉️ **Admin notification** to your inbox
   - Both emails are formatted HTML for professional appearance

3. **Rate Limiting:** Google Sheets has limits:
   - Free tier: ~500 rows before slowdown
   - For high volume, upgrade to Google Sheets API

4. **Data Privacy:** 
   - All form data is stored in your private Google Sheet
   - Only you have access
   - Emails are sent through Google's secure servers

---

## Updating the Script

If you need to modify the form fields (add/remove fields):

### In `GOOGLE_APPS_SCRIPT.gs`:
1. Update the `headers` array with new field names
2. Update the `newRow` array to capture new fields
3. Redeploy the script

### In `contact.html`:
1. Add/modify form fields (name, email, phone, etc.)
2. Ensure field `name` attributes match what Apps Script expects

### In `js/form-handler.js`:
1. Update the `data` object to capture new form fields
2. Use the same field names as in the Apps Script

---

## Advanced: Schedule Notifications

To automatically email a summary of submissions daily:

1. In Apps Script editor, go to **Triggers** (clock icon on left)
2. Click **"Create new trigger"**
3. Set function: `dailySummaryEmail`
4. Set event source: **Time-driven**
5. Set type: **Day timer** (choose time)
6. Click **"Save"**

---

## File Reference

**contact.html** - Contact form with fields:
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Project Type (required)
- Message (required)
- Newsletter checkbox

**form-handler.js** - Handles:
- Form submission capture
- Data validation
- POST to Google Apps Script
- Success/error message display
- Form clearing on success

**GOOGLE_APPS_SCRIPT.gs** - Backend logic:
- Receives POST data from form
- Creates/updates Google Sheet
- Appends new submissions
- Sends confirmation emails
- Sends admin notifications

---

## Support & Questions

For issues or questions:
1. Check the Troubleshooting section above
2. Review Apps Script logs for error messages
3. Verify all configuration steps were completed
4. Contact: piopeter0147@gmail.com

---

**✅ Setup Complete!** Your contact form is now connected to Google Sheets. Submit test data to verify everything is working.
