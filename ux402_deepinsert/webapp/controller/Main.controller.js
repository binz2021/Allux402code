sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.Main", {
		onInit: function() {
			if (sap.ui.Device.support.touch === false) {
				this.getView().addStyleClass("sapUiSizeCompact");
			}
		}
	});
});