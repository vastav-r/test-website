(function () {
    var myConnector = tableau.makeConnector();

   myConnector.getSchema = function (schemaCallback) {

	var cols = [
        { id : "LeadAQLCount", alias : "AQL Leads", dataType : tableau.dataTypeEnum.int },
        { id : "LeadTALCount", alias : "TAL Leads", dataType : tableau.dataTypeEnum.int },
        { id : "LeadTQLCount", alias : "TQL Leads", dataType : tableau.dataTypeEnum.int }
        //{ id : "time", alias : "year", dataType : tableau.dataTypeEnum.string },
        //{ id : "obs", alias : "observation", dataType : tableau.dataTypeEnum.float }
    ];

    var tableInfo = {
        id : VMStar_Leads,
        alias : "Lead Categories in VMStar",
        columns : cols
    };


schemaCallback([tableInfo]);





};

    myConnector.getData = function (table, doneCallback) {
    var tableData = [],
        LeadAQLCount = 0,
        LeadTALCount = 0,
        LeadTQLCount = 0
        //time = "",
        //obs = 0;

    	$.getJSON("https://map-reporting-service-dev.us07-5-pcf2-apps.oc.vmware.com/map/report/lead/consolidated/datefrom/2019-05-15/dateto/2019-05-16/data", function (resp) {
        var feat = resp.response,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "LeadAQLCount": feat[i].LeadAQLCount,
                "LeadTQLCount": feat[i].properties.LeadTQLCount,
                "LeadTALCount": feat[i].properties.LeadTALCount

            });



        }

        table.appendRows(tableData);

        doneCallback();
    });
};
    tableau.registerConnector(myConnector);

	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "VMStar Leads";
        tableau.submit();
    });
});

})();
