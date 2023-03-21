
//@ts-nocheck
sap.ui.define([
	"seminar/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "seminar/libs/Validator",
    "seminar/utils/Crud"
], function(
	BaseController,
    JSONModel,
    Filter,
    FilterOperator,
    Fragment,
    Validator,
    Crud
) {
	"use strict";

	return BaseController.extend("seminar.controller.Employees", {

        onInit: function () {
            this._oTable = this.byId("tableEmployees");
            this._oModelEmployees = this.getOwnerComponent().getModel("employees");

            this._oCrudController = this.getOwnerComponent().oCrudController();

            this._oModelEmployees.attachRequestSent(function () {
                this._oTable.setBusy(true);
            }.bind(this));

            this._oModelEmployees.attachRequestCompleted(function () {
                this._count();
                this._oTable.setBusy(false);
            }.bind(this));

            this._loadFilters();
            this._loadView();
            this._loadControl();
        },

        _count: function () {
            let oBinding = this._oTable.getBinding("rows");
                oBinding.attachChange(function () {
                    this.byId("titleCount").setText(this.getResourceBundle().getText("titleCount",[oBinding.getLength()]));
                }.bind(this));
        },

        _loadFilters: function () {
            let oData = {
                Type: "",
                EmployeeId:"",
                Dni:"",
                Name:"",
                Email:""
            };
            this.setModel(new JSONModel(oData), "filters");
        },

        _loadView: function () {
            let oData = {
                Type:"0",
                FirstName:"",
                LastName:"",
                DNI:"",
                GrossSalary:null,
                DailyPrice:null,
                Date:"",
                Comments:"",
                InternalMin:1200.00,
                InternalMax:8000.00,
                InternalDefault:2400.00,
                AutonomusMin:100.00,
                AutonomusMax:2000.00,
                AutonomusDefault:400.00,
                ManagerMin:50000.00,
                ManagerMax:200000.00,
                ManagerDefault:70000.00,
            };
            this.setModel(new JSONModel(oData), "view");
        },

        _loadControl: function () {
            let oData = {
                Enabled: false
            };
            this.setModel(new JSONModel(oData), "control");
        },

        refresh: function (sAction, oData) {
            let $this = this;

            return new Promise((resolve)=>{
                switch(sAction) {
                    case 'Create': 
                        $this.onCloseDialog();
                        resolve(true);
                    break;
                    case 'Update':
                        resolve(true);
                    break;
                    case 'Delete':
                        resolve(true);
                    break;
                }
            });
        },

        onFilter: function () {
            let aFilter = [],
                oModelFilters = this.getView().getModel("filters");
            
            if (oModelFilters.getProperty("/Type")) {
                aFilter.push(new Filter("Type", FilterOperator.EQ, oModelFilters.getProperty("/Type")));
            }

            if (oModelFilters.getProperty("/EmployeeId")) {
                aFilter.push(new Filter("EmployeeId", FilterOperator.Contains, oModelFilters.getProperty("/EmployeeId")));
            }

            if (oModelFilters.getProperty("/Dni")) {
                aFilter.push(new Filter("Dni", FilterOperator.Contains, oModelFilters.getProperty("/Dni")));
            }

            if (oModelFilters.getProperty("/Name")) {
                aFilter.push(new Filter({
                    filters:[
                        new Filter("FirstName", FilterOperator.Contains, oModelFilters.getProperty("/Name")),
                        new Filter("LastName", FilterOperator.Contains, oModelFilters.getProperty("/Name"))
                    ],
                    and: false
                }));
            }

            if (oModelFilters.getProperty("/Email")) {
                aFilter.push(new Filter("SapId", FilterOperator.Contains, oModelFilters.getProperty("/Email")))
            }

            let oBinding = this._oTable.getBinding("rows");
                oBinding.filter(aFilter);
        },

        onClearFilter: function () {
            let oBinding = this._oTable.getBinding("rows");
                oBinding.filter([]);
        },

        onOpenDialog: function () {
            let oView = this.getView();

            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: oView.getId(),
                    name:"seminar.fragment.CreateEmployee",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this._loadView();
            this.byId("createEmployee").close();
        },

        onToUnlock: function () {
            let aIndices = this._oTable.getSelectedIndices(),
                oControl = this.getModel("control");
            
                if (aIndices.length === 1) {
                    oControl.setProperty("/Enabled", true);
                } else {
                    oControl.setProperty("/Enabled", false);
                }
        },

        onSave: function () {
            let oValidator = new Validator();
                oValidator.validate(this.byId("createEmployee"));

            if (oValidator._isValid) {
                let oViewModel = this.getModel("view"),
                    oData = Crud.create(oViewModel, this);
                console.log(oData);
                this._oCrudController.crud('Create',oData);
            }
        },

        onDelete: function () {
            let oData = Crud.delete(this._oTable, this);
            this._oCrudController.crud('Delete',oData);
        }
	});
});