sap.ui.define([
    "sap/ui/core/Control",
    "com/sap/training/ux402/ux402_composite/control/PlaneInfoRenderer"    
], function(Control, PlaneInfoRenderer) {
	"use strict";

	return Control.extend("com.sap.training.ux402.ux402_composite.control.PlaneInfo", {
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
			}
        },
        renderer: PlaneInfoRenderer
	});
});
