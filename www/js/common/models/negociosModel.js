angular.module('negociosModel', [])

.factory('Negocio', function(){
    
    function Negocio(id, nombre, logo, descrip, adress, ciudad, provincia, geo, telef, email, web, pic1, pic2, pic3){
        this.id = id;
        this.nombre = nombre;
        this.logo = logo;
        this.descrip = descrip;
        this.adress = adress;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.geo = geo;
        this.telef = telef;
        this.email = email;
        this.web = web;
        this.pic1 = pic1;
        this.pic2 = pic2;
        this.pic3 = pic3;
    }
    
    Negocio.build = function(data){
        if(!data)
            return null;
        return new Negocio(data.id, data.nombre, data.logo, data.descrip, data.adress, data.ciudad, data.provincia, data.geo, data.telef, data.email, data.web, data.pic1, data.pic2, data.pic3);
    }
    
    Negocio.prototype.toJson = function(){
        return angular.toJson(this);
    }
    
    Negocio.fromJsonBunch = function(data){
        if(angular.isArray(data)){
            return data.map(Negocio.build).filter(Boolean);
        }
        return Negocio.build(data);
    }
    return Negocio;
})