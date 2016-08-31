angular.module('especieModel', [])

.factory('Especie', function(){
    
    function Especie(id, nombre, nombre_lat, cebo, talla_med, talla_canar, talla_cant, talla_cad, descrip, captur, poster){
        this.id = id;
        this.nombre = nombre;
        this.nombre_lat = nombre_lat;
        this.cebo = cebo;
        this.talla_med = talla_med;
        this.talla_canar = talla_canar;
        this.talla_cant = talla_cant;
        this.talla_cad = talla_cad;
        this.descrip = descrip;
        this.captur = captur;
        this.poster = poster;
    }
    
    Especie.build = function(data){
        if(!data)
            return null;
        return new Especie(data.id, data.nombre, data.nombre_lat, data.cebo, data.talla_med, data.talla_canar, data.talla_cant, data.talla_cad, data.descrip, data.captur, data.poster);
    }
    
    Especie.prototype.toJson = function(){
        return angular.toJson(this);
    }
    
    Especie.fromJsonBunch = function(data){
        if(angular.isArray(data)){
            return data.map(Especie.build).filter(Boolean);
        }
        return Especie.build(data);
    }
    return Especie;
})