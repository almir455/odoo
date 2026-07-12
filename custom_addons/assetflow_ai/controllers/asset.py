from odoo import http
from odoo.http import request


class AssetFlowAssetController(http.Controller):

    @http.route(
        "/assetflow/assets",
        type="jsonrpc",
        auth="user",
        methods=["POST"],
    )
    def get_assets(self):
        assets = request.env["assetflow.asset"].sudo().search([])

        return [{
            "id": asset.id,
            "name": asset.name,
            "serial_number": asset.serial_number,
            "purchase_date": str(asset.purchase_date or ""),
            "purchase_cost": asset.purchase_cost,
            "condition": asset.condition,
            "status": asset.status,
            "location": asset.location,
        } for asset in assets]

    @http.route(
        "/assetflow/assets/create",
        type="jsonrpc",
        auth="user",
        methods=["POST"],
    )
    def create_asset(
        self,
        name,
        serial_number=None,
        purchase_date=None,
        purchase_cost=0,
        condition="good",
        location=None,
    ):
        asset = request.env["assetflow.asset"].sudo().create({
            "name": name,
            "serial_number": serial_number,
            "purchase_date": purchase_date or False,
            "purchase_cost": float(purchase_cost or 0),
            "condition": condition,
            "location": location,
            "status": "available",
        })

        return {
            "success": True,
            "asset_id": asset.id,
            "name": asset.name,
        }