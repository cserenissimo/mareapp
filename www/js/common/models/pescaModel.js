angular.module('pescaModel', [])

.factory('Pesca', function(){
    
    function Pesca(id, nombre, ciudad, provincia, geo, descrip, poster){
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.geo = geo;
        this.descrip = descrip;
        this.poster = poster;
    }
    
    Pesca.build = function(data){
        if(!data)
            return null;
        return new Pesca(data.id, data.nombre, data.ciudad, data.provincia, data.geo, data.descrip, data.poster);
    }
    
    Pesca.prototype.toJson = function(){
        return angular.toJson(this);
    }
    
    Pesca.fromJsonBunch = function(data){
        if(angular.isArray(data)){
            return data.map(Pesca.build).filter(Boolean);
        }
        return Pesca.build(data);
    }
    return Pesca;
})