sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionD", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gdsd.SocialCareSolution.view.ProvincialBusinessPlanSectionD
		 */
		onInit: function () {},

		onToD1: function () {
			this.byId("bar0").setSelectedKey("D1");
		},
		onToD2: function () {
			this.byId("bar0").setSelectedKey("D2");
		},
		onToD3: function () {
			this.byId("bar0").setSelectedKey("D3");
		},
		onToD4: function () {
			this.byId("bar0").setSelectedKey("D4");
		},
		onToD5: function () {
			this.byId("bar0").setSelectedKey("D5");
		},
		onToD6: function () {
			this.byId("bar0").setSelectedKey("D6");
		},
		onToD7: function () {
			this.byId("bar0").setSelectedKey("D7");
		},
		onToD8: function () {
			this.byId("bar0").setSelectedKey("D8");
		},
		onToD9: function () {
			this.byId("bar0").setSelectedKey("D9");
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionD
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
		}
	});
});