sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "student01/com/sap/training/ux402/fullscreen/ux402fullscreen/control/HoverButton",
    "sap/m/MessageToast",
    "student01/com/sap/training/ux402/fullscreen/ux402fullscreen/control/PlaneInfo",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, HoverButton, MessageToast, PlaneInfo, MessageBox) {
        "use strict";

        return Controller.extend("student01.com.sap.training.ux402.fullscreen.ux402fullscreen.controller.Flights", {
            onInit: function () {
                var oRouter = this.getRouter();
                oRouter.getRoute("flights").attachMatched(this._onObjectMatched, this);
            },

            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            _onObjectMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                this._sCarrierId = oArgs.carrierId;
                var oView = this.getView();

                oView.bindElement({
                    path: "/CarrierCollection('" + this._sCarrierId + "')",
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
                var oElementBinding;

                oElementBinding = this.getView().getElementBinding();

                // No data for the binding
                if (oElementBinding && !oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("notFound");
                }
            },

            onNavBack: function () {
                var oHistory, sPreviousHash;

                oHistory = sap.ui.core.routing.History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("overview", true /*no history*/);
                }
            },

            onHover: function (evt) {
                var sText = this.getOwnerComponent().getModel("i18n").getProperty("msgSeatsAv");
                MessageToast.show(evt.getSource().getHoverText() + " " + sText, { duration: 1000 });
            },
            onHoverPress: function (oEvent) {
                var carrid = oEvent.getSource().data("id");
                var fldate = oEvent.getSource().data("date");
                var connid = oEvent.getSource().data("connid");

                MessageBox.confirm("Are you sure you want to book this flight?", function (oAction) {
                    if (sap.m.MessageBox.Action.OK === oAction) {
                        var oEntry = {};
                        oEntry.AirLineID = carrid;
                        oEntry.FlightConnectionID = connid;
                        oEntry.FlightDate = fldate;
                        oEntry.BookingID = "333";
                        oEntry.CustomerID = "00003406";
                        oEntry.PassengerName = "Johne Dao";
                        oEntry.TravelAgencyID = "00000114";

                        var mParameters = {
                            success: this._handleBookingSuccess,
                            error: this._handleBookingError
                        };
                        var oModel = this.getOwnerComponent().getModel();
                        var customerHeader = { "Content-Type": "application/json" };
                        oModel.setHeaders(customerHeader);
                        oModel.create('/BookingCollection', oEntry, mParameters);
                    }
                }.bind(this));
            },
            _handleBookingSuccess: function (oData, response) {
                MessageBox.alert("Flight booked. Booking reference number is: " + oData.BookingID);
            },
            _handleBookingError: function (oError) {
                if (oError) {
                    if (oError.responseText) {
                        var orErrorMessage = JSON.parse(oError.responseText);
                        MessageBox.alert("Flight was not booked due to:" + orErrorMessage.error.message.value);

                    }
                }
            }

        });

    })