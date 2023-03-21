sap.ui.define([
    "sap/uxap/BlockBase"
],function (BlockBase) {
    "use strict";

    let oEmployees = BlockBase.extend("seminar.sharedblocks.Employees",{
        metadata:{
            views:{
                Collapsed: {
                    viewName:"seminar.sharedblocks.Employees",
                    type:"XML"
                },
                Expanded:{
                    viewName:"seminar.sharedblocks.Employees",
                    type:"XML"
                }
            }
        }
    });

    return oEmployees;
},true);