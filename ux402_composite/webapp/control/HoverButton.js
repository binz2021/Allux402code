sap.ui.define([
	"sap/m/Button"
], function(Button) {
	"use strict";

	return Button.extend("com.sap.training.ux402.ux402_composite.control.HoverButton", {
		metadata: {
			properties: {
				"allowHover": {
					type: "boolean",
					defaultValue: false
				},
				"hoverText": {
					type: "string"
				}
			},
			events: {
				"hover": {}
			}
		},
		onmouseover: function(evt) {
			if (this.getAllowHover()) {
				this.fireHover();
			}
		},
		renderer: {}
	});
});
