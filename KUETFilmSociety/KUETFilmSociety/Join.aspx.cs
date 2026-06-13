using System;
using System.Configuration;
using System.Data.SqlClient;

namespace KUETFilmSociety
{
    public partial class Join : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Nothing needed here for now
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            // Step 1: Read values from the form fields
            string fullName = txtName.Text.Trim();
            string kuetMail = txtEmail.Text.Trim();
            string rollNumber = txtRoll.Text.Trim();
            string batch = txtBatch.Text.Trim();
            string mobile = txtMobile.Text.Trim();

            // Step 2: Basic check — make sure nothing is empty
            if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(kuetMail) ||
                string.IsNullOrEmpty(rollNumber) || string.IsNullOrEmpty(batch) ||
                string.IsNullOrEmpty(mobile))
            {
                // Show red error message
                lblMessage.Text = "✗ Please fill in all fields.";
                lblMessage.Style["background"] = "#d31010";
                lblMessage.Style["color"] = "white";
                lblMessage.Visible = true;
                return;
            }

            // Step 3: Get connection string from Web.config
            string connStr = ConfigurationManager.ConnectionStrings["KUETFilmDB"].ConnectionString;

            // Step 4: Connect to database and insert the data
            try
            {
                using (SqlConnection conn = new SqlConnection(connStr))
                {
                    conn.Open();

                    // SQL command to insert one row into Members table
                    string sql = @"INSERT INTO Members 
                                   (FullName, KUETMail, RollNumber, Batch, MobileNumber) 
                                   VALUES 
                                   (@FullName, @KUETMail, @RollNumber, @Batch, @MobileNumber)";

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        // Attach form values to SQL parameters safely
                        cmd.Parameters.AddWithValue("@FullName", fullName);
                        cmd.Parameters.AddWithValue("@KUETMail", kuetMail);
                        cmd.Parameters.AddWithValue("@RollNumber", rollNumber);
                        cmd.Parameters.AddWithValue("@Batch", batch);
                        cmd.Parameters.AddWithValue("@MobileNumber", mobile);

                        cmd.ExecuteNonQuery(); // Run the INSERT
                    }
                }

                // Step 5: Show success message and clear the form
                lblMessage.Text = "✓ Submitted Successfully!";
                lblMessage.Style["background"] = "#4CAF50";
                lblMessage.Style["color"] = "white";
                lblMessage.Visible = true;

                // Clear all fields
                txtName.Text = "";
                txtEmail.Text = "";
                txtRoll.Text = "";
                txtBatch.Text = "";
                txtMobile.Text = "";
            }
            catch (Exception ex)
            {
                // Show error if something went wrong
                lblMessage.Text = "✗ Something went wrong: " + ex.Message;
                lblMessage.Style["background"] = "#d31010";
                lblMessage.Style["color"] = "white";
                lblMessage.Visible = true;
            }
        }
    }
}