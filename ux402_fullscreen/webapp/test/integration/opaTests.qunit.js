/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["student01/com/sap/training/ux402/fullscreen/ux402fullscreen/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
