from odoo import models, fields, api


class AssetMaintenance(models.Model):
    _name = "assetflow.maintenance"
    _description = "Asset Maintenance"
    _inherit = ["mail.thread", "mail.activity.mixin"]
    _order = "service_date desc"

    name = fields.Char(
        string="Maintenance Reference",
        required=True,
        default="New",
        tracking=True,
    )

    asset_id = fields.Many2one(
        "assetflow.asset",
        string="Asset",
        required=True,
        ondelete="cascade",
        tracking=True,
    )

    service_date = fields.Date(
        string="Service Date",
        default=fields.Date.today,
        required=True,
    )

    issue = fields.Text(
        string="Issue Description",
        required=True,
    )

    cost = fields.Float(
        string="Maintenance Cost",
    )

    technician = fields.Char(
        string="Technician",
    )

    status = fields.Selection(
        [
            ("pending", "Pending"),
            ("in_progress", "In Progress"),
            ("completed", "Completed"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        default="pending",
        required=True,
        tracking=True,
    )

    notes = fields.Text(
        string="Maintenance Notes",
    )

    def _update_asset_status(self):
        for record in self:
            if not record.asset_id:
                continue

            if record.status == "in_progress":
                record.asset_id.status = "maintenance"

            elif record.status == "completed":
                record.asset_id.last_service = record.service_date

                if record.asset_id.employee_id:
                    record.asset_id.status = "assigned"
                else:
                    record.asset_id.status = "available"

            elif record.status == "cancelled":
                if record.asset_id.employee_id:
                    record.asset_id.status = "assigned"
                else:
                    record.asset_id.status = "available"


    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        records._update_asset_status()
        return records


    def write(self, vals):
        result = super().write(vals)

        if "status" in vals or "asset_id" in vals:
            self._update_asset_status()

        return result