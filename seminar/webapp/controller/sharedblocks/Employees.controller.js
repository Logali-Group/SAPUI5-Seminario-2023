sap.ui.define([
    "seminar/controller/BaseController"
],function (BaseController) {
    "use strict";

    return BaseController.extend("seminar.controller.sharedblocks.Employees",{

        onInit: function () {

        },

        onNavToEmployee: function () {
            let oRouter = this.getRouter();
                oRouter.navTo("createEmployee");
        }
    });
});