define([], function(){
    var xmlhttp = getXmlHttp();
    
    xmlhttp.open('GET', 'sprites/sprites.json', false);
    xmlhttp.send(null);
    
    if(xmlhttp.status == 200) {
        return JSON.parse(xmlhttp.responseText);
    } else {
        return null;
    }

    function getXmlHttp(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
});