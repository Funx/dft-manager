String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

String.prototype.toDash = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

String.prototype.removeAccents = function(){
  var translate_re = /[öäüÖÄÜéÉêÊëËèÈçÇàÀ]/g;
  var translate = {
    "ä": "a", "ö": "o", "ü": "u" , "é": "e" , "ê": "e" , "è": "e" , "ç": "c" , "à": "a", "ë": "e",
    "Ä": "A", "Ö": "O", "Ü": "U" , "É": "E" , "Ê": "e" , "È": "e" , "Ç": "c" , "A": "a", "Ë": "E",
  };
  return ( this.replace(translate_re, function(match) {
    return translate[match];
  }) );
};

String.prototype.toSlug = function(){
  str = this.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

String.prototype.reverse = function(){
	//use small esrever lib to properly reverse my string
	return esrever.reverse(this);
}
