<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="KUETFilmSociety.Admin" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - KUET Film Society</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body {
            background: #0a0a0a;
            color: white;
            min-height: 100vh;
            padding: 40px 20px;
        }

        .admin-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .admin-header h1 {
            font-size: 2rem;
            font-weight: 800;
            color: white;
        }

        .admin-header h1 span {
            color: #d31010;
        }

        .admin-header p {
            color: rgba(255,255,255,0.5);
            margin-top: 8px;
            font-size: 0.9rem;
        }

        .queue-wrapper {
            max-width: 900px;
            margin: 0 auto;
        }

        .queue-title {
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 2px;
            color: rgba(255,255,255,0.4);
            text-transform: uppercase;
            margin-bottom: 16px;
            padding-left: 4px;
        }

        .queue-title span {
            color: #d31010;
            margin-left: 8px;
        }

        .member-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.07);
            border-left: 3px solid #d31010;
            border-radius: 10px;
            padding: 18px 22px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            transition: background 0.2s ease;
        }

        .member-card:hover {
            background: rgba(211,16,16,0.06);
        }

        .member-left {
            display: flex;
            align-items: center;
            gap: 18px;
            flex: 1;
            flex-wrap: wrap;
        }

        .member-index {
            font-size: 1.1rem;
            font-weight: 800;
            color: #d31010;
            min-width: 28px;
        }

        .member-info {
            flex: 1;
        }

        .member-name {
            font-size: 1rem;
            font-weight: 700;
            color: white;
            margin-bottom: 4px;
        }

        .member-details {
            font-size: 0.78rem;
            color: rgba(255,255,255,0.45);
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .member-details span {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .delete-btn {
            background: rgba(211,16,16,0.15);
            color: #d31010;
            border: 1px solid rgba(211,16,16,0.4);
            padding: 8px 18px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            letter-spacing: 0.5px;
            transition: all 0.2s ease;
            white-space: nowrap;
        }

        .delete-btn:hover {
            background: #d31010;
            color: white;
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
            color: rgba(255,255,255,0.2);
            font-size: 1rem;
        }

        .submitted-time {
            font-size: 0.72rem;
            color: rgba(255,255,255,0.25);
            margin-top: 4px;
        }
    </style>
</head>
<body>

    <div class="admin-header">
        <h1>KUET Film Society <span>Admin Panel</span></h1>
        <p>All submitted membership applications</p>
    </div>

    <form runat="server">

        <div class="queue-wrapper">

            <div class="queue-title">
                Applications Queue
                <span>
                    <asp:Label ID="lblCount" runat="server" Text="0"></asp:Label> total
                </span>
            </div>

            <asp:Repeater ID="rptMembers" runat="server" OnItemCommand="rptMembers_ItemCommand">
                <ItemTemplate>
                    <div class="member-card">
                        <div class="member-left">
                            <div class="member-index"><%# Container.ItemIndex + 1 %></div>
                            <div class="member-info">
                                <div class="member-name"><%# Eval("FullName") %></div>
                                <div class="member-details">
                                    <span>✉ <%# Eval("KUETMail") %></span>
                                    <span>🎓 Roll: <%# Eval("RollNumber") %></span>
                                    <span>📅 Batch: <%# Eval("Batch") %></span>
                                    <span>📱 <%# Eval("MobileNumber") %></span>
                                </div>
                                <div class="submitted-time">
                                    Submitted: <%# Eval("SubmittedAt", "{0:dd MMM yyyy, hh:mm tt}") %>
                                </div>
                            </div>
                        </div>
                        <asp:Button 
                            runat="server"
                            CommandName="DeleteMember"
                            CommandArgument='<%# Eval("Id") %>'
                            Text="DELETE"
                            CssClass="delete-btn"
                            OnClientClick="return confirm('Delete this application?');" />
                    </div>
                </ItemTemplate>
            </asp:Repeater>

            <asp:Label ID="lblEmpty" runat="server" Visible="false">
                <div class="empty-state">No applications submitted yet.</div>
            </asp:Label>

        </div>

    </form>

</body>
</html>