from odoo import http
from odoo.http import request


class AssetFlowDashboardController(http.Controller):

    @http.route(
        "/assetflow/dashboard",
        type="jsonrpc",
        auth="user",
        methods=["POST"],
    )
    def get_dashboard_data(self):
        return request.env[
            "assetflow.dashboard"
        ].get_dashboard_data()