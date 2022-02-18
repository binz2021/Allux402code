/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sap/training/ux402/ux402_composite/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
