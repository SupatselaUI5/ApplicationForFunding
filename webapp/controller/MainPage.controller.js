sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/FilterOperator',
		'sap/ui/model/json/JSONModel'
], function (jQuery, MessageToast, Fragment, Controller, Filter, FilterOperator, JSONModel) {
	"use strict";
	return Controller.extend("gdsd.ApplicationForFunding1.controller.MainPage", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gdsd.ApplicationForFunding1.view.MainPage
		 */
		onInit: function () {},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.MainPage
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
			
			
			
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.MainPage
		 */
	
		
		onOrgValueHelp: function() {
			if (!this._oValueHelpDialog) {
				Fragment.load({
					name: "gdsd.ApplicationForFunding1.fragments.DialogOrganisation",
					controller: this
				}).then(function(oValueHelpDialog){
					this._oValueHelpDialog = oValueHelpDialog;
					this.getView().addDependent(this._oValueHelpDialog);
					this._configValueHelpDialog();
					this._oValueHelpDialog.open();
				}.bind(this));
			} else {
				this._configValueHelpDialog();
				this._oValueHelpDialog.open();
			}
		},
		
			_configValueHelpDialog: function() {
		//	var sInputValue = this.byId().getValue(),
		//	var oModel = this.getView().getModel(),
		//		aProducts = oModel.getProperty("/ProductCollection");

		//	aProducts.forEach(function (oProduct) {
		//		oProduct.selected = (oProduct.Name === sInputValue);
		//	});
		//	oModel.setProperty("/ProductCollection", aProducts);
		},
		
				handleValueHelpClose : function (oEvent) {
						this.dialog.close();
	//		var oSelectedItem = oEvent.getParameter("selectedItem"),
		//		oInput = this.byId("productInput");

		//	if (oSelectedItem) {
		//		this.byId("productInput").setValue(oSelectedItem.getTitle());
		//	}

		//	if (!oSelectedItem) {
		//		oInput.resetProperty("value");
		//	}
		},
			
				handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		
	});
});