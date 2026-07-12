from odoo import http
from odoo.http import request


class AssetFlowPredictionController(http.Controller):

    @http.route(
        "/assetflow/predict",
        type="jsonrpc",
        auth="user",
        methods=["POST"],
    )
    def predict_asset(self, asset_id):
        return request.env[
            "assetflow.prediction"
        ].predict_asset(asset_id)