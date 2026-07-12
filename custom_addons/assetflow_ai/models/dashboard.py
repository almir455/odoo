from odoo import api, models


class AssetFlowDashboard(models.AbstractModel):
    _name = "assetflow.dashboard"
    _description = "AssetFlow Analytics Dashboard"

    @api.model
    def get_dashboard_data(self):
        Asset = self.env["assetflow.asset"]
        Maintenance = self.env["assetflow.maintenance"]
        Alert = self.env["assetflow.alert"]

        total_assets = Asset.search_count([])

        available_assets = Asset.search_count([
            ("status", "=", "available")
        ])

        assigned_assets = Asset.search_count([
            ("status", "=", "assigned")
        ])

        maintenance_assets = Asset.search_count([
            ("status", "=", "maintenance")
        ])

        active_alerts = Alert.search_count([
            ("status", "!=", "resolved")
        ])

        maintenance_records = Maintenance.search([])

        total_maintenance_cost = sum(
            maintenance_records.mapped("cost")
        )

        return {
            "total_assets": total_assets,
            "available_assets": available_assets,
            "assigned_assets": assigned_assets,
            "maintenance_assets": maintenance_assets,
            "active_alerts": active_alerts,
            "total_maintenance_cost": total_maintenance_cost,
        }