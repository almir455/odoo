from odoo import models, fields, api

import base64
import io
import qrcode


class Asset(models.Model):
    _name = "assetflow.asset"
    _description = "Enterprise Asset"
    _inherit = ["mail.thread", "mail.activity.mixin"]

    name = fields.Char(
        string="Asset Name",
        required=True,
        tracking=True,
    )

    asset_type = fields.Selection(
        [
            ("laptop", "Laptop"),
            ("desktop", "Desktop"),
            ("mobile", "Mobile"),
            ("printer", "Printer"),
            ("server", "Server"),
            ("other", "Other"),
        ],
        string="Asset Type",
        required=True,
        tracking=True,
    )

    serial_number = fields.Char(
        string="Serial Number",
        required=True,
        copy=False,
    )

    qr_code = fields.Binary(
    string="Asset QR Code",
    compute="_compute_qr_code",
    store=True,
    attachment=False,   
    )

    purchase_date = fields.Date(
        string="Purchase Date",
    )

    purchase_cost = fields.Float(
        string="Purchase Cost",
    )

    condition = fields.Selection(
        [
            ("excellent", "Excellent"),
            ("good", "Good"),
            ("fair", "Fair"),
            ("poor", "Poor"),
        ],
        string="Condition",
        default="good",
        tracking=True,
    )

    status = fields.Selection(
        [
            ("available", "Available"),
            ("assigned", "Assigned"),
            ("maintenance", "Under Maintenance"),
            ("retired", "Retired"),
        ],
        string="Status",
        default="available",
        tracking=True,
    )

    employee_id = fields.Many2one(
        "hr.employee",
        string="Assigned Employee",
        tracking=True,
    )

    department_id = fields.Many2one(
        "hr.department",
        string="Department",
    )

    location = fields.Char(
        string="Location",
    )

    last_service = fields.Date(
        string="Last Service",
    )

    next_service = fields.Date(
        string="Next Service",
    )

    active = fields.Boolean(
        default=True,
    )

    _unique_serial_number = models.Constraint(
        "UNIQUE(serial_number)",
        "Serial Number must be unique!",
    )

    @api.onchange("employee_id")
    def _onchange_employee_id(self):
        if self.employee_id:
            self.department_id = self.employee_id.department_id
            self.status = "assigned"
        else:
            self.department_id = False
            self.status = "available"

    @api.depends("serial_number")
    def _compute_qr_code(self):
     for record in self:
        if not record.serial_number:
            record.qr_code = False
            continue

        qr_image = qrcode.make(
            f"ASSETFLOW:{record.serial_number}"
        )

        buffer = io.BytesIO()
        qr_image.save(buffer, format="PNG")

        record.qr_code = base64.b64encode(
            buffer.getvalue()
        )

    def _generate_smart_alerts(self):
        Alert = self.env["assetflow.alert"]

        for record in self:
            if record.condition == "poor":
                existing_alert = Alert.search([
                    ("asset_id", "=", record.id),
                    ("alert_type", "=", "condition"),
                    ("status", "=", "active"),
                ], limit=1)

                if not existing_alert:
                    Alert.create({
                        "name": "Poor Asset Condition",
                        "asset_id": record.id,
                        "alert_type": "condition",
                        "priority": "high",
                        "message": "Asset condition is poor and requires inspection.",
                        "recommended_action": "Inspect the asset and schedule maintenance.",
                    })

            if (
                record.next_service
                and record.next_service <= fields.Date.today()
            ):
                existing_alert = Alert.search([
                    ("asset_id", "=", record.id),
                    ("alert_type", "=", "maintenance"),
                    ("status", "=", "active"),
                ], limit=1)

                if not existing_alert:
                    Alert.create({
                        "name": "Maintenance Due",
                        "asset_id": record.id,
                        "alert_type": "maintenance",
                        "priority": "critical",
                        "message": "Preventive maintenance is due.",
                        "recommended_action": "Schedule maintenance immediately.",
                    })


    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        records._generate_smart_alerts()
        return records


    def write(self, vals):
        result = super().write(vals)

        if "condition" in vals or "next_service" in vals:
            self._generate_smart_alerts()

        return result
    
    def action_run_ai_prediction(self):
        self.ensure_one()

        result = self.env[
            "assetflow.prediction"
        ].predict_asset(self.id)

        return {
            "type": "ir.actions.client",
            "tag": "display_notification",
            "params": {
                "title": "AI Prediction Complete",
                "message": (
                    f"Failure Risk: "
                    f"{result['failure_probability']}% | "
                    f"Risk Level: "
                    f"{result['risk_level'].upper()}"
                ),
                "type": (
                    "danger"
                    if result["risk_level"] in ("high", "critical")
                    else "success"
                ),
                "sticky": True,
            },
        }