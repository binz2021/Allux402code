sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("student01.sap.training.ux402smartfield.controller.App", {
            onInit: function () {
                let sPath = "/FlightSet(Carrid='AA',Connid='0017',Fldate=datetime'2022-03-06T00%3A00%3A00')";
                this.getView().bindElement(sPath);

            }
        });
    });
