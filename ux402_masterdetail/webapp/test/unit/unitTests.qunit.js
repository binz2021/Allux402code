/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student01comsaptrainingux402masterdetail/ux402_masterdetail/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
