sap.ui.define([

],function () {

    let oCrud = {

        create: function (oView, oController) {
            let oData = {};
                oData.Url = "/Users";
                oData.Data = {
                    Type:           oView.getProperty("/Type"),
                    FirstName:      oView.getProperty("/FirstName"),
                    LastName:       oView.getProperty("/LastName"),
                    Dni:            oView.getProperty("/DNI"),
                    SapId:          "jbriceno@logaligroup.com",
                    CreationDate:   oView.getProperty("/Date"),
                    Comments:       oView.getProperty("/Comments"),
                    UserToSalary:[
                        {
                            Amount :   parseFloat(oView.getProperty("/Type") === '1'? oController.byId("dailyPrice").getValue() : oController.byId("grossSalary").getValue()).toString(),
                            Comments :  oView.getProperty("/Comments"),
                            Waers :     "EUR"
                        }
                    ]
                };
                oData.Controller =    oController;
                oData.Function =      oController.refresh.bind(oController);
                oData.Busy =          "createEmployee";
            return oData;
        },


        delete: function (oTable, oController) {

            let iIndex = oTable.getSelectedIndices()[0],
                oBinding = oTable.getContextByIndex(iIndex);

            let oData = {};
                oData.Url =           "/Users(EmployeeId='"+oBinding.getProperty("EmployeeId")+"',SapId='"+oBinding.getProperty("SapId")+"')";
                oData.Data = {
                    EmployeeId: oBinding.getProperty("EmployeeId"),
                    SapId:      oBinding.getProperty("SapId")
                };
                oData.Controller =    oController;
                oData.Function =      oController.refresh.bind(oController);
                oData.Busy =          "tableEmployees";

            return oData;
        },

        update: function (oView, oController) {
            let oData = {};
                oData.Url =  "/Users(EmployeeId='"+oView.getProperty("/EmployeeId")+"',SapId='"+oView.getProperty("/SapId")+"')";
                oData.Data = {
                    Type:           oView.getProperty("/Type"),
                    FirstName:      oView.getProperty("/FirstName"),
                    LastName:       oView.getProperty("/LastName"),
                    Dni:            oView.getProperty("/DNI"),
                    SapId:          oView.getProperty("/SapId"),
                    CreationDate:   oView.getProperty("/Date"),
                    Comments:       oView.getProperty("/Comments")
                };
                oData.Controller =    oController;
                oData.Function =      oController.refresh.bind(oController);
                oData.Busy =          "createEmployee";
            return oData;
        }

    };

    return oCrud;
});
