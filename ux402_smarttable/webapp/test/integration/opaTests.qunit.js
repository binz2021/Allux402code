/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["student01/sap/training/ux402smarttable/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
