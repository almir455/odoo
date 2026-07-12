from odoo import models, fields, api


class AssetAlert(models.Model):
    _name = "assetflow.alert"
    _description = "Asset Maintenance Alert"
    _order = "created_at desc"

    name = fields.Char(
        string="Alert",
        required=True,
    )

    asset_id = fields.Many2one(
        "assetflow.asset",
        string="Asset",
        required=True,
        ondelete="cascade",
    )

    alert_type = fields.Selection(
        [
            ("maintenance", "Maintenance"),
            ("condition", "Asset Condition"),
            ("ai_prediction", "AI Prediction"),
        ],
        string="Alert Type",
        required=True,
    )

    priority = fields.Selection(
        [
            ("low", "Low"),
            ("medium", "Medium"),
            ("high", "High"),
            ("critical", "Critical"),
        ],
        default="medium",
        required=True,
    )

    message = fields.Text(
        string="Alert Message",
    )

    created_at = fields.Datetime(
        string="Created At",
        default=fields.Datetime.now,
        readonly=True,
    )

    status = fields.Selection(
        [
            ("active", "Active"),
            ("resolved", "Resolved"),
        ],
        default="active",
    )

    failure_probability = fields.Float(
        string="Failure Probability (%)",
    )

    recommended_action = fields.Text(
        string="Recommended Action",
    )

    def action_resolve(self):
        self.write({
            "status": "resolved"
        })