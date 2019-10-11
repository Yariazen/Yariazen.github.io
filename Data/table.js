// JavaScript source code
var dbx;

function init() {
    dbx = new window.Dropbox.Dropbox({
        fetch: fetch,
        accessToken: 'aIk6Qs5HEaAAAAAAAAAAE-YB65cCOAxcGw-vcbW_BoLSYXWrIvwyDKfhjCpqhuAf'
    });
    dataTable = document.getElementById('data');
    comments = document.getElementById('comment');
    data();
}

function data() {
    dbx.filesListFolder({
        path: '/Apps/BeachBlitz', recursive: false, include_media_info: true, include_deleted: false,
        include_has_explicit_shared_members: false, include_mounted_folders: false, include_non_downloadable_files: true
    }).then(response => {
        for (var x = 0; x < response.entries.length; x++) {
            var teamNum = response.entries[x].name;
            dbx.filesListFolder({
                path: `/Apps/BeachBlitz/${teamNum}`, recursive: false, include_media_info: true, include_deleted: false,
                include_has_explicit_shared_members: false, include_mounted_folders: false, include_non_downloadable_files: true
            }).then(response => {
                for (var x = 0; x < response.entries.length; x++) {
                    var matchNum = response.entries[x].name;
                    dbx.filesDownload({ path: `/Apps/BeachBlitz/${teamNum}/${matchNum}` })
                        .then(response => {
                            var blob = response.fileBlob;
                            blob.name = teamNum + "_" + matchNum;
                            blob = blob.text();
                            blob.then(function (value) {
                                var dataset = JSON.parse(value);
                                var keys = Object.keys(dataset);

                                var rowData = dataTable.insertRow();
                                var rowComment = comments.insertRow();
                                for (var i = 0; i < keys.length; i++) {
                                    if (i < 29) {
                                        var cell = rowData.insertCell();
                                        cell.innerHTML = dataset[keys[i]];
                                    } else {
                                        var cell = rowComment.insertCell();
                                        cell.innerHTML = dataset[keys[i]];
                                    }
                                }
                            })
                        })
                }
            })
        }
    })
};