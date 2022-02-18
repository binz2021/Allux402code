/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student01saptraining/ux402_smarttable/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
