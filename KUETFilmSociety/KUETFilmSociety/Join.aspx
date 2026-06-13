<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Join.aspx.cs" Inherits="KUETFilmSociety.Join" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join Us - KUET Film Society</title>
    <%-- CSS links updated to point to css folder --%>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/join.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Announcement Banner -->
    <a href="index.html#events" class="event-announcement">
        <div class="announcement-content">
            <span class="live-dot"></span>
            <p><strong>Next Screening:</strong> Bonolota Express • Friday, Oct 27 • 5:30 PM</p>
            <span class="click-text">Click Here</span>
        </div>
    </a>

    <!-- Header -->
    <header class="join-header">
        <nav class="navbar">
            <div class="logo-container">
                <a href="index.html">
                    <%-- Update image path to images folder --%>
                    <img src="images/WhatsApp Image 2026-04-15 at 11.22.22 PM.jpeg" alt="KUET Film Society Logo" class="logo">
                </a>
            </div>
            <a href="index.html" class="back-btn">← BACK</a>
        </nav>
        <div class="join-hero-content">
            <h1>Join Our Community</h1>
            <p class="join-tagline">Be Part of Something Cinematic</p>
        </div>
    </header>

    <!-- Join Form Section -->
    <section class="join-form-section">
        <div class="form-container">

            <%-- This is the ASP.NET form — runat="server" is required --%>
            <asp:Panel ID="FormPanel" runat="server">
            <form id="joinForm" class="join-form" runat="server">

                <%-- Success and Error messages — hidden by default --%>
                <asp:Label ID="lblMessage" runat="server" Visible="false" 
                    Style="display:block; padding:12px; border-radius:8px; 
                           font-weight:700; text-align:center; margin-bottom:10px;">
                </asp:Label>

                <div class="form-group">
                    <%-- TextBox replaces <input type="text"> --%>
                    <asp:TextBox ID="txtName" runat="server" 
                        CssClass="form-input"
                        placeholder="Full Name" />
                </div>

                <div class="form-group">
                    <asp:TextBox ID="txtEmail" runat="server" 
                        TextMode="Email"
                        CssClass="form-input"
                        placeholder="KUET Mail (e.g., name@stud.kuet.ac.bd)" />
                </div>

                <div class="form-group">
                    <asp:TextBox ID="txtRoll" runat="server" 
                        CssClass="form-input"
                        placeholder="KUET Roll Number" />
                </div>

                <div class="form-group">
                    <asp:TextBox ID="txtBatch" runat="server" 
                        CssClass="form-input"
                        placeholder="Batch (e.g., 2023)" />
                </div>

                <div class="form-group">
                    <asp:TextBox ID="txtMobile" runat="server" 
                        TextMode="Phone"
                        CssClass="form-input"
                        placeholder="Mobile Number" />
                </div>

                <%-- Button replaces <button type="submit"> --%>
                <asp:Button ID="btnSubmit" runat="server" 
                    Text="SUBMIT" 
                    CssClass="submit-btn"
                    OnClick="btnSubmit_Click" />

            </form>
            </asp:Panel>

        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-left">
                <h3 class="footer-logo">KUET Film Society</h3>
            </div>
            <div class="footer-center">
                <a href="index.html#about">About</a>
                <a href="index.html#movies">Movies</a>
                <a href="index.html#events">Events</a>
            </div>
            <div class="footer-right">
                <a href="https://www.facebook.com/share/1BJqsBvQ8F/" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="mailto:filmsocietykuet@gmail.com">
                    <i class="fas fa-envelope"></i>
                </a>
                <a href="https://www.youtube.com/kuetfilmsociety" target="_blank">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 KUET Film Society. All Rights Reserved.</p>
        </div>
    </footer>

</body>
</html>