import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'



function capitalize(word) {
  console.log("word", word)
  const lower = word.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}


const pdfCreator = (doc, data, section, title, myImage ) => {
  autoTable(doc, {
    head: [Object.keys(data[0])],
    body: data.map( element => {
      return Object.values(element)
    }),
    horizontalPageBreak: true,
    didDrawPage: function (data) {
      console.log("myImage", myImage)
      if( myImage ){
        console.log("IMAGE NO ES CERO")
        doc.setFontSize(20)
        doc.setTextColor(40)
        doc.addImage(myImage, 'PNG', data.settings.margin.left, 15, 36, 12)
      }
      doc.setFontSize(15)
      doc.setFont('times', 'normal');
      doc.text(title.toUpperCase(), data.settings.margin.left + 90 , 22, { align: 'center', baseline: 'ideographic', maxWidth: '100' })
      doc.setFontSize(12)
      doc.text(capitalize(section), data.settings.margin.left + 0 , 33, { align: 'left'  })
      doc.setFontSize(9)
      const currentDate = [ String((new Date()).getDate()) , String((new Date()).getMonth() + 1) , String((new Date()).getFullYear()) ].join('/')
      doc.text( 'Fecha: ' + currentDate , data.settings.margin.left + 169 , 22, { align: 'center', maxWidth: '30'})
      const currentTime = [ String((new Date()).getHours()) , (String((new Date()).getMinutes())).length === 1? 0+String((new Date()).getMinutes()) : String((new Date()).getMinutes()),  String((new Date()).getSeconds())].join(':')
      doc.text( 'Hora: ' + currentTime , data.settings.margin.left + 169 , 26, { align: 'center', maxWidth: '30'})
      doc.setFontSize(10)
      //doc.text( String((new Date()).getHours()) , data.settings.margin.left + 170 , 22, { align: 'center', maxWidth: '30'})
    },
    margin: { top: 45 },
    theme: 'grid',
    styles: {
      halign: 'center'
  },
    headStyles: {
      fillColor: [197, 48, 48],
      fontSize: 10,
      halign: 'center',
    },
  })
}

export default pdfCreator