﻿$(document).ready(() => {
    loadData();
});

function loadData() {
    let userPromis = $.Deferred();
    let usersDataSource = new DevExpress.data.DataSource({
        key: "Id",
        load: () => {
            $.ajax({
                type: "POST",
                url: "/home/GetTenders",
                contentType: "application/json",
                success: (data) => {
                    userPromis.resolve(data);
                },
                error: (data) => {
                    userPromis.reject(data);
                }
            });
            return userPromis.promise();
        }
    })
    $("#homeTable").dxDataGrid({
        dataSource: usersDataSource,
        showBorders: true,
        columnAutoWidth: true,
        columns: [{
            datafield: "Id",
            visible: false
        },
            {
                dataField: "TenderNo",
                cellTemplate: function (container, options) {
                    console.log(options)
                    $("<a href='/Home/Tender/" + options.data.Id + "'>" + options.value + "</a>").appendTo(container);
                }
            },
            "Dealer", "DealerName", "OpenDate", "CloseDate"],
    }).dxDataGrid("instance");
}