/*global QUnit*/

sap.ui.define([
	"student01comsaptrainingux402masterdetail/ux402_masterdetail/controller/Main.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main Controller");

	QUnit.test("I should test the Main controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
