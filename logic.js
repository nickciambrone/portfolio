const cp1Url = 'cp1.pdf'
const cp2Url = 'cp2.pdf'
const fspUrl = 'firstSP.png'
const sspUrl = 'secondSP.png'

let diagramThere = false;
let excelThere = false;
let pythonThere = false;
let ogMsgThere=true;
function insertPython() {
    if(ogMsgThere){
        document.getElementById('ogMessage').remove()
    ogMsgThere = false;
    }
    
    if(!pythonThere){
        var pdfViewerObject = document.createElement("object");
    var pdfViewerEmbed = document.createElement("embed");
    pdfViewerObject.setAttribute("data", 'py.pdf');
    pdfViewerEmbed.setAttribute("src", 'py.pdf');
    pdfViewerObject.setAttribute("style", ' width:100%; height: 900px;');
    pdfViewerObject.setAttribute("id", 'pyf');

    document.getElementById('project').prepend(pdfViewerObject)
    pythonThere=true;
    }
    if (excelThere) {
        document.getElementById("cp2obj").remove();
        document.getElementById("cp1obj").remove();
        document.getElementById("fun").remove();

        excelThere = false;
    }
    if (diagramThere) {
        document.getElementById('diagram').remove()
        document.getElementById('fsp').remove()
        document.getElementById('ssp').remove()
        document.getElementById('fhdb').remove()
        document.getElementById('shdb').remove()
        document.getElementById('msa').remove()
        document.getElementById('msb').remove()




        diagramThere = false;
    }
    




}
function insertExcel() {
    if(ogMsgThere){
        document.getElementById('ogMessage').remove()
    ogMsgThere = false;
    }
    if (!excelThere) {
        var pdfViewerObject = document.createElement("object");
        var pdfViewerEmbed = document.createElement("embed");
        pdfViewerObject.setAttribute("data", cp1Url);
        pdfViewerEmbed.setAttribute("src", cp1Url);
        pdfViewerObject.setAttribute("style", 'height:700px; width:50%;');

        pdfViewerEmbed.setAttribute("style", 'height:700px; width:50%;');


        pdfViewerObject.setAttribute("id", 'cp1obj');
        document.getElementById('project').prepend(pdfViewerObject)
        document.getElementById('cp1obj').prepend(pdfViewerEmbed)


        var c = document.createElement("object");
        var d = document.createElement("embed");
        c.setAttribute("data", cp2Url);
        d.setAttribute("src", cp2Url);
        c.setAttribute('id', 'cp2obj')
        c.setAttribute("style", 'height:700px; width:50%;');

        d.setAttribute("style", 'height:700px; width:50%;');

        document.getElementById('project').prepend(c)
        document.getElementById('cp2obj').prepend(d)
        var fun = document.createElement('h4')
        fun.innerHTML = 'Statistical Analysis: I built linear regression models in Excel and provided an in depth analysis along with data visualizaions for the client.'
        fun.setAttribute('id', 'fun')
        document.getElementById('project').prepend(fun)



    }

    excelThere = true;
    if (diagramThere) {
        document.getElementById('diagram').remove()
        document.getElementById('fsp').remove()
        document.getElementById('ssp').remove()
        document.getElementById('fhdb').remove()
        document.getElementById('shdb').remove()
        document.getElementById('msa').remove()
        document.getElementById('msb').remove()




        diagramThere = false;
    }
    if (pythonThere){
        document.getElementById('pyf').remove()
        pythonThere=false;
    }



}
function insertSql() {
    if(ogMsgThere){
        document.getElementById('ogMessage').remove()
    ogMsgThere = false;
    }
    if (pythonThere){
        document.getElementById('pyf').remove()
        pythonThere=false;
    }

    if (excelThere) {
        document.getElementById("cp2obj").remove();
        document.getElementById("cp1obj").remove();
        document.getElementById("fun").remove();

        excelThere = false;
    }

    if (!diagramThere) {
        var linebreak = document.createElement("br");

        var diagram = document.createElement('img')
        diagram.src = 'diagram.png'

        var ssp = document.createElement('img')
        ssp.src = sspUrl

        var fsp = document.createElement('img')
        fsp.src = fspUrl

        var fhdb = document.createElement('img')
        fhdb.src = 'fhdb.png'

        var shdb = document.createElement('img')
        shdb.src = 'shdb.png'

        diagram.setAttribute('width', '33%')
        diagram.setAttribute('height', '450px')
        ssp.setAttribute('width', '50%')
        ssp.setAttribute('height', '450px')
        fsp.setAttribute('width', '50%')
        fsp.setAttribute('height', '450px')

        diagram.setAttribute('id', 'diagram')
        fsp.setAttribute('id', 'fsp')
        ssp.setAttribute('id', 'ssp')
        fhdb.setAttribute('height', '450px')
        fhdb.setAttribute('id', 'fhdb')

        fhdb.setAttribute('width', '33%')

        shdb.setAttribute('height', '450px')
        shdb.setAttribute('id', 'shdb')

        shdb.setAttribute('width', '33%')

        document.getElementById('project').prepend(fhdb);

        document.getElementById('project').prepend(shdb);
        var div = document.createElement('h4')
        div.setAttribute('style', 'width:100%')
        div.setAttribute('id', 'msa')

        div.innerHTML = 'HotelDB: I was given information about a hotel and tasked with designing an RDBMS that satisfied the client needs'

        document.getElementById('project').prepend(diagram);
        document.getElementById('project').prepend(div)

        document.getElementById('project').prepend(linebreak);


        document.getElementById('project').prepend(ssp)

        document.getElementById('project').prepend(fsp)
        document.getElementById('project').prepend(linebreak);
        var idk = document.createElement('h4')
        idk.setAttribute('style', 'width:100%')
        idk.setAttribute('id', 'msb')

        idk.innerHTML = 'Stock Project: I was given stock data and was tasked with retrieving specific information'
        document.getElementById('project').prepend(idk)
        diagramThere = true;
    }
}