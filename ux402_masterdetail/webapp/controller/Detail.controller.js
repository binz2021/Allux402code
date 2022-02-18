sap.ui.define([
    "student01/com/sap/training/ux402/masterdetail/ux402masterdetail/controller/BaseController",
    "sap/ui/Device"
],
    function (Controller, Device) {
        "use strict";

        return Controller.extend("student01.com.sap.training.ux402.masterdetail.ux402masterdetail.controller.Detail", {
            onInit: function () {

                this.getRouter().getRoute("carrierdetails").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function (oEvent) {
                var sObjectPath =
                    "/CarrierCollection('" + oEvent.getParameter("arguments").objectId + "')";
                this._bindView(sObjectPath);
            },

            _bindView: function (sObjectPath) {
                var oView = this.getView();

                this.getView().bindElement({
                    path: sObjectPath,
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function () {
                            oView.setBusy(false);
                        }
                    }
                });
            },

            _onBindingChange: function () {
                var oView = this.getView();
                var oElementBinding = oView.getElementBinding();
                if (!oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("detailObjectNotFound");
                    this.getOwnerComponent().oListSelector.clearMasterListSelection();
                    return;
                }
                var sPath = oElementBinding.getPath();
                this.getOwnerComponent().oListSelector.selectAListItem(sPath);
            }
        });
    });
