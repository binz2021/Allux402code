sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.CreateSalesOrder", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		onInit: function() {
			var date = new Date();
			date.setDate(date.getDate() + 7);

			var json = {
				"CustomerID": "100000002",
				"CustomerName": "IPOST",
				"Note": "",
				"CurrencyCode": "CAD",
				"ToLineItems": []

            };
            
			this.createModel = new sap.ui.model.json.JSONModel(json);
			this.getView().setModel(this.createModel, "createCollection");
			this.nextLI = 10;
		},

		addSalesOrderLI: function() {
			// associate controller with the fragment
			if (!this.oAddDialog) {
				this.oAddDialog = sap.ui.xmlfragment("com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateLIDialog", this);
				this.getView().addDependent(this.oAddDialog);

				// toggle compact style
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.oAddDialog);
			} else {
				sap.ui.getCore().byId("addProductID").setValue("");
				sap.ui.getCore().byId("addNote").setValue("");
				sap.ui.getCore().byId("addQuantity").setValue("");
			}
			this.oAddDialog.open();
		},

		handleOK: function() {
			var prodID = sap.ui.getCore().byId("addProductID").getSelectedKey();
			var note = sap.ui.getCore().byId("addNote").getValue();
			var qty = sap.ui.getCore().byId("addQuantity").getValue();
			var date = new Date();
			date.setDate(date.getDate() + 7);

			var newLI = {
				ProductID: prodID,
				Quantity: qty,
				QuantityUnit: "EA",
				ItemPosition: this.nextLI.toString(),
				Note: note,
				CurrencyCode: "USD",
				DeliveryDate: date
			};

			this.nextLI = this.nextLI + 10;
			this.getView().getModel("createCollection").getData().ToLineItems.push(newLI);
			this.getView().getModel("createCollection").updateBindings();
			console.log("in handelOK " + prodID + "  " + note);
			this.oAddDialog.close();
		},

		handleCancel: function() {
			console.log("in handelCancel");
			this.oAddDialog.close();
		},

		_showSOCreatedSuccess: function(oData, oResponse) {
			var oResourceModel = this.getOwnerComponent().getModel("i18n");
			var sMessage = oResourceModel.getResourceBundle().getText("SalesOrderCreated", [oData.SalesOrderID]);
						
			MessageBox.show(sMessage, {
        		icon: MessageBox.Icon.SUCCESS,
        		title: oResourceModel.getProperty("sucTitle"),
        		actions: [MessageBox.Action.OK],
        		onClose: function(oAction) { 
        			this.getOwnerComponent().getRouter().navTo("main",{},true);                 			
        		}.bind(this)}
        	);
		},
		
		_showSOCreatedError:  function(oError) {
			try {
				var oMessage = JSON.parse(oError.responseText);
				MessageToast.show(oMessage.error.message.value);
			} catch(err) {
				MessageToast.show(oError.responseText);
			}
		},
		
		onSOSave: function() {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + 7);
            var oSOData = this.getView().getModel("createCollection").getData();
            oSOData.CustomerID = this._pad(oSOData.CustomerID, 10);
            for(var i in oSOData.ToLineItems) {
				var oLineData = oSOData.ToLineItems[i];
				oLineData.DeliveryDate = oDate;
				oLineData.ItemPosition = this._pad(oLineData.ItemPosition, 10);
            }
            var oModel = this.getOwnerComponent().getModel();
            oModel.create("/SalesOrderSet", oSOData, {
				success: $.proxy(this._showSOCreatedSuccess, this),
				error: this._showSOCreatedError,
				changeSetId: "CreateSO"
			});
        },

		onSOCancel: function() {
			window.history.go(-1);
        },
        
		onNavBack: function() {
			window.history.go(-1);
        },
        
		_pad: function(n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		//	onExit: function() {
		//
		//	}

	});
});