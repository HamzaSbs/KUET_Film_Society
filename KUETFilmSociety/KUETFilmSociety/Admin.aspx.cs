using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

namespace KUETFilmSociety
{
    public partial class Admin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadMembers();
            }
        }

        private void LoadMembers()
        {
            string connStr = ConfigurationManager
                             .ConnectionStrings["KUETFilmDB"].ConnectionString;
            try
            {
                using (SqlConnection conn = new SqlConnection(connStr))
                {
                    conn.Open();
                    string sql = "SELECT * FROM Members ORDER BY SubmittedAt DESC";

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        if (dt.Rows.Count == 0)
                        {
                            rptMembers.Visible = false;
                            lblEmpty.Visible = true;
                            lblCount.Text = "0";
                        }
                        else
                        {
                            rptMembers.Visible = true;
                            lblEmpty.Visible = false;
                            rptMembers.DataSource = dt;
                            rptMembers.DataBind();
                            lblCount.Text = dt.Rows.Count.ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                lblCount.Text = "Error: " + ex.Message;
            }
        }

        protected void rptMembers_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            if (e.CommandName == "DeleteMember")
            {
                // Get the ID of the member to delete
                int memberId = Convert.ToInt32(e.CommandArgument);

                string connStr = ConfigurationManager
                                 .ConnectionStrings["KUETFilmDB"].ConnectionString;
                try
                {
                    using (SqlConnection conn = new SqlConnection(connStr))
                    {
                        conn.Open();
                        string sql = "DELETE FROM Members WHERE Id = @Id";

                        using (SqlCommand cmd = new SqlCommand(sql, conn))
                        {
                            cmd.Parameters.AddWithValue("@Id", memberId);
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    lblCount.Text = "Error: " + ex.Message;
                }

                // Reload the list after deleting
                LoadMembers();
            }
        }
    }
}