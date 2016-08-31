angular.module('mareaModel', [])

.factory('Marea', function(){
    
    function Marea(id, lugar, fecha, dia, mes, year, coef1, coef2, pl1, bj1, pl2, bj2, pl3){
        this.id = id;
        this.lugar = lugar;
        this.fecha = fecha;
        this.dia = dia;
        this.mes = mes;
        this.year = year;
        this.coef1 = coef1;
        this.coef2 = coef2;
        this.pl1 = pl1;
        this.bj1 = bj1;
        this.pl2 = pl2;
        this.bj2 = bj2;
        this.pl3 = pl3;
    }
    
    Marea.build = function(data){
        if(!data)
            return null;
        return new Marea(data.id, data.lugar, data.fecha, data.dia, data.mes, data.year, data.coef1, data.coef2, data.pl1, data.bj1, data.pl2, data.bj2, data.pl3);
    }
    
    Marea.prototype.toJson = function(){
        return angular.toJson(this);
    }
    
    Marea.fromJsonBunch = function(data){
        if(angular.isArray(data)){
            return data.map(Marea.build).filter(Boolean);
        }
        return Marea.build(data);
    }
    return Marea;
})