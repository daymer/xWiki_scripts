


function CreatePage() {
    writeMessage("Creating a personal page $page_name");
    var data = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><page xmlns="http://www.xwiki.org"><title>$page_name$page_title_postfix</title><syntax>xwiki/2.1</syntax><content>This is your new personal space.</content></page>';
    return $.ajax({
        type: 'PUT',
        url: 'http://xwiki.support2.veeam.local/rest/wikis/xwiki/spaces/StagingWiki/spaces/Personal%20Spaces/spaces/$page_name/pages/WebHome',
        data: data,
        dataType: "xml",
        contentType: "text/xml",
        success: function (data) {
                        console.log('page created');},
        error: function (data) {
                        console.log('Oh no, CreatePage has failed');}
    });
}


function SetUserAsAdmin(resultFromAllowXWikiAllGroupOnlyView) {
    writeMessage("In Function SetUserAsAdmin. Result From AllowXWikiAllGroupOnlyView = " + resultFromAllowXWikiAllGroupOnlyView.data);
    var data = '<object xmlns="http://www.xwiki.org"><className>XWiki.XWikiRights</className><property name="allow"><value>1</value></property><property name="users"><value>XWiki.$current_user</value></property><property name="levels"><value>view,edit,comment,script,delete,admin</value></property></object>';
    return $.ajax({
        type: 'POST',
        url: 'http://xwiki.support2.veeam.local/rest/wikis/xwiki/spaces/StagingWiki/spaces/Personal%20Spaces/spaces/$page_name/pages/WebHome/objects',
        data: data,
        dataType: "text",
        contentType: "application/xml",
        success: function (data) {
                        console.log('User $current_user is set as admin');},
        error: function (data) {
                        console.log('Oh no, SetUserAsAdmin has failed');}
    });
}


function AllowXWikiAllGroupOnlyView(resultFromCreatePage) {
    writeMessage("In Function AllowXWikiAllGroupOnlyView. Result From CreatePage =  " + resultFromCreatePage.data);
    var data = '<object xmlns="http://www.xwiki.org"><className>XWiki.XWikiRights</className><property name="allow"><value>0</value></property><property name="groups"><value>XWiki.XWikiAllGroup</value></property><property name="levels"><value>view</value></property></object>'
    return $.ajax({
        type: 'POST',
        url: 'http://xwiki.support2.veeam.local/rest/wikis/xwiki/spaces/StagingWiki/spaces/Personal%20Spaces/spaces/$page_name/pages/WebHome/objects',
        data: data,
        dataType: "text",
        contentType: "application/xml",
        success: function (data) {
                        console.log('AllowXWikiAllGroupOnlyView is set');},
        error: function (data) {
                        console.log('Oh no, AllowXWikiAllGroupOnlyView has failed');}
    });
}

function Final(resultFromAllowXWikiAllGroupOnlyView) {
    writeMessage("In Function Final. Result From AllowXWikiAllGroupOnlyView = " + resultFromAllowXWikiAllGroupOnlyView.data);
    location.reload();
}

CreatePage().then(SetUserAsAdmin).then(AllowXWikiAllGroupOnlyView).then(Final);

function writeMessage(msg) {
    $("#para").append(msg + "<br>");
}
