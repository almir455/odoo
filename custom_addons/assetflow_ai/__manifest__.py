{
    "name": "AssetFlow AI",
    "version": "1.0.0",
    "summary": "Smart Enterprise Asset Management System",
    "description": """
AssetFlow AI is a smart enterprise asset and
maintenance management system.
    """,
    "author": "AssetFlow Team",
    "category": "Operations",
    "depends": [
        "base",
        "hr",
        "mail",
    ],
    "data": [
    "security/ir.model.access.csv",
    "views/asset_views.xml",
    "views/maintenance_views.xml",
    "views/alert_views.xml",
    "views/prediction_views.xml",
    ],
    "installable": True,
    "application": True,
    "license": "LGPL-3",
}