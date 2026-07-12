from odoo import models, fields, api
from datetime import date


class AssetPrediction(models.Model):
    _name = "assetflow.prediction"
    _description = "AI Asset Failure Prediction"
    _order = "prediction_date desc"

    asset_id = fields.Many2one(
        "assetflow.asset",
        string="Asset",
        required=True,
        ondelete="cascade",
    )

    failure_probability = fields.Float(
        string="Failure Probability (%)",
    )

    health_score = fields.Float(
        string="Health Score",
    )

    risk_level = fields.Selection(
        [
            ("low", "Low"),
            ("medium", "Medium"),
            ("high", "High"),
            ("critical", "Critical"),
        ],
        string="Risk Level",
    )

    recommended_action = fields.Text(
        string="Recommended Action",
    )

    prediction_date = fields.Datetime(
        default=fields.Datetime.now,
        readonly=True,
    )

    @api.model
    def predict_asset(self, asset_id):
        asset = self.env["assetflow.asset"].browse(asset_id)

        if not asset.exists():
            return {
                "error": "Asset not found",
            }

        failure_probability = 10.0

        condition_scores = {
            "excellent": 0,
            "good": 10,
            "fair": 30,
            "poor": 55,
            "critical": 80,
        }

        failure_probability += condition_scores.get(
            asset.condition,
            20,
        )

        maintenance_count = self.env[
            "assetflow.maintenance"
        ].search_count([
            ("asset_id", "=", asset.id),
        ])

        failure_probability += min(
            maintenance_count * 5,
            20,
        )

        if asset.status == "maintenance":
            failure_probability += 15

        failure_probability = min(
            failure_probability,
            100,
        )

        health_score = max(
            100 - failure_probability,
            0,
        )

        if failure_probability >= 75:
            risk_level = "critical"
            recommendation = (
                "Immediate maintenance required. "
                "Asset has a high probability of failure."
            )

        elif failure_probability >= 50:
            risk_level = "high"
            recommendation = (
                "Schedule maintenance within 7 days."
            )

        elif failure_probability >= 25:
            risk_level = "medium"
            recommendation = (
                "Monitor asset condition and perform inspection."
            )

        else:
            risk_level = "low"
            recommendation = (
                "Asset is operating normally."
            )

        prediction = self.create({
            "asset_id": asset.id,
            "failure_probability": failure_probability,
            "health_score": health_score,
            "risk_level": risk_level,
            "recommended_action": recommendation,
        })

        if risk_level in ("high", "critical"):
            existing_alert = self.env[
                "assetflow.alert"
            ].search([
                ("asset_id", "=", asset.id),
                ("alert_type", "=", "ai_prediction"),
                ("status", "!=", "resolved"),
            ], limit=1)

            if not existing_alert:
                self.env["assetflow.alert"].create({
                    "name": "AI Failure Risk Detected",
                    "asset_id": asset.id,
                    "alert_type": "ai_prediction",
                    "priority": risk_level,
                    "failure_probability": failure_probability,
                    "message": (
                        "Prediction engine detected "
                        "elevated asset failure risk."
                    ),
                    "recommended_action": recommendation,
                })

        return {
            "prediction_id": prediction.id,
            "asset_id": asset.id,
            "failure_probability": failure_probability,
            "health_score": health_score,
            "risk_level": risk_level,
            "recommended_action": recommendation,
        }