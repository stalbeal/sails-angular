/*Servicio para operaciones de fecha*/

/*
 * Servicio que transforma la fecha ISOdate, parceada a string 
 * 2015-10-08T20:57:08.251Z y retorna Octubre 10 de 2015
 */
exports.paseDate = function(attribute) {

	var createdAt=attribute.split('T');
	var date=createdAt[0].split('-');
	date[0]=date[0].substring(1);
   	var month=GetDate.month(date[1]);

    return month+" "+date[2]+" de "+date[0] ;
};

/*
 * Servicio qu retorna la hora 
 * @date de tipo Date
 */
exports.hour = function(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();

    var hourResult = "";
    if (minutes < 10 && hour < 10) {
        hourResult = "0" + hour + ":0" + minutes;
    } else {
        hourResult = hour + ":" + minutes;
    }
    return hourResult;

};
/*
 * Servicio que retorna la fecha separada por guiones 2015-10-25
 * @date de tipo Date
 */
exports.date = function(date) {

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var dateResult = "";
    if (day < 10 ) {
        day="0"+day;
    } 
    if (month < 10) {
        month = "0" + month;
    }
    
        dateResult = year + "-" + month + "-" + day;
    
    return dateResult;

};

/*
 * Servicio que retorna la fecha separada por guiones 2015-10-25
 * @date de tipo Date
 */
exports.month = function(attribute) {

    switch (attribute) {
        case '01':
            return 'Enero';
            break;
        case '02':
            return 'Febrero';
            break;
        case '03':
            return 'Marzo';
            break;
        case '04':
            return 'Abril';
            break;
        case '05':
            return 'Mayo';
            break;
        case '06':
            return 'Junio';
            break;
        case '07':
            return 'Julio';
            break;
        case '08':
            return 'Agosto';
            break;
        case '09':
            return 'Septiembre';
            break;
        case '10':
            return 'Octubre';
            break;
        case '11':
            return 'Noviembre';
            break;
        case '12':
            return 'Diciembre';
            break;
        default:
         return 'error';
         break;
    }
};

exports.day = function(date) {

    var day = date.getDate();
    
    if (day < 10 ) {
        return ("0" + day);
    } else {
      return day;  
    }
   

};

exports.numberMonth = function(date) {

    var month = date.getMonth() + 1;
    
    if (month < 10 ) {
        return ("0" + month);
    } else {
      return month;  
    }
   

};