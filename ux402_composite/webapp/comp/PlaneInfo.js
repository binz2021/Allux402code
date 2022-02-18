
sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (XMLComposite) {
    "use strict"
    return XMLComposite.extend("com.sap.training.ux402.ux402_composite.comp.PlaneInfo", {
        metadata: {
            properties: {
                "seatsMax": {
                    type: "string"
                },
                "seatsOcc": {
                    type: "string"
                },
                "planeType": {
                    type: "string"
                }
            },
            events: {
                submit: {
                    parameterss: {
                        planeType: {
                            type: "string"
                        }
                    }
                }
            }
        },
        _submitPressed: function () {
            this.fireSubmit({ planeType: this.getPlaneType() })
        }

    });
}
);